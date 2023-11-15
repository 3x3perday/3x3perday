import styles from "./input.module.scss";
import Image from "next/image";

type Props = {
	required?: boolean
}
export default function PwInputComponent({required}: Props) {
	return (
		<div className={styles.pwInputDiv}>
			<div>
				<label htmlFor="pw">비밀번호</label>
				{required &&
          <Image className={styles.requiredImg} src="/icon/required.svg" alt="필수" width={9} height={9}/>
				}
			</div>
			<div>
				<input type="password" id="pw"/>
				<Image className={styles.pwIcon} src="/icon/eye.svg" alt="hint" width={21} height={16}/>
			</div>
		</div>
	);
}