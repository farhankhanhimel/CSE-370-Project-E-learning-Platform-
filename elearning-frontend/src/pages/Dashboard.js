export default function Dashboard() {
  const role = localStorage.getItem('role');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {role === 'student' && <p>My Courses & Progress</p>}
      {role === 'instructor' && <p>Create & Manage Courses</p>}
      {role === 'admin' && <p>Admin Analytics & Controls</p>}
    </div>
  );
}
