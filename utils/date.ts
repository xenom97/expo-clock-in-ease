export const getDaysInMonth = (month: number, year: number = 2024) => {
  return new Date(year, month, 0).getDate();
}

export const getCurrentMonth = () => {
  const month = new Date().getMonth();
  return month + 1;
}

export const getMonthName = (month: number) => {
  return new Date(0, month - 1).toLocaleDateString("id-ID", {
    month: "long",
  });
}

export const getMonthList = () => {
  let months = []
  for (let i = 1; i <= getCurrentMonth(); i++) {
    const monthName = getMonthName(i)
    months.push(monthName)
  }
  return months;
}