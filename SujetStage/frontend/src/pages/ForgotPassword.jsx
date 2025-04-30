import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      
      await axios.get('/sanctum/csrf-cookie');
      
     
      await axios.post('/password/email', { email });

      setMessage('Un lien de réinitialisation a été envoyé à votre e-mail.');
    } catch (err) {
      setError("Une erreur est survenue. Vérifiez l'email ou réessayez.");
    }
  };

  return (
    <div>
      <h2>Mot de passe oublié</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Entrez votre e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Envoyer le lien</button>
      </form>
      {message && <p >{message}</p>}
      {error && <p >{error}</p>}
    </div>
  );
};

export default ForgotPassword;