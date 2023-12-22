// pages/item/read.js

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getUrl } from 'nextjs-current-url/server';

const ReadSingleItem = (props) => {
  const id = props.singleItem._id;
  return (
    <div className="grid-container-si">
      <Head>
        <title>{props.singleItem.title}</title>
      </Head>
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
        <div>
          <Link href={`/item/update/${id}`}>アイテム編集</Link>
          <Link href={`/item/delete/${id}`}>アイテム削除</Link>
        </div>
      </div>
    </div>
  );
};

export default ReadSingleItem;

export const getServerSideProps = async (ctx) => {
  const url = await getUrl({ req: ctx.req });
  const resp = await fetch(`${url.origin}/api/item/${ctx.query.id}`);
  const singleItem = await resp.json();
  return {
    props: singleItem,
  };
};
