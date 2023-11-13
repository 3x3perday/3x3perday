"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {css} from "@emotion/react";
import dayjs from "dayjs";
import {Date} from "@/utils/date";
import {usePathname, useRouter} from "next/navigation";

interface Props {
	date: string;
	setDate: React.Dispatch<React.SetStateAction<string>>;
}

// Navbar 는 날짜 관련 컴포넌트
export default function Navbar({date, setDate}: Props) {
  const [isToday, setIsToday] = useState(true);
  const router = useRouter();
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

  const goAchieve = () => {
    router.push("/achieve");
  };

  const goEdit = () => {
    router.push("/todo/edit");
  };
  const path = usePathname();
  return (
    <div css={navBarCSS}>
      <div css={navTopCSS}>
        <div className="left">
          <Image
            src="/image/logo.svg"

            width={90}
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
              onClick={goAchieve}
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
        {path === "/todo" && (
          <div css={btnCSS}>
            <button onClick={goEdit} className="edit_btn">
							수정
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

const navBarCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 36px;
`;

const navTopCSS = css`
  height: 100px;
  display: flex;
  justify-content: space-between;

  .left {
    padding: 20px 20px 20px 35px;
  }

  .right {
    display: flex;
    align-items: center;
    padding-right: 35px;

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
    left: calc(30% - 34px);
  }

  .arrow_right {
    cursor: pointer;
    position: absolute;
    right: calc(30% - 34px);
  }

  .date {
    border-bottom-color: #aaaaaa;
    border-bottom: solid 2px;
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

const btnCSS = css`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 35px;

  .edit_btn {
    width: 60px;
    height: 25px;
    border: none;
    font-family: Pretendard, serif;
    background-color: transparent;
    color: var(--33cream, #FEFAEB);
    opacity: 0.5;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #ffffff40;
    }
  }
`;
