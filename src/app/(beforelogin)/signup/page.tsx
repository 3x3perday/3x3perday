'use client';

import styles from './page.module.scss';
import Image from "next/image";
import InputComponent from "@/components/sign/inputComponent";
import PwInputComponent from "@/components/sign/pwInputComponent";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Page() {


  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 이메일형식체크, 비밀번호는 영어, 숫자, 특수문자
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/.test(password) && check) setSuccess(true);
    else setSuccess(false);
  }, [check, email, password]);

  const onClickCheck = () => {
    setCheck(prev => !prev);
  };

  const onSubmit = async () => {
    // 각종 오류 체크

    await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
      if (res.status === 200) {
        router.push('/login');
      } else alert("다시 시도해주세요!");
    });

  };


  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div>
          <Image className={styles.backImg} src="/icon/back.png" alt="back" width={31} height={31}/>
          <div>
            <InputComponent state={email} setState={setEmail} title="이메일 주소" required={true}/>
          </div>

          <div>
            <PwInputComponent state={password} setState={setPassword} required={true}/>
          </div>
          <div>
            <div className={styles.checkDiv}>
              <span className={styles.span1}>
						회원정보 확인을 위해
              </span>
              <br/>
              <span className={styles.span2}>
							필수약관에 동의해 주세요.
              </span>
            </div>
            <div className={styles.checkDiv2}>
              <div className={styles.checkCom}>
                <div>
                  <div style={{paddingBottom: '9px'}}>
                    <span className={styles.span1}>
							3perday 이용약관 전체 동의
                    </span>
                  </div>
                  <div style={{paddingBottom: '7px'}}>
                    <span className={styles.span2}>[필수]</span>
                    <span className={styles.span3}>서비스 이용약관</span>
                  </div>
                  <div>
                    <span className={styles.span2}>[필수]</span>
                    <span className={styles.span3}>개인정보 보호정책</span>
                  </div>
                </div>
                <div className={styles.checkbox}>
                  {check ?
                    <Image onClick={onClickCheck} src="/icon/signChecked.svg" alt="checked" width={41} height={45}/> :
                    <Image onClick={onClickCheck} src="/icon/signCheck.svg" alt="check" width={41} height={45}/>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.loginDiv}>
          <button onClick={onSubmit} className={styles.loginBtn} disabled={!success}>
						Sign in
          </button>
        </div>
      </section>
    </div>
  );
}