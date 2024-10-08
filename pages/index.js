import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home({ products }) {
  const [shopText, setShopText] = useState('');
  const fullText = 'My Shop';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setShopText(fullText.slice(0, index));
      setIndex((prevIndex) => (prevIndex < fullText.length ? prevIndex + 1 : 0)); 
    }, 150);

    return () => clearTimeout(interval);
  }, [index]);

  const [staticProducts, setStaticProducts] = useState([]);

  const getRandomProducts = (products) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8); 
  };

  useEffect(() => {
    setStaticProducts(getRandomProducts(products.data));
  }, [products]);

  return (
    <div className='container mx-auto px-4'>
      <div className="relative">
        <img
          className='object-cover object-top bg-yellow-300 w-full h-[60vh]' 
          src="bg.jpg"
          alt="Background"
        />
        <div className="absolute inset-0 flex justify-end items-center pr-12">
          <div className="text-right">
            <div className="h-12">
              <h1 className="text-6xl font-bold text-sky-500">{shopText || '\u00A0'}</h1> 
            </div>
            <p className="text-2xl text-white mt-2">Let's find your favourite</p> 
          </div>
        </div>
      </div>
      
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
              Most Buy Products
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Explore our Bestsellers
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            {staticProducts.map((product, index) => (
              <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <div className="block relative h-48 rounded overflow-hidden">
                  <img 
                    alt={product.attributes.title} 
                    className="object-cover object-center w-full h-full block" 
                    src={`http://localhost:1337${product.attributes.image.data.attributes.url}`} // Dynamic image from API
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.attributes.category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{product.attributes.title}</h2>
                  <p className="mt-1">${product.attributes.price}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/products">
            <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Start Shopping
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    let a = await fetch("http://localhost:1337/api/products?populate=*");
    let products = await a.json();

    return {
      props: { products }, 
    };
  } catch (error) {
    return {
      props: { error: 'Failed to fetch products' }, 
    };
  }
}
