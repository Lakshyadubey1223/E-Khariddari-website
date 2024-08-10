import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <div className="flex justify-center -mt-10 mb-4 ">
        <Link to={'/allproducts'}>
          <button className='text-white px-5 py-2 rounded-xl bg-lime-600 hover:bg-lime-700'>See more</button>
        </Link>
      </div>
      <Track />
      <Testimonial />
    </Layout>
  )
}

export default Home
