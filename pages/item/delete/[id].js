// pages/item/delete/delete.js

import useAuth from '@/utils/useAuth';
import Head from 'next/head';
import Image from 'next/image';

const DeleteItem = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(
        `http://localhost:3000/api/item/delete/${props.singleItem._id}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      const jsonData = await resp.json();
      alert(jsonData.message);
    } catch (err) {
      alert('アイテム削除失敗');
    }
  };
  const loginUser = useAuth();
  if (loginUser !== props.singleItem.email) {
    return <h1>権限がありません</h1>;
  } else {
    return (
      <div className="delete-page">
        <Head>
          <title>アイテム削除</title>
        </Head>
        <h1 className="page-title">アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{props.singleItem.title}</h2>
          <Image
            src={props.singleItem.image}
            width={750}
            height={500}
            priority={true}
            alt="item-image"
          />
          <h3>￥{Number(props.singleItem.price).toLocaleString()}</h3>
          <p>{props.singleItem.description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  }
};

export default DeleteItem;

export const getServerSideProps = async (ctx) => {
  const resp = await fetch(`http://localhost:3000/api/item/${ctx.query.id}`);
  const singleItem = await resp.json();

  return {
    props: singleItem,
  };
};
