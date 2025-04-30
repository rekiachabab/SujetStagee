import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../api/axios'; 
import { useAuth } from '../context/AuthContext';
import '../styles/Register.css';

import '../stock.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password !== password_confirmation) {
      setError(' Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setIsLoading(false);
      return;
    }

    try {
      const csrf = await axiosClient.get('/sanctum/csrf-cookie');
      console.log(csrf);

      const response = await axiosClient.post('/api/register', {
        name,
        email,
        password,
        password_confirmation,
      });

      if (response.status === 201) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 422) {
        const errors = err.response.data.errors;
        const firstError = Object.values(errors)[0][0];
        setError(` ${firstError}`);
      } else {
        setError(' Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-form-container">
      <form onSubmit={handleRegister}>
        <h2>Créer un compte</h2>
        
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom complet"
            required
          />
        </div>

        <div className="input-group">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
        </div>

        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirmer le mot de passe"
            required
          />
        </div>

        <button className='BS'  type="submit" disabled={isLoading}>
          {isLoading ? 'Chargement...' : 'S’inscrire'}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}