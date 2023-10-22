"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import { Date } from "@/utils/date";

interface Props {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}
// Navbar 는 날짜 관련 컴포넌트
export default function Navbar({ date, setDate }: Props) {
  const [isToday, setIsToday] = useState(true);

  useEffect(() => {
    const today = Date.getToday();
    if (date === today) {
      return setIsToday(true);
    }
    setIsToday(false);
  }, [date]);

  const goYesterday = () => {
    const yesterday = Date.getYesterday(date);
    setDate(yesterday);
  };

  const goToday = () => {
    const today = Date.getToday();
    setDate(today);
  };

  return (
    <div css={navBarCSS}>
      <div css={navTopCSS}>
        <div className="left">
          <Image
            src="/image/logo.png"
            width={120}
            height={60}
            alt="logo"
            className="logo"
          />
        </div>
        <div className="right">
          <div className="profile">
            <Image
              src="/image/mimoji.png"
              width={50}
              height={50}
              alt="setting"
              className="setting"
            />
          </div>
        </div>
      </div>
      <div css={dateCSS}>
        {isToday && (
          <Image
            onClick={goYesterday}
            src="/icon/arrow_left.png"
            width={15}
            height={20}
            alt="arrow"
            className="arrow_left"
          />
        )}
        <div className="date">{date}</div>
        {!isToday && (
          <Image
            onClick={goToday}
            src="/icon/arrow_right.png"
            width={15}
            height={20}
            alt="arrow"
            className="arrow_right"
          />
        )}
      </div>
    </div>
  );
}

const navBarCSS = css`
  display: flex;
  height: 160px;
  background-color: #292929;
  flex-direction: column;
  justify-content: space-between;
`;

const navTopCSS = css`
  height: 100px;
  display: flex;
  justify-content: space-between;
  .left {
    padding: 20px;
  }
  .right {
    display: flex;
    align-items: center;
    padding-right: 20px;
    .profile {
      background-color: #fff;
      height: 60px;
      width: 60px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`;

const dateCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 60px;
  .arrow_left {
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 20px;
  }
  .arrow_right {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .date {
    border-bottom-color: #aaaaaa;
    border-bottom: solid 3px;
    font-size: 22px;
    font-weight: 800;
    color: #fff;
    width: 170px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
