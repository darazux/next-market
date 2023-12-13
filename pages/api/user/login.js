// login.js

import connectDB from '@/utils/database';
import { UserModel } from '@/utils/schemaModels';

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    await connectDB;
    const savedUserData = await UserModel.findOne({ email: email });
    console.log(savedUserData);
    // user data not found
    if (!savedUserData) {
      return res
        .status(400)
        .json({ message: 'ログイン失敗：ユーザー登録をしてください' });
    }
    // wrong password
    if (req.body.password !== savedUserData.password) {
      return res
        .status(400)
        .json({ message: 'ログイン失敗：パスワードが間違っています' });
    }
    return res.status(200).json({ message: 'ログイン成功' });
  } catch (err) {
    return res.status(400).json({ message: 'ログイン失敗' });
  }
};

export default loginUser;
