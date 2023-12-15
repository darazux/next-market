// pages/item/read.js

import Image from 'next/image';

const ReadSingleItem = (props) => {
  return (
    <div>
      <div>
        <Image
          src={props.singleItem.image}
          width={750}
          height={500}
          priority={true}
          alt="item-image"
        />
      </div>
      <div>
        <h1>{props.singleItem.title}</h1>
        <h2>￥{Number(props.singleItem.price).toLocaleString()}</h2>
        <hr />
        <p>{props.singleItem.description}</p>
      </div>
    </div>
  );
};

export default ReadSingleItem;

export const getServerSideProps = async (ctx) => {
  const resp = await fetch(`http://localhost:3000/api/item/${ctx.query.id}`);
  const singleItem = await resp.json();
  return {
    props: singleItem,
  };
};
