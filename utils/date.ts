import { MONTHS } from "@/constants/month";

export const getCurrentMonth = () => {
  const month = new Date().getMonth();
  return month;
}

export const getMonthList = () => {
  let months = []
  for (let i = 0; i <= getCurrentMonth(); i++) {
    const monthName = MONTHS[i]
    months.push(monthName)
  }
  return months;
}