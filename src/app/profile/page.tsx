import { ArchiveResponse } from "@/types/archive";
import { TodoResponse } from "@/types/todo";
import { http } from "@/utils/http";

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
  const archive = (await getArchiveData("1234")) as ArchiveResponse;
  console.log(archive, "🔥");
  return (
    <div>
      <h1>totaldays: {archive.totaldays}</h1>
      <h1>totalMainTodo: {archive.totalMainTodo}</h1>
      <h1>doneMainTodo: {archive.doneMainTodo}</h1>
      <h1>totalSubTodo: {archive.totalSubTodo}</h1>
      <h1>doneSubTodo: {archive.doneSubTodo}</h1>
    </div>
  );
}
