import { ChangeEvent } from 'react';

export const resizeInputHeight = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.target.style.height = 'auto';
  e.target.style.height = e.target.scrollHeight + 'px';
}
