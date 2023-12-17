// utils/useAuth.js

import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';

const secret_key = 'nextamrket';

const useAuth = () => {
  const [loginUser, setLoginUser] = useState('');
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('tokenn');
    if (!token) {
      router.push('/user/login');
    }
    try {
      const decoded = jwt.verify(token, secret_key);
      setLoinUser(decoded.email);
    } catch (err) {
      router.push('/user/login');
    }
  }, [router]);
  return loginUser;
};

export default useAuth;
