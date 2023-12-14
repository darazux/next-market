// delete.js

import auth from '@/utils/auth';
import connectDB from '@/utils/database';
import { ItemModel } from '@/utils/schemaModels';

const deleteItem = async (req, res) => {
  try {
    const id = req.query.id;
    await connectDB();
    const singleItem = await ItemModel.findById(id);
    const loginEmail = req.body.email;
    if (singleItem.email !== loginEmail) {
      throw new Error();
    }
    await ItemModel.deleteOne({ _id: id });
    return res.status(200).json({ message: 'アイテム削除成功' });
  } catch (err) {
    return res.status(400).json({ message: 'アイテム削除失敗' });
  }
};

export default auth(deleteItem);
