import styles from "./input.module.scss";
import Image from "next/image";

type Props = {
	title: string;
	required?: boolean
	state: string
	setState: ((value: (((prevState: string) => string) | string)) => void)
}
export default function InputComponent({title, required, state, setState}: Props) {

  return (
    <div className={styles.inputDiv}>
      <div>
        <label htmlFor="id">{title}</label>
        {required &&
          <Image className={styles.requiredImg} src="/icon/required.svg" alt="필수" width={9} height={9}/>
        }
      </div>
      <input type="text" id="id" value={state} onChange={(e) => setState(e.target.value)}/>
    </div>
  );
}