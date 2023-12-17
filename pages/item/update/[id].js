// pages/item/update/[id].js

import useAuth from '@/utils/useAuth';
import { useState } from 'react';

const UpdateItem = (props) => {
  const [title, setTitle] = useState(props.singleItem.title);
  const [price, setPrice] = useState(props.singleItem.price);
  const [image, setImage] = useState(props.singleItem.image);
  const [description, setDescription] = useState(props.singleItem.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        `http://localhost:3000/api/item/update/${props.singleItem._id}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            title: title,
            price: price,
            image: image,
            description: description,
          }),
        },
      );
      const jsonData = await resp.json();
      alert(jsonData.message);
    } catch (err) {
      alert('アイテム編集失敗');
    }
  };
  const loginUser = useAuth();
  if (loginUser !== props.singleItem.email) {
    return <h1>権限がありません</h1>;
  } else {
    return (
      <div>
        <h1>アイテム編集</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="アイテム名"
            required
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            name="price"
            placeholder="価格"
            required
          />
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            name="image"
            placeholder="画像"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            rows={15}
            placeholder="商品説明"
            required
          ></textarea>
          <button>編集</button>
        </form>
      </div>
    );
  }
};

export default UpdateItem;

export const getServerSideProps = async (ctx) => {
  const resp = await fetch(`http://localhost:3000/api/item/${ctx.query.id}`);
  const singleItem = await resp.json();

  return {
    props: singleItem,
  };
};
