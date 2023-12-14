// update.js

import auth from '@/utils/auth';
import connectDB from '@/utils/database';
import { ItemModel } from '@/utils/schemaModels';

const updateItem = async (req, res) => {
  try {
    const id = req.query.id;
    await connectDB();
    const singleItem = ItemModel.findById(id);
    const loginEmail = req.body.emamil;
    if (singleItem.email !== loginEmail) {
      throw new Error();
    }
    await ItemModel.updateOne({ _id: id }, req.body);
    return res.status(200).json({ message: 'アイテム編集成功' });
  } catch (err) {
    return res.status(400).json({ message: 'アイテム編集失敗' });
  }
};

export default auth(updateItem);
