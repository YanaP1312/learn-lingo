import TeacherCard from "../TeacherCard/TeacherCard";

const TeacherList = ({ teachers }) => {
  return (
    <section>
      <ul>
        {teachers.map((teacher) => (
          <TeacherCard teacher={teacher} key={teacher.id} />
        ))}
      </ul>
    </section>
  );
};

export default TeacherList;
