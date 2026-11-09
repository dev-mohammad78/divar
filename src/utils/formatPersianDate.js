import { toJalaali } from "jalaali-js";

const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

function toPersianNumber(number) {
  return number.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}

export function formatPersianDate(dateString) {
  const date = new Date(dateString);

  const { jy, jm, jd } = toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

  return `${toPersianNumber(jd)} ${persianMonths[jm - 1]} ${toPersianNumber(jy)}`;
}