'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save token in cookie (expires in 7 days)
      document.cookie = `id_token=${data.id_token}; path=/; max-age=${60 * 60 * 24 * 7}`;

      // Redirect to statistics
      window.location.href = '/statistics';
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>🔐 Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ width: '100%' }}>Login</button>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <button
        onClick={() => signIn('github')}
        style={{ width: '100%', padding: '0.5rem', backgroundColor: '#24292e', color: 'white', border: 'none' }}
      >
        🐙 Login with GitHub
      </button>
    </div>
  );
}
