import { axiosClient } from '../api/axios';

export default function Logout() {
  const handleLogout = async () => {
    await axiosClient.post('/api/logout');
    alert('Logged out');
  };

  return <button onClick={handleLogout}>Logout</button>;
}