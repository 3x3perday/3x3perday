import styles from "./input.module.scss";
import Image from "next/image";
import {useState} from "react";

type Props = {
	required?: boolean
	state: string
	setState: ((value: (((prevState: string) => string) | string)) => void)
}
export default function PwInputComponent({required, state, setState}: Props) {

  const [hide, setHide] = useState(true);

  const onChangeHide = () => {
    setHide(prev => !prev);
  };

  return (
    <div className={styles.pwInputDiv}>
      <div>
        <label htmlFor="pw">비밀번호</label>
        {required &&
          <Image className={styles.requiredImg} src="/icon/required.svg" alt="필수" width={9} height={9}/>
        }
      </div>
      <div>
        <input type={hide ? "password" : "text"} id="pw" value={state} onChange={(e) => setState(e.target.value)}/>
        <Image className={styles.pwIcon} onClick={onChangeHide} src={hide ? "/icon/eye.svg" : "/icon/eyeOn.svg"}
							 alt="hint" width={21} height={16}/>
      </div>
    </div>
  );
}