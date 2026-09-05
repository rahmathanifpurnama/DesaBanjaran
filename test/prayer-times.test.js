import test from "node:test";
import assert from "node:assert/strict";
import { calculatePrayerTimes, formatPrayerTime } from "../public/js/prayer-times.js";

test("menghitung jadwal harian Desa Banjaran", () => {
  const times = calculatePrayerTimes({ year: 2025, month: 2, day: 15 }, -5.62087, 105.11417, 7);
  assert.equal(formatPrayerTime(times.fajr), "04:46");
  assert.equal(formatPrayerTime(times.sunrise), "06:05");
  assert.equal(formatPrayerTime(times.dhuhr), "12:14");
  assert.equal(formatPrayerTime(times.maghrib), "18:22");
  assert.ok(times.fajr < times.sunrise && times.sunrise < times.dhuhr && times.dhuhr < times.asr && times.asr < times.maghrib && times.maghrib < times.isha);
});

test("format jadwal membulatkan ke menit terdekat", () => {
  assert.equal(formatPrayerTime(4.5), "04:30");
  assert.equal(formatPrayerTime(18.999), "19:00");
});
