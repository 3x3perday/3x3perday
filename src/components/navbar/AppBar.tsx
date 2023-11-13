import { Icon } from '@/components/Icon/Icon';
import { Avatar } from '@/components/Icon/Avatar';
import Link from 'next/link';

export const AppBar = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}
    >
      <Link href='/'>
        <Icon name='main-logo' width='90px' height='55.946px' />
      </Link>
      <Link href='/profile'>
        <Avatar alt='Logo Image' size={36} />
      </Link>
    </div>
  )
}
