import { useEffect, useState } from 'react';
import { getProducts } from '@/services/products';
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandSection from '../components/home/BrandSection';
import DarkPremiumSection from '../components/home/DarkPremiumSection';

const images = {
  hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85',
  beach: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=900&q=80',
  linen: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=80',
  travel: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80',
  about: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
};

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getProducts().then(products => setFeatured(products.filter(product => product.featured).slice(0, 4)));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background">
      <HeroSection heroImage={images.hero} />
      <CategoriesSection images={images} />
      <DarkPremiumSection />
      <FeaturedProducts products={featured} />
      <BrandSection image={images.about} />
    </div>
  );
}
