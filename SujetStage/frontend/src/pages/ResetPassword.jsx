
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosClient } from '../api/axios';
import '../styles/ResetPassword.css'; 

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const email = queryParams.get('email');

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!password || !passwordConfirmation) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      await axiosClient.get('/sanctum/csrf-cookie');
      const response = await axiosClient.post('/api/reset-password', {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation
      });

      setMessage("Mot de passe réinitialisé avec succès.");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Réinitialiser le mot de passe</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />

        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Réinitialisation..." : "Réinitialiser"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;