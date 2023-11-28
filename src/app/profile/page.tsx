import { AppBar } from "@/components/navbar/AppBar";
import { NavBar } from "@/components/navbar/DateNavBar_edit";
import { ArchiveResponse } from "@/types/archive";
import { http } from "@/utils/http";
import styles from "./Profile.module.scss";
import { Avatar } from "@/components/Icon/Avatar";
import Image from "next/image";
const getArchiveData = async (date: string): Promise<any> => {
  const userId = "1234";
  const res = await http.get(
    `http://localhost:3000/api/todo/archive?userId=${userId}`,
    {
      cache: "no-cache",
    }
  );
  const todos = await res.json();

  return todos;
};

export default async function ProfilePage() {
  const USER_ID = "1234";
  const archive = (await getArchiveData(USER_ID)) as ArchiveResponse;
  return (
    <main>
      <AppBar />
      <NavBar content="MY Page" />
      <div className={styles.container}>
        <div className={styles.profile_img}>
          <Image
            src="/image/미모지.png"
            width={100}
            height={100}
            alt="profile"
          />
        </div>
        <div className={styles.profile_name}>슈슈기</div>
        <div className={styles.archive_box}>
          {archive.doneMainTodo + archive.doneSubTodo}
        </div>
        <div className={styles.archive_text}>Things You made it</div>

        <div className={styles.archive_detail_box}>
          <div className={styles.archive_detail}>
            <h3>총 {archive.totaldays} 일</h3>
          </div>

          <div className={styles.archive_detail}>
            <div className={styles.archive_detail_text}>달성한 MainTodo</div>
            <div className={styles.archive_detail_num}>
              {archive.doneMainTodo} / {archive.totalMainTodo}
            </div>
          </div>

          <div className={styles.archive_detail}>
            <div className={styles.archive_detail_text}>달성한 Sub Todo</div>
            <div className={styles.archive_detail_num}>
              {archive.doneSubTodo} / {archive.totalSubTodo}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
