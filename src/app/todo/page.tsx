import dayjs from 'dayjs';
import { DateNavBar } from '@/components/navbar/DateNavBar';
import { Date } from '@/utils/date';
import { AppBar } from '@/components/navbar/AppBar';
import TodoList from '@/components/Todo/TodoList';

type Props = {
    searchParams: {
        date: string;
    }
}

export default async function TodoPage({ searchParams }: Props) {
  const today = Date.getToday();
  const date = Date.valid(searchParams.date) ? searchParams.date : today;

  const { minDate, maxDate } = Date.getMinAndMaxDate(today, 1, 0);
  const validMinDate = dayjs(date).diff(minDate, 'd') >= 0;
  const validMaxDate = dayjs(date).diff(maxDate, 'd') <= 0;

  if (!(validMinDate && validMaxDate)) {
    throw new Error(`${minDate} ~ ${maxDate} 사이의 정보만 조회할 수 있어요.`)
  }

  return (
    <main>
      <AppBar />
      <DateNavBar date={date} minDate={minDate} maxDate={maxDate} />
      <div className="inner">
        <TodoList mode={"read"} date={date} />
      </div>
    </main>
  )
}
