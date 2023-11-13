import dayjs from "dayjs";
// https://day.js.org/docs/en/plugin/custom-parse-format
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat);

export const Date = {
  getToday: () => {
    return dayjs().format("YYYY-MM-DD");
  },
  getYesterday: (today: string) => {
    return dayjs(today).subtract(1, "day").format("YYYY-MM-DD");
  },
  valid: (date: string) => {
    return dayjs(date, 'YYYY-MM-DD', true).isValid();
  },
  getPrevDate(date: string, day: number) {
    if(!this.valid(date)) {
      throw new Error('invalid date string')
    }
    return dayjs(date).subtract(day, 'day').format('YYYY-MM-DD')
  },
  getNextDate(date: string, day: number) {
    if(!this.valid(date)) {
      throw new Error('invalid date string')
    }
    return dayjs(date).add(day, 'day').format('YYYY-MM-DD')
  },
  getMinAndMaxDate(date: string, subtractDays: number, addDays: number) {
    if(!this.valid(date)) {
      throw new Error('invalid date string')
    }
    const prevDate = this.getPrevDate(date, subtractDays);
    const nextDate = this.getNextDate(date, addDays);
    return {
      currentDate: date,
      minDate: prevDate,
      maxDate: nextDate,
    }
  }
};
