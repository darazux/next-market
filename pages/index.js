// pages/index.js
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { getUrl } from 'nextjs-current-url/server';

const ReadAllItems = (props) => {
  return (
    <div>
      <Head>
        <title>Next Market</title>
      </Head>
      <div className="grid-container-in">
        {props.allItems.map((item) => (
          <Link href={`/item/${item._id}`} key={item._id} className="card">
            <Image
              src={item.image}
              width={750}
              height={500}
              priority={true}
              alt="item-image"
            />
            <div className="texts-area">
              <h2>￥{Number(item.price).toLocaleString()}</h2>
              <h3>{item.title}</h3>
              <p>{item.description.substring(0, 80)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReadAllItems;

export const getServerSideProps = async (ctx) => {
  const url = await getUrl({ req: ctx.req });
  console.log(url);
  const resp = await fetch(`${url.origin}/api/item/readall`);
  const allItems = await resp.json();
  return {
    props: allItems,
  };
};
