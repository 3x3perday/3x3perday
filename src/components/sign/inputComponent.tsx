import styles from "./input.module.scss";
import Image from "next/image";

type Props = {
	title: string;
	required?: boolean
}
export default function InputComponent({title, required}: Props) {
	return (
		<div className={styles.inputDiv}>
			<div>
				<label htmlFor="id">{title}</label>
				{required &&
          <Image className={styles.requiredImg} src="/icon/required.svg" alt="필수" width={9} height={9}/>
				}
			</div>
			<input type="text" id="id"/>
		</div>
	);
}