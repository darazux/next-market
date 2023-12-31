// pages/user/register.js

import Head from 'next/head';
import { useState } from 'react';
import { useUrl } from 'nextjs-current-url';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { origin } = useUrl() ?? {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${origin}/api/user/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const jsonData = await resp.json();
      alert(jsonData.message);
    } catch (err) {
      alert('ユーザー登録失敗');
    }
  };
  return (
    <div>
      <Head>
        <title>ユーザー登録</title>
      </Head>
      <h1 className="page-title">ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          name="name"
          placeholder="名前"
          required
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          name="email"
          placeholder="メールアドレス"
          required
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          name="password"
          placeholder="パスワード"
          required
        />
        <button>登録</button>
      </form>
    </div>
  );
};

export default Register;
