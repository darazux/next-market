// utils/useAuth.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const secret_key = 'nextmarket';

const useAuth = () => {
  const [loginUser, setLoginUser] = useState('');
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('token is null');
        router.push('/user/login');
      }
      try {
        const origin = process.env.BASE_URL;
        const resp = await fetch(`${origin}api/user/verify-auth`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
          }),
        });
        const jsonData = await resp.json();
        setLoginUser(jsonData.email);
      } catch (err) {
        console.log(`[ERR] ${err}`);
        router.push('/user/login');
      }
    })();
  }, [router]);
  console.log(`loginUser: ${loginUser}`);
  return loginUser;
};

export default useAuth;
