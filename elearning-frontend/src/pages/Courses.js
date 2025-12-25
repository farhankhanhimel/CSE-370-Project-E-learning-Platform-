import { useEffect, useState } from 'react';
import API from '../services/api';
import CourseCard from '../components/CourseCard';

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get('/courses').then(res => setCourses(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {courses.map(course => (
        <CourseCard key={course.course_id} course={course} />
      ))}
    </div>
  );
}
