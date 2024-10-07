import Link from 'next/link';
import React, { useState } from 'react';

const Products = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (props.error) {
    return <div>Error: {props.error}</div>;
  }

  // Get unique categories from the product data
  const categories = ['All', ...new Set(props.products.data.map(item => item.attributes.category))];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? props.products.data 
    : props.products.data.filter(item => item.attributes.category === selectedCategory);

  return (
    <div className="container mx-auto px-4">
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-24 mx-auto">
          <div className="flex flex-wrap w-full md:mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Product List - MyShop
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
          </div>

          {/* Category Filter Dropdown */}
          <div className="mb-8">
            <label className="mr-4">Filter by Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border-gray-300 border-2 p-2 rounded"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap -m-4">
            {filteredProducts.map((item) => (
              <div key={item.id} className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <img
                    className="h-96 rounded m-auto mb-8"
                    src={
                      item.attributes.image.data &&
                      `http://localhost:1337${item.attributes.image.data.attributes.url}`
                    }
                    alt={item.attributes.title}
                  />
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    {item.attributes.category}
                  </h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                    {item.attributes.title}
                  </h2>
                  <button
                    className="border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none"
                    style={{ backgroundColor: item.attributes.color }}
                  ></button>
                  <p className="leading-relaxed text-base">
                    {item.attributes.description
                      .split(" ")               
                      .slice(0, 20)             
                      .join(" ")                
                      + (item.attributes.description.split(" ").length > 20 ? "..." : "")}
                  </p>

                  <Link href={`/product/${item.attributes.slug}`}>
                    <button className="my-2 text-white bg-indigo-500 border-0 py-1 md:py-2 px-2 md:px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

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

export default Products;
