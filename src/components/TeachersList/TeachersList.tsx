import type { Teacher } from "../../App.types";
import TeacherCard from "../TeacherCard/TeacherCard";

interface Props {
  teachers: Teacher[];
}

const TeacherList = ({ teachers }: Props) => {
  return (
    <section>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TeacherList;
