import React, { HTMLAttributes, useState } from 'react';
import styles from '@/components/Todo/Todo.module.scss';
import { Icon } from '@/components/Icon/Icon';

interface Props extends HTMLAttributes<HTMLDivElement> {
    isActive: boolean;
}

export const Toggle = ({ isActive, ...props }: Props) => {
  return (
    <div
      {...props}
      className={styles.toggleBtn}
    >
      <div className={isActive ? styles.toggleBtnActive : styles.toggleBtnInActive}>
        <Icon name={"arrow-up"} width="19px" height="13px" />
      </div>
    </div>
  );
};
