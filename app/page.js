'use client'

// import { Container, Navbar, Nav, FormControl, Button, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const Home = () => {
    const [banners, setBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://api.testvalley.kr/main-banner/all')
            .then(response => response.json())
            .then(data => setBanners(data))
            .catch(error => console.error('Error fetching banners:', error));

        fetch('https://api.testvalley.kr/main-shortcut/all')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));

        fetch('https://api.testvalley.kr/collections?prearrangedDiscount')
            .then(response => response.json())
            .then(data => setProducts(data.items))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    
    return (
      <div>
          {/* Header */}
          <header className="bg-gray-800 text-white">
              <div className="container mx-auto py-4 px-4">
                  <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold ">Testvalley</h1>
                      <div className="flex">
                          <input type="text" placeholder="Search" className="px-4 py-2 rounded-l-md focus:outline-none" />
                          <button className="bg-green-500 px-4 py-2 rounded-r-md">Search</button>
                      </div>
                  </div>
              </div>
          </header>

          {/* Hero Component */}
          <div className="overflow-x-scroll whitespace-nowrap">
              {banners.map(banner => (
                  <img key={banner.mainBannerId} src={banner.pcImageUrl} alt={banner.title} className="inline-block min-w-screen" />
              ))}
          </div>

          {/* Product Categories */}
          <div className="container mx-auto py-8">
              <h2 className="text-2xl font-bold mb-4">Product Categories</h2>
              <div className="flex overflow-x-scroll">
                  {categories.map(categories => (
                      <div key={categories.mainBannerId} className="flex-shrink-0 mr-4">
                          <img src={categories.imageUrl} alt={categories.title} className="w-32 h-32 object-cover rounded-md shadow-md" />
                          <p className="text-center mt-2">{categories.title}</p>
                      </div>
                  ))}
              </div>
          </div>

                  {/* Products Grid */}
  <div className="container mx-auto py-8">
    <h2 className="text-2xl font-bold mb-4">Products</h2>
    <div className="grid grid-cols-4 gap-4">
        {products.map(product => (
            <div key={product.id} className="flex flex-col items-center">
                {product.media && product.media.length > 0 && (
                    <>
                        <img src={product.media[0].uri} alt={product.media[0].fileName} className="w-32 h-32 object-cover rounded-md shadow-md" />
                        <p className="text-center mt-2">{product.media[0].fileName}</p>
                    </>
                )}
            </div>
        ))}
    </div>
</div>
      </div>
  );
};

export default Home;


import './styles.css';