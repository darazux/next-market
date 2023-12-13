// register.js

import connectDB from '@/utils/database';
import { UserModel } from '@/utils/schemaModels';

const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    await connectDB();
    await UserModel.create(userData);
    return res.status(200).json({ message: 'ユーザー登録成功' });
  } catch (err) {
    return res.status(400).json({ message: 'ユーザー登録失敗' });
  }
};

export default registerUser;
