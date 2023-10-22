import dayjs from "dayjs";

export const Date = {
  getToday: () => {
    return dayjs().format("YYYY-MM-DD");
  },
  getYesterday: (today: string) => {
    return dayjs(today).subtract(1, "day").format("YYYY-MM-DD");
  },
};
