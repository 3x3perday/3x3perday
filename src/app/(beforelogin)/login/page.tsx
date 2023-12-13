'use client';

import Image from "next/image";
import styles from "./page.module.scss";
import InputComponent from "@/components/sign/inputComponent";
import React, {useEffect, useState} from "react";
import PwInputComponent from "@/components/sign/pwInputComponent";
import Link from "next/link";
import {useRouter} from "next/navigation";
import GiveMeFive from "@/components/modal/GiveMeFive";

export default function Page() {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [success, setSuccess] = useState(false);


  const router = useRouter();

  useEffect(() => {
    // 이메일형식체크, 비밀번호는 영어, 숫자, 특수문자
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(id) && /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/.test(password)) setSuccess(true);
    else setSuccess(false);
  }, [id, password]);

  const onSubmit = async () => {
    // 각종 오류 체크

    await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: id,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        // 성공
        if (res.status === 200) {
          const response = res.json()
            .then(res => {
              const userId = res.userId;
              window.localStorage.setItem("userId", userId);
              router.push("/");
            });
        } else if (res.status === 404) {
          alert("이메일 또는 비밀번호가 일치하지 않습니다.");
        }
      });
  };


  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/image/newlogo.svg" alt="logo" width={220} height={174}/>
      </div>
      <div className={styles.form}>
        <div>
          <InputComponent title={"아이디"} state={id} setState={setId}/>
          <PwInputComponent state={password} setState={setPassword}/>
          <div className={styles.formDownDiv}>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={autoLogin} onChange={() => setAutoLogin(!autoLogin)}/>
              <span className={styles.checkboxIcon}></span>
              <span className={styles.checkboxText}>자동로그인</span>
            </label>
            <div className={styles.userInfoDiv}>
							회원정보 찾기
            </div>
          </div>
        </div>
        <div className={styles.loginDiv}>
          <button className={styles.loginBtn} disabled={!success} onClick={onSubmit}>
						Login
          </button>
          <Link href="/signup">
						회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}