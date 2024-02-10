'use client'

// import { Container, Navbar, Nav, FormControl, Button, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const Home = () => {
    const [banners, setBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % banners.length;
        setCurrentIndex(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + banners.length) % banners.length;
        setCurrentIndex(newIndex);
    };

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
        <div class=" ml-16 mr-16">
            {/* Header */}
            <header className="bg-white">
                <div className="container mx-auto py-4 px-4">
                    <div className="flex items-center justify-between">
                        <h1 className=" appname  font-bold ">Testvalley</h1>
                        <div class="m-0" >the category</div>
                        <div class="searchStyle bg-gray-800 ">
                            <input type="text" placeholder="Search..." class="inputStyle" />
                        </div>
                        <div class="loginSignupStyle bg-gray-800  ">
                            <button class="buttonStyle p-2 bg-gray-800 ">Login</button>
                            <button class="buttonStyle p-2 bg-gray-800 ">Sign Up</button>
                        </div>

                    </div>
                </div>
            </header>

            {/* Hero Component */}
            <div className="slider">

                <div className="slider-content overflow-x-scroll whitespace-nowrap">
                    {banners.map(banner => (
                        <img key={banner.mainBannerId} src={banner.pcImageUrl} alt={banner.title} className="inline-block min-w-screen" />
                    ))}

                </div>
                <button onClick={prevSlide} className="prev">&#10094;</button>
                <button onClick={nextSlide} className="next">&#10095;</button>
            </div>
            {/* Product Categories */}
            <div className=" mx-auto py-8 px-4">
                <div className="flex justify-center items-center overflow-x-scroll space-x-4">
                    {categories.map(category => (
                        <div key={category.mainBannerId}>
                            <img src={category.imageUrl} alt={category.title} className="h-16 w-16 categories object-cover rounded-md shadow-md" />
                            <p className="text-center mt-2">{category.title}</p>
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
                                    <p className="text-center mt-2 ">{product.media[0].fileName}</p>
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