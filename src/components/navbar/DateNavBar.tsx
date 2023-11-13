import Link from 'next/link';
import {Date} from "@/utils/date";

interface Props {
    date: string;
    minDate?: string;
    maxDate?: string;
}

export const DateNavBar = ({ date, minDate, maxDate }: Props) => {
  const navDate = {
    prev: Date.getPrevDate(date, 1),
    current: date,
    next: Date.getNextDate(date, 1),
  };

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40px'
    }}>
      <Link
        hidden={minDate === date}
        href={`?date=${navDate.prev}`}
        style={{
          position: 'absolute',
          left: '20px'
        }}
      >
        {"<"}
      </Link>
      <p>{navDate.current}</p>
      <Link
        hidden={maxDate === date}
        href={`?date=${navDate.next}`}
        style={{
          position: 'absolute',
          right: '20px'
        }}
      >
        {">"}
      </Link>
    </div>
  )
}
