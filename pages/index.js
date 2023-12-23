// pages/index.js
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const ReadAllItems = (props) => {
  const [itemData, setItemData] = useState('');
  useEffect(() => {
    const getAllData = async () => {
      const origin = process.env.BASE_URL;
      const resp = await fetch(`${origin}api/item/readall`);
      const allItems = await resp.json();
      setItemData(allItems);
    };
    getAllData();
  }, []);

  return (
    <div>
      <Head>
        <title>Next Market</title>
      </Head>
      <div className="grid-container-in">
        {itemData &&
          itemData.allItems.map((item) => (
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
