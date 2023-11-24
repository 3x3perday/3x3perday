import styles from './DateNavBar.module.scss'
import Link from 'next/link';
import { Date } from "@/utils/date";
import { Icon } from '@/components/Icon/Icon';

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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link
          hidden={minDate === date}
          href={`?date=${navDate.prev}`}
          className={styles.leftArrow}
        >
          <Icon name="date-arrow" width='20px' height='20px' />
        </Link>
        <p>{navDate.current}</p>
        <Link
          hidden={maxDate === date}
          href={`?date=${navDate.next}`}
          className={styles.rightArrow}
        >
          <Icon name="date-arrow" width='20px' height='20px' />
        </Link>
      </div>
    </div>
  )
}
