import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';
import { axiosClient } from '../api/axios';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError("Veuillez entrer votre adresse e-mail et votre mot de passe.");
      setLoading(false);
      return;
    }

    try {
      await axiosClient.get('/sanctum/csrf-cookie');
      const response = await axiosClient.post('/api/login', { email, password }, {
        headers: { Accept: 'application/json' }
      });

      // Save user data to context
      login(response.data.user);

      // Redirect after login
      const redirectPath = location.state?.from?.pathname || '/Fournisseur';
      navigate(redirectPath, { replace: true });

    } catch (err) {
      if (err.response?.status === 422) {
        setError("Adresse e-mail ou mot de passe incorrect.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!email) {
      setError("Veuillez entrer votre adresse e-mail.");
      setLoading(false);
      return;
    }

    try {
      await axiosClient.get('/sanctum/csrf-cookie');
      await axiosClient.post('/api/forgot-password', { email }, {
        headers: { Accept: 'application/json' }
      });

      setMessage("Un lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail.");
    } catch (err) {
      if (err.response?.status === 422) {
        setError("Adresse e-mail introuvable.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-container">
      <h1>{forgotPassword ? "Mot de passe oublié" : "Se connecter"}</h1>

      <form onSubmit={forgotPassword ? handleForgotPassword : handleLogin}>
        <div id="input-group-email">
          <i className="fas fa-envelope"></i>
          <input
            id="email-input"
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            required
          />
        </div>

        {!forgotPassword && (
          <div id="input-group-password">
            <i className="fas fa-lock"></i>
            <input
              id="password-input"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button type="submit" disabled={loading} id="login-button">
          {loading ? (forgotPassword ? "Envoi en cours..." : "Connexion...") : (forgotPassword ? "Envoyer le lien" : "Se connecter")}
        </button>

        <div className="extra-actions">
          {!forgotPassword ? (
            <button
              type="button"
              id="forgot-password-link"
              onClick={() => {
                setForgotPassword(true);
                setError('');
                setMessage('');
              }}
            >
              Mot de passe oublié ?
            </button>
          ) : (
            <button
              type="button"
              id="back-to-login-link"
              onClick={() => {
                setForgotPassword(false);
                setError('');
                setMessage('');
              }}
            >
              Retour à la connexion
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;