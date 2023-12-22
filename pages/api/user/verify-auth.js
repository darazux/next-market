// verify-auth.js

import jwt from 'jsonwebtoken';

const secret_key = 'nextmarket';

const verifyAuthUser = async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({ message: 'トークンがありません' });
  }
  try {
    const decoded = jwt.verify(token, secret_key);
    console.log(decoded.email);
    return res
      .status(200)
      .json({ message: 'トークン抽出成功', email: decoded.email });
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ message: 'トークンが正しくないので、ログインしてください' });
  }
};

export default verifyAuthUser;
