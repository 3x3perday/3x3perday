export const dateToStr = (date: Date) => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const localTime = date.toLocaleTimeString();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = week[date.getDay()];

  return year + "- " + month + "- " + day;
};
