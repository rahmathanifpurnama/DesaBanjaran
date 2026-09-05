function ipv4ToBigInt(value) {
  const parts = value.split(".");
  if (parts.length !== 4) return null;
  let result = 0n;
  for (const part of parts) {
    if (!/^\d+$/.test(part)) return null;
    const number = Number(part);
    if (number < 0 || number > 255) return null;
    result = (result << 8n) + BigInt(number);
  }
  return { value: result, bits: 32 };
}

function expandIpv6(value) {
  const halves = value.toLowerCase().split("::");
  if (halves.length > 2) return null;
  const left = halves[0] ? halves[0].split(":") : [];
  const right = halves[1] ? halves[1].split(":") : [];
  const missing = 8 - left.length - right.length;
  if ((halves.length === 1 && missing !== 0) || missing < 0) return null;
  const groups = [...left, ...Array(missing).fill("0"), ...right];
  if (groups.length !== 8 || groups.some((part) => !/^[0-9a-f]{1,4}$/.test(part))) return null;
  return groups;
}

function ipv6ToBigInt(value) {
  const groups = expandIpv6(value);
  if (!groups) return null;
  let result = 0n;
  for (const group of groups) result = (result << 16n) + BigInt(`0x${group}`);
  return { value: result, bits: 128 };
}

export function parseIp(value) {
  if (!value) return null;
  let normalized = value.replace(/^\[|\]$/g, "").split("%")[0].trim();
  if (normalized.toLowerCase().startsWith("::ffff:")) {
    normalized = normalized.slice(7);
  }
  return normalized.includes(":") ? ipv6ToBigInt(normalized) : ipv4ToBigInt(normalized);
}

export function ipMatchesCidr(ipAddress, cidr) {
  const [networkAddress, prefixText] = cidr.trim().split("/");
  const ip = parseIp(ipAddress);
  const network = parseIp(networkAddress);
  if (!ip || !network || ip.bits !== network.bits) return false;
  const prefix = prefixText === undefined ? ip.bits : Number(prefixText);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > ip.bits) return false;
  const shift = BigInt(ip.bits - prefix);
  return (ip.value >> shift) === (network.value >> shift);
}

export function isAllowedAdminRequest(request, allowedCidrs = "") {
  const clientIp =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Real-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "127.0.0.1";
  return allowedCidrs
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .some((cidr) => ipMatchesCidr(clientIp, cidr));
}
