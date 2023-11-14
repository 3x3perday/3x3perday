import Image from "next/image";
import styles from "./page.module.scss";

export default function Page() {
	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<Image src="/image/logo.svg" alt="logo" width={280} height={174}/>
			</div>
			<form className={styles.form}>
				<div>
					<div className={styles.idInput}>
						<label htmlFor="id">아이디</label>
						<input type="text" id="id"/>
					</div>
					<div className={styles.pwInput}>
						<label htmlFor="pw">비밀번호</label>
						<div>
							<input type="password" id="pw"/>
							<Image className={styles.pwIcon} src="/icon/eye.svg" alt="hint" width={21} height={16}/>
						</div>
					</div>
					<div className={styles.formDownDiv}>
						<div className={styles.checkboxDiv}>
							<input type="checkbox" id="autoLogin"/>
							<label htmlFor="checkbox">자동 로그인</label>
						</div>
						<div className={styles.userInfoDiv}>
							회원정보 찾기
						</div>
					</div>
				</div>
				<div className={styles.loginDiv}>
					<button className={styles.loginBtn}>
						Login
					</button>
					<span>
						회원가입
					</span>
				</div>
			</form>
		</div>
	);
}