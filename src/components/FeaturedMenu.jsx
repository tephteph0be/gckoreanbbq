import React from 'react';
import MenuCard from './MenuCard';
import { useLanguage } from '../contexts/LanguageContext';

const FeaturedMenu = ({ onOrderNow }) => {
  const { t } = useLanguage();
  const menuItems = [
    {
      title: t('food_bilao'),
      details: t('food_bilao_desc'),
      imageSrc: "/food-bilao.jpg.jpg",
      price: 599.00,
      inclusion: "Any gatherings for this Holy Week? You might want to try our Food Bilao.\n\nGood for 4-5 Persons\nIncludes assorted Korean Bbq meats, Japchae, Rice, and side dishes."
    },
    {
      title: t('hero_subtitle'),
      subtitle: t('hero_title'),
      imageSrc: "/kimchi-product.jpg.jpg",
      price: 65.00,
      inclusion: "Your all time favorite Kimchi\n\nAuthentic, traditionally fermented Korean Kimchi. Perfect as a side dish or for cooking."
    },
    {
      title: t('hotpot'),
      subtitle: t('hotpot_desc'),
      details: t('rabokki'),
      price: "399.00",
      imageSrc: "/hotpot-ramen.jpg.jpg",
      inclusion: "Hotpot Set C (for 3 Person) RABOKKI\n\nA delicious and spicy combination of Ramen and Tteokbokki (Korean Rice Cakes) in our signature hotpot broth."
    },
    {
      title: "",
      isRice: true,
      imageSrc: "rice-cup.png",
      price: null,
      inclusion: "LAST DAY OF OUR UNLIMITED RICE TODAY!!!\n\nEnjoy unlimited rice with any of your Korean Bbq sets!"
    }
  ];

  return (
    <div className="bg-[#680000] w-full pt-4 pb-12 ">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-4 text-white">
          <h2 className="text-xl font-bold font-sans tracking-wide">{t('featured_menu')}</h2>
          <a href="#" className="text-sm font-bold hover:underline cursor-pointer tracking-wide">{t('view_all')}</a>
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-2 touch-pan-x">
          {menuItems.map((item, index) => (
            <div key={index} className="shrink-0 w-[220px] sm:w-[260px]">
            <MenuCard
              title={item.title}
              subtitle={item.subtitle}
              details={item.details}
              price={item.price}
              isRice={item.isRice}
              imageSrc={item.imageSrc}
              onOrderNow={() => {
                onOrderNow && onOrderNow({
                  title: item.title || (item.isRice ? 'Unlimited Rice Promo' : 'Featured Item'),
                  price: item.price ? item.price.toString() : "50.00",
                  img: item.imageSrc,
                  inclusion: item.inclusion
                });
              }}
            />
            </div>
          ))}
        </div>
      </div>
      {/* Bottom blue border spacer like in image */}
      <div className="h-1 mt-12 w-full"></div>
    </div>
  );
};

export default FeaturedMenu;
