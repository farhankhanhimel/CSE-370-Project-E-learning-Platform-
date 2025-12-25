export default function CourseCard({ course }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold">{course.title}</h3>
      <p className="text-sm">{course.category_name}</p>
      <p className="text-xs text-gray-500">{course.difficulty}</p>
    </div>
  );
}

