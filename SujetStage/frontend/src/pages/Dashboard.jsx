import { useEffect, useState } from 'react';
import { axiosClient } from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axiosClient.get('/api/user');
      setUser(res.data);
    } catch (err) {
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    await axiosClient.post('/api/logout');
    navigate('/login');
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}