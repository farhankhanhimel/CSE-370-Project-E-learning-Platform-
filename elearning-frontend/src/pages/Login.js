import { useState } from 'react';
import API from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);
    window.location.href = '/dashboard';
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="p-6 bg-white shadow w-80">
        <h2 className="text-xl mb-4">Login</h2>
        <input className="border p-2 w-full mb-2" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />
        <input type="password" className="border p-2 w-full mb-4" placeholder="Password"
          onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white w-full p-2">Login</button>
      </form>
    </div>
  );
}

