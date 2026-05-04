import React from 'react';
import MenuCard from './MenuCard';
import { useLanguage } from '../contexts/LanguageContext';

const FeaturedMenu = ({ onOrderNow }) => {
  const { t } = useLanguage();
  const menuItems = [
    {
      title: t('food_bilao'),
      details: t('food_bilao_desc'),
      imageSrc: "https://scontent.fmnl14-1.fna.fbcdn.net/v/t39.30808-6/667681651_34846453068303301_786827027501367100_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFd2zVGs1OZSfEgHUkb0QQrcShOQ_SJcIZxKE5D9Ilwhk0i5eaDwya8A6xqjPjgvmS7QpNUxdm9S7a8TWVlb3KW&_nc_ohc=e6ldTO_A3oUQ7kNvwEmZKmL&_nc_oc=Adq1Oafh-mmNjKxEgj9gcViN2nzNACQFb2_QefuZNy3yIPaZXprrI2aQjbFPRw3dkR4&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=st5mxzvS95kX3D4Kx_vlsA&_nc_ss=7b2a8&oh=00_Af0HsylmKV9eHj1hA7kiRCLdhgPK_OAnuPainVknC_xP6Q&oe=69EF9259",
      price: 599.00,
      inclusion: "Any gatherings for this Holy Week? You might want to try our Food Bilao.\n\nGood for 4-5 Persons\nIncludes assorted Korean Bbq meats, Japchae, Rice, and side dishes."
    },
    {
      title: t('hero_subtitle'),
      subtitle: t('hero_title'),
      imageSrc: "https://scontent.fmnl14-1.fna.fbcdn.net/v/t39.30808-6/670828338_34942482295367044_5615715018383213135_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGaYDDBKw9CdTHhN9qw5wjdYYvwGP56yKdhi_AY_nrIpy4xdsir7hw5Hg9BYasVcbdHonKDuETA6ajAVZWQaP76&_nc_ohc=MxgmlObhQQ4Q7kNvwENccQ8&_nc_oc=AdqjxyuvJ75eO7Ni7CezLY3K2C0eTvVVjq33MegJ0MXHvNplFNesL1y6r3NKcD626fs&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=lvbOEKCqb9dpJr6K4HSMbg&_nc_ss=7b2a8&oh=00_Af0H1M8EIOIKeyQH0NW1LLP89cbHhTvn4vDTbfWvzVxHAQ&oe=69EF8025",
      price: 65.00,
      inclusion: "Your all time favorite Kimchi\n\nAuthentic, traditionally fermented Korean Kimchi. Perfect as a side dish or for cooking."
    },
    {
      title: t('hotpot'),
      subtitle: t('hotpot_desc'),
      details: t('rabokki'),
      price: "399.00",
      imageSrc: "https://scontent-mnl3-1.xx.fbcdn.net/v/t39.30808-6/647066600_34169568915991723_4962407058866573785_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHsjza2mF2n_bEloQCVfpoLJtR_7R-XtXkm1H_tH5e1eZvY0Tr8D04Os_7qs5z4W8RxcRE-tt3gbrCuTnayHdSb&_nc_ohc=BkO-XC8G4Y0Q7kNvwF16xWd&_nc_oc=AdqCb--F6WbO3vfpMzuIqQcBCty-UNQlXKfcZoKkh57IFBHZB3EIoNdLbrxnMnSuYrI&_nc_zt=23&_nc_ht=scontent-mnl3-1.xx&_nc_gid=Fl7kaAQTOX6Uc61tl7uS9A&_nc_ss=7b2a8&oh=00_Af0dMqW73TVIg2aYVKRpd1254k51vMy-YzwtjMBBsVLRyg&oe=69EFA031",
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

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {menuItems.map((item, index) => (
            <MenuCard
              key={index}
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
          ))}
        </div>
      </div>
      {/* Bottom blue border spacer like in image */}
      <div className="h-1 mt-12 w-full"></div>
    </div>
  );
};

export default FeaturedMenu;
