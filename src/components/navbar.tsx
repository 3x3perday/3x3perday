import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {css} from "@emotion/react";

type propsType = {};

export default function Navbar(props: propsType) {
	const [nowDate, setNowDate] = useState(new Date());

	const dateToStr = (date: Date) => {
		const week = ['일', '월', '화', '수', '목', '금', '토'];

		const localTime = date.toLocaleTimeString();

		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const dayName = week[date.getDay()];

		return year + '년 ' + month + '월 ' + day + '일 ';
	};

	useEffect(() => {

	}, []);

	return (
		<div css={css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
		`}>

			<Image css={css`
        flex: 0 0 auto;
			`} src="arrow.svg" width={25} height={50} alt="arrow"/>

			<div css={css`
        border-bottom-color: #AAAAAA;
        border-bottom: solid 3px;
        font-size: 22px;
        font-weight: 800;
        color: #A5A5A5;
        letter-spacing: 0.2px;
        width: 199px;
        height: 33px;
        text-align: center;
        position: absolute;
        left: 50%;
        translate: -50%;
			`}>
				{dateToStr(nowDate)}
			</div>
			<div css={css`flex: 1;`}/>
		</div>
	);
}