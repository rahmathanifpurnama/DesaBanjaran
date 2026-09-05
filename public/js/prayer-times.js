const degrees = (value) => (value * Math.PI) / 180;
const arcsin = (value) => (Math.asin(value) * 180) / Math.PI;
const arccos = (value) => (Math.acos(value) * 180) / Math.PI;
const arctan2 = (y, x) => (Math.atan2(y, x) * 180) / Math.PI;
const sin = (value) => Math.sin(degrees(value));
const cos = (value) => Math.cos(degrees(value));
const tan = (value) => Math.tan(degrees(value));
const arccot = (value) => (Math.atan(1 / value) * 180) / Math.PI;
const normalize = (value, range) => ((value % range) + range) % range;

function julianDate(year, month, day) {
  let adjustedYear = year;
  let adjustedMonth = month;
  if (month <= 2) { adjustedYear -= 1; adjustedMonth += 12; }
  const century = Math.floor(adjustedYear / 100);
  const correction = 2 - century + Math.floor(century / 4);
  return Math.floor(365.25 * (adjustedYear + 4716)) + Math.floor(30.6001 * (adjustedMonth + 1)) + day + correction - 1524.5;
}

function sunPosition(julian) {
  const days = julian - 2451545;
  const anomaly = normalize(357.529 + 0.98560028 * days, 360);
  const longitudeBase = normalize(280.459 + 0.98564736 * days, 360);
  const longitude = normalize(longitudeBase + 1.915 * sin(anomaly) + 0.02 * sin(2 * anomaly), 360);
  const obliquity = 23.439 - 0.00000036 * days;
  const rightAscension = normalize(arctan2(cos(obliquity) * sin(longitude), cos(longitude)) / 15, 24);
  return { declination: arcsin(sin(obliquity) * sin(longitude)), equation: longitudeBase / 15 - rightAscension };
}

function dayPortion(value) { return value / 24; }

export function calculatePrayerTimes(dateParts, latitude, longitude, timezone = 7) {
  const baseJulian = julianDate(dateParts.year, dateParts.month, dateParts.day) - longitude / (15 * 24);
  const midday = (time) => normalize(12 - sunPosition(baseJulian + dayPortion(time)).equation, 24);
  const angleTime = (angle, time, direction) => {
    const position = sunPosition(baseJulian + dayPortion(time));
    const noon = midday(time);
    const ratio = (-sin(angle) - sin(position.declination) * sin(latitude)) / (cos(position.declination) * cos(latitude));
    const difference = arccos(Math.min(1, Math.max(-1, ratio))) / 15;
    return noon + (direction === "before" ? -difference : difference);
  };
  const asrTime = (time) => {
    const declination = sunPosition(baseJulian + dayPortion(time)).declination;
    const angle = -arccot(1 + tan(Math.abs(latitude - declination)));
    return angleTime(angle, time, "after");
  };

  const initial = { fajr: 5, sunrise: 6, dhuhr: 12, asr: 13, maghrib: 18, isha: 18 };
  let times = initial;
  for (let iteration = 0; iteration < 2; iteration += 1) {
    times = {
      fajr: angleTime(20, times.fajr, "before"),
      sunrise: angleTime(0.833, times.sunrise, "before"),
      dhuhr: midday(times.dhuhr),
      asr: asrTime(times.asr),
      maghrib: angleTime(0.833, times.maghrib, "after"),
      isha: angleTime(18, times.isha, "after"),
    };
  }
  const offset = timezone - longitude / 15;
  return Object.fromEntries(Object.entries(times).map(([name, value]) => [name, normalize(value + offset, 24)]));
}

export function formatPrayerTime(decimalHours) {
  const roundedMinutes = Math.round(decimalHours * 60);
  const hours = Math.floor(roundedMinutes / 60) % 24;
  const minutes = roundedMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function jakartaDateParts(date = new Date()) {
  const values = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", month: "numeric", day: "numeric" })
      .formatToParts(date).filter((part) => part.type !== "literal").map((part) => [part.type, Number(part.value)]),
  );
  return { year: values.year, month: values.month, day: values.day };
}
