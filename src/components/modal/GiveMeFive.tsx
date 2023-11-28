'use client';

import React, {useEffect, useRef} from "react";
import styles from "./giveMeFive.module.scss";
import Image from "next/image";

export default function GiveMeFive() {

	const containerRef = useRef(null);

	useEffect(() => {

		const fillList = ['#61A4D1', '#EF814B', '#FCEC5B', '#5FD367'];
		const createDownBar = () => {
			const el = window.document.createElement('div');
			el.classList.add(styles.bar);
			el.style.marginLeft = Math.floor(Math.random() * 400) + 'px';
			el.style.animationDelay = Math.random() * 3 + 's';
			el.style.background = fillList[Math.floor(Math.random() * fillList.length)];
			// @ts-ignore
			containerRef.current?.appendChild(el);
		};

		for (let i = 0; i < 10; i++) {
			createDownBar();
		}

		setTimeout(() => {
			window.document.getElementById('container')?.remove();
		}, 15000);


	}, []);
	return (
		<div id="container" ref={containerRef} className={styles.container}>
			<div className={styles.back}>
			</div>
			<div className={styles.main}>
				<div className={styles.gmf}>
					<Image src="/image/GMF.png" alt="GIVE ME FIVE!" width={350} height={40}/>
				</div>
				<div className={styles.test}>
					<div className={styles.leftHand}>
						<Image src="/image/leftHand.svg" alt="왼손" width={200} height={286}/>
					</div>
					<div className={styles.rightHand}>
						<Image src="/image/rightHand.svg" alt="오른손" width={200} height={286}/>
					</div>
				</div>
			</div>
		</div>
	);
}