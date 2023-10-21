import { ChangeEvent } from 'react';

export const inputHeightResize = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
}
