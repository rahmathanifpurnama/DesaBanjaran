import test from "node:test";
import assert from "node:assert/strict";
import { ipMatchesCidr, isAllowedAdminRequest } from "../functions/_lib/network.js";

test("mencocokkan IPv4 dengan rentang Kelurahan", () => {
  assert.equal(ipMatchesCidr("192.168.10.24", "192.168.10.0/24"), true);
  assert.equal(ipMatchesCidr("192.168.11.24", "192.168.10.0/24"), false);
  assert.equal(ipMatchesCidr("36.80.10.20", "36.80.10.20/32"), true);
});

test("mencocokkan IPv6", () => {
  assert.equal(ipMatchesCidr("2001:db8::15", "2001:db8::/64"), true);
  assert.equal(ipMatchesCidr("2001:db9::15", "2001:db8::/64"), false);
});

test("hanya menerima header IP tepercaya", () => {
  const request = new Request("https://desa.test/admin", { headers: { "CF-Connecting-IP": "36.80.10.20" } });
  assert.equal(isAllowedAdminRequest(request, "10.0.0.0/8, 36.80.10.20/32"), true);
  assert.equal(isAllowedAdminRequest(request, "10.0.0.0/8"), false);
});
