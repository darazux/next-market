// create.js

import connectDB from '@/utils/database';

const createItem = (req, res) => {
  connectDB();
  return res.status(200).json({ message: req.body.title });
};

export default createItem;
