import styles from './page.module.scss';
import Image from "next/image";
import InputComponent from "@/components/sign/inputComponent";
import PwInputComponent from "@/components/sign/pwInputComponent";

export default function Page() {
	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<div>
					<Image className={styles.backImg} src="/icon/back.png" alt="back" width={31} height={31}/>
					<div style={{paddingBottom: "10px"}}>
						<InputComponent title="이메일 주소" required={true}/>
					</div>
					<div style={{paddingBottom: "103px"}}>
						<PwInputComponent required={true}/>
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
									<Image src="/icon/signCheck.svg" alt="check" width={41} height={45}/>
									{/*<Image src="/icon/signChecked.svg" alt="checked" width={41} height={45}/>*/}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.loginDiv}>
					<button className={styles.loginBtn}>
						Sign in
					</button>
				</div>
			</section>
		</div>
	);
}