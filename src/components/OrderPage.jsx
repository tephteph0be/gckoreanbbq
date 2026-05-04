import React, { useState, useRef, useEffect, useMemo } from 'react';
import ProfileDropdown from './ProfileDropdown';
import CartDropdown from './CartDropdown';
import { useLanguage } from '../contexts/LanguageContext';
import CorporateInformation from './CorporateInformation';

const categories = [
  { name: 'Samgyupsal', img: 'https://scontent-mnl3-1.xx.fbcdn.net/v/t39.30808-6/657045563_34582374691377808_7091976206452944560_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFZB4YkjRG3GiNxGiiJAOqzGpul3Wet1fQam6XdZ63V9EsC3De4NzxHVA-zPSCm5HNEaFhfsBAsCvRSuJ2a5WJL&_nc_ohc=uT4Np85z9KcQ7kNvwHOwF5J&_nc_oc=Adoa0qBqbHOl95bF7WrRczjanbuHA-zn4PD-1uv_rT5l_IlHKF47KbGvR32ByUVOdeU&_nc_zt=23&_nc_ht=scontent-mnl3-1.xx&_nc_gid=bubI4oZYBzs1PltOMmQwng&_nc_ss=7b2a8&oh=00_Af0l5n99-Y3yboQZ4tyVzE0r2orldBsa_GBiz_mqFGJNCQ&oe=69EF8E54' },
  { name: 'Hotpot', img: 'https://i.redd.it/samgyup-or-hotpot-v0-tvjk75zo1ghg1.jpg?width=2101&format=pjpg&auto=webp&s=11693d514d2a63c91d748066718b56350c6686ab' },
  { name: 'GC Short Order', img: '/short-order.png' },
  { name: 'Samgyup On The Go!', img: '/samgyup-on-the-go.png' },
  { name: 'BBQ Meals', img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=300' },
  { name: 'GC Dessert', img: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=300' }
];

const samgyupsalItems = [
  {
    title: 'Set 1 ( for 2 Person)',
    price: '399.00',
    img: 'https://scontent.fmnl14-1.fna.fbcdn.net/v/t39.30808-6/643602166_34077204388561510_4311205135461664176_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFmz4FuOA0vPpVDQm2L8wAzMqstxRj24VMyqy3FGPbhUzNe70VXW1BNfBYBTq7O1lmVSBrhDaqFRmXnK0gGht-l&_nc_ohc=gvD8l75w3XEQ7kNvwFvd96T&_nc_oc=Adpijq5_1I_jDnF91zSBqH0c26Px_DyHmwGSnw-rZYy1JnmrDKlRetEFQMxcMNtsX_o&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=yD7EmFZLajFfvYkr4HJ0tQ&oh=00_Af2LaWiD7Sgsaw09v8tAdBtnYcYnHm0R6FbbiSBjGoImVw&oe=69EF8E79',
    inclusion: 'UNLI Rice (For 2 Person)\n1 Platter Lettuce\n3 Kinds of Side Dish (Kimchi, Potato, Cucumber)\n3 Flavored Pork Meat (200 grams)\n3 Kinds of Sauce Mayo, Chili Oil, Teriyaki)'
  },
  {
    title: 'Set 2 ( for 3 Person )',
    price: '499.00',
    img: 'https://scontent.fmnl14-1.fna.fbcdn.net/v/t39.30808-6/646131618_34080492864899329_3977992541851668453_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEZTFbD5KLZrOb6DgmzUCw_S-wDDKRs6eJL7AMMpGzp4mmtEd60QlMqY84rHmRaJVL-rUgfY9Y3-NxLGLNc55Mj&_nc_ohc=vpAnGLwYBIUQ7kNvwH0W8Jy&_nc_oc=Adp0uZlv2GsvMcF8H6qOAW3Ai8Q7VCOUtEmXSPT5SEl9gmk4vjFMwnAYCRt6yHhxfL0&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=SNifJ7NDHCJrYj91Iq2s1A&oh=00_Af1g8ftDlW_9jLCE2xI-iOZk8thras-OdpTnW8ubP_8U0Q&oe=69EFA13F',
    inclusion: 'UNLI Rice (For 3 Person)\n1 Platter Lettuce\n4 Kinds of Side Dish: (Kimchi, Potato, Cucumber, Salad Lettuce)\n3 Flavored Pork Meat (300 grams)\n4 Kinds of Sauce\nMayo, Chili Oil, Teriyaki, Samjang)'
  },
  {
    title: 'Set 3 ( for 4-6 Person)',
    price: '899.00',
    img: 'https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/643446703_34085167147765234_1599485213386011366_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeH6xt5H90_UVzApOyNZAcqsll4VDcBDJA-WXhUNwEMkD8ACZDBmmFQ-4glzswVtf_crMkLaHt1TfUIkuRzuc3KY&_nc_ohc=Bf_0aFhpTZYQ7kNvwH7MapH&_nc_oc=Ado7blV3wlDv4FzqcLh0wti4c5y00VbR7jY1mqV0eLyAUeysQV-fr_Ys3Ne8Q_KzPp8&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=mDgTy2XhrMEOh6CsVUJ30g&oh=00_Af3GVKPmoxAiC6vzghL_h47keqqsoypnWErxKKtO5EHmcw&oe=69EF9489',
    inclusion: 'UNLI Rice (For 4-6 Person)\n2 Platter Lettuce\n5 Kinds of Side Dish: (Kimchi, Potato, Cucumber, Salad Lettuce, Egg Omelette)\n3 Flavored Pork Meat (600 grams)\n5 Kinds of Sauce:\nMayo, Chili Oil, Teriyaki, Samjang, Gochujang'
  }
];

const hotpotItems = [
  {
    title: 'Set A (for 3 Person)',
    price: '499.00',
    img: 'https://preview.redd.it/hotpot-or-samgyup-v0-776fqdvkhsxf1.jpg?width=1080&crop=smart&auto=webp&s=51e0128a7e45f1ba735c92b9f2fe083e9c06b5cd',
    inclusion: 'Choice of Soup Base (Spicy/Plain)\nAssorted Vegetables\n150g Beef & 150g Pork\nNoodles, Tofu & Fishballs'
  },
  {
    title: 'Set B ( for 6 Person )',
    price: '999.00',
    img: 'https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/481086361_919769053652627_1423468949603078785_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFJFGGk20c1ZRZKwPlV1o7XZxOAeku1NL1nE4B6S7U0vUZEYD9pE_mo0PGJN5KvYSNGRvFg0a48x6sjiXP92FPr&_nc_ohc=XAxY_lVfg_cQ7kNvwENiM_V&_nc_oc=Adq59_rBzTksy1DxZDWOQCPBcGI6i0Wlsxg8lPJnjd8K4hh1kRSaxq1NP3nsJCgpddY&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=6pqje2mIHWvxBniN0gI5kQ&oh=00_Af1pURzQb9n8NsP45BfbsUrRPGRrUno93QPRT_qq8YBfCQ&oe=69EFA43D',
    inclusion: '2 Choice of Soup Base\nLarge Platter Assorted Vegetables\n300g Beef, 300g Pork & 300g Chicken\nDouble Portion Noodles & Seafood Balls'
  },
  {
    title: 'Set C (for 3 Person)\nRABOKKI',
    price: '399.00',
    img: 'https://i.redd.it/samgyup-or-hotpot-v0-tvjk75zo1ghg1.jpg?width=2101&format=pjpg&auto=webp&s=11693d514d2a63c91d748066718b56350c6686ab',
    inclusion: 'Spicy Rabokki Sauce\nKorean Rice Cakes (Tteok)\nRamen Noodles\nFish Cakes & Boiled Egg'
  }
];

const shortOrderItems = [
  {
    title: 'Special Pancit Canton',
    price: '189.00',
    img: 'https://scontent-mnl1-2.xx.fbcdn.net/v/t1.15752-9/671304930_822847680864976_6655278309001088906_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeG62AU6KzOMjGo3FL532d4hGddBiPgoGX4Z10GI-CgZfuoDnyDhAurJxtiuYCAiDnL8DBxL_ezmf4PbdEH_Z0Na&_nc_ohc=chH7PL-tf0QQ7kNvwGotYgI&_nc_oc=AdoRda1clOykRxJwOaOeiNjU8D0lXBZAtJnUFdPQLfYm2f0zLd1edtCIAia3o36Yb58&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&oh=03_Q7cD5AFoVb56zwv3e_NEVYMdBtb1WFqRWa9IDiGWku7SEfsyKg&oe=6A113901',
    inclusion: 'Stir-fried Noodles\nFresh Vegetables (Carrots, Cabbage)\nPork & Shrimp Toppings\nSpecial Savory Sauce'
  },
  {
    title: 'Korean Fried Chicken',
    price: '189.00',
    img: 'https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/648031204_34162951593320122_1183525301279392773_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFhaYyodv4ZKI06CSpb_vLVl9P_FX-Ny5KX0_8Vf43Lklltll70fbwLIiET-WsT0-tWkcQXQfQgu22OqbBD4JSI&_nc_ohc=zI8Qt-MKDagQ7kNvwH7tmTM&_nc_oc=AdpNWulM-HSS4p1wbg_-9run0T22WFoT_-6pKFu4myHyCg6WXvBDR7DUni_7EWo6X5g&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=d3oger-I6HGbZ5JW43QqJQ&oh=00_Af0FaQSA4i2OhWXhVwT-teiBZgvrVzoTcFvuwmVcDeyaLQ&oe=69EF9387',
    inclusion: '6 Pieces Crispy Chicken\nChoice of Sauce (Soy Garlic/Spicy)\nPickled Radish Side\n1 Cup Steamed Rice'
  },
  {
    title: 'Pork Sisig',
    price: '189.00',
    img: 'https://scontent.fmnl14-1.fna.fbcdn.net/v/t39.30808-6/645245396_34114965731452042_7459055085563966568_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGjv7x0OHu9o6drfPI38-a_oloo7IQOJu-iWijshA4m7y-VassLYNe0oirKAzsUJ7kYVouHs7tzJ5DZrUQt29P4&_nc_ohc=7EN033YZAn4Q7kNvwESVBHc&_nc_oc=AdqLPwRLbXAtNq0us3EDPL5mLkXvyqcNksqXF9FUss3Qn2IFstRdbNSdrbfEWuOZYdA&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=qig8NNggb-VuNSZ6hw22Pw&oh=00_Af1xjjd0qDBtCmDbSzRqaAJpyWewxVowhUBTDJNNmtO3PQ&oe=69EF93FA',
    inclusion: 'Chopped Crispy Pork Face\nOnions & Chili Peppers\nSpecial Sisig Sauce\nTopped with Raw Egg'
  },
  { title: 'Four Season', price: '189.00', img: 'https://s3-media0.fl.yelpcdn.com/bphoto/xKgWP5ESPu9r8ehuzZsNNQ/258s.jpg' },
  { title: 'Sotanghon', price: '189.00', img: 'https://www.thelittleepicurean.com/wp-content/uploads/2018/10/chicken-sotanghon-soup-6-500x500.jpg' },
  { title: 'Calamares', price: '189.00', img: 'https://images.deliveryhero.io/image/foodpanda/recipes/calamares-recipe-1.jpg' },
  { title: 'Fried Samgyup', price: '189.00', img: 'https://thefatbutcherph.com/cdn/shop/articles/ChatGPT_Image_Sep_27_2025_09_33_12_AM.png?v=1758937018' },
  { title: 'Tempura', price: '189.00', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ8IEKp5_W_UHD2rkZ4zIDF4i3ciyuuACung&s' },
  { title: 'Pork Cutlet', price: '189.00', img: 'https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/642867547_34110202331928382_2441501675423362676_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEtt6brhz9psaJlI543rREJqNQMOdq_g-qo1Aw52r-D6oE5V6QxOJjTqPPMhUFnB7u16aGbXcw7AgxL5TsVtuGD&_nc_ohc=eXKV_IaXy4MQ7kNvwGQ4EV_&_nc_oc=Adog6UzAifqhTOGPqlaFUaKbafAnUFLSf8AUL9V4FTPNCf_1MHKqQayCsC0ul_LOPQo&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=NYfOi7nTb8s_7E_OdM97xA&oh=00_Af3pH0KbLX6F6OxZnKypUc1c03eiJ5x1z51rCTXcBZoXkA&oe=69EF95FD' }
];

const dessertItems = [
  { title: 'Mango Float', price: '100.00', img: 'https://zhangcatherine.com/wp-content/uploads/2022/11/12001200-6.jpg' },
  { title: 'Leche Flan', price: '60.00', img: 'https://i.redd.it/leche-flan-with-or-without-macapuno-v0-k54r147ky1zd1.jpg?width=3024&format=pjpg&auto=webp&s=07a0b99f8f3c4b3c3177582cfda165a6c53e2abd' },
  { title: 'Mango Shake', price: '75.00', img: 'https://png.pngtree.com/png-clipart/20250226/original/pngtree-mango-shake-isolated-on-white-background-png-image_20515520.png' }
];

const onTheGoItems = [
  {
    title: 'Pork SamgyupSML',
    priceRange: '79.00 - 159.00',
    badge: 'P1',
    img: 'https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/649111082_34237033812578566_2225647303843140808_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEoxn_TcKDgvnzpjLfV4OuPZJlDWbIBSRJkmUNZsgFJEu07V0SMVTqzDlGtosag5u-Oh-JOc08-swUkFmrln99k&_nc_ohc=yeAhG2whfzAQ7kNvwHpbLIx&_nc_oc=AdqQvK2VN8PBmS1uZPu8xHoeS9ax_ZjeJfwQlVQOehDOIkWSPk1AKyehoHdZ5OcD7uA&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=B52We7Q1ZpD1TZJByVzNMQ&oh=00_Af1EOsZNa7cPocZo8pD0rY1goZS_FCd0avYNJHHjsMkS9g&oe=69EFBC9B'
  },
  {
    title: 'Beef SamgyupSML',
    priceRange: '89.00 - 189.00',
    badge: 'B2',
    img: 'https://scontent.fmnl14-1.fna.fbcdn.net/v/t39.30808-6/646495870_34142298428718772_1978370629544380195_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFfxfzIr3cpL-_eXbZZyACxpJojuZ2Ljn6kmiO5nYuOfpYd73h7NHSuw4Mz7M25-_q97Wu3FELusWGrepNkgc_7&_nc_ohc=jcf9Iev3Qs4Q7kNvwEZVpN2&_nc_oc=AdqKriHmgg7cgo6iS3TleKzyJ-CtDOF5cgavu_TJFQphfF64sjR9-ogxZUqe5xI2g0I&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=y7RLMLy4K6PDO-EwiMH19w&oh=00_Af2TURR7cc723F2mSim9t_mfbn0Az2lCcmN3YhQCeJyJXg&oe=69EFC4AF'
  },
  {
    title: 'Chicken SamgyupSML',
    priceRange: '69.00 - 119.00',
    badge: 'C3',
    img: 'https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/649253050_34237033029245311_8341555241762855587_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHGneNF816FnHBbCa3HKjypNNqBmtcuocU02oGa1y6hxYw8lcvY3pjpukil88G0LlTeHpe-J16xLpv9dz02LLnL&_nc_ohc=k7GSTsoSewgQ7kNvwFbzGF4&_nc_oc=AdrQfL2TBOLJitxLOB3AyNh3969iz9Y6U5EnH0UoiJ6_QObnGhCeqFK8x8mU7q9-UcQ&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=lz8Qi7lnB1ORSTwVp9syqQ&oh=00_Af0YQYZbvM0fxhBtLyRLLl5RJi3lomVLLEXTCwsDbRF2gQ&oe=69EF9038'
  }
];

const bbqMealsItems = [
  { title: 'Pork Cutlet', price: '99.00', img: 'https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/642867547_34110202331928382_2441501675423362676_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEtt6brhz9psaJlI543rREJqNQMOdq_g-qo1Aw52r-D6oE5V6QxOJjTqPPMhUFnB7u16aGbXcw7AgxL5TsVtuGD&_nc_ohc=eXKV_IaXy4MQ7kNvwGQ4EV_&_nc_oc=Adog6UzAifqhTOGPqlaFUaKbafAnUFLSf8AUL9V4FTPNCf_1MHKqQayCsC0ul_LOPQo&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=NYfOi7nTb8s_7E_OdM97xA&oh=00_Af3pH0KbLX6F6OxZnKypUc1c03eiJ5x1z51rCTXcBZoXkA&oe=69EF95FD' },
  { title: 'Chicken Inasal', price: '99.00', img: 'https://scontent.fmnl14-1.fna.fbcdn.net/v/t39.30808-6/646375564_34110202365261712_7514235159954401120_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeG2nyZIhfgaPpvnuER2EqDLGXN4XANu0D8Zc3hcA27QP7cdF80cm4IiOwuIQq8a4JFcB5mK0IIcafLbtMbY-LcI&_nc_ohc=5fBiEO5s74gQ7kNvwHVLqPB&_nc_oc=Adr1StVxL-p7mQfvClhFc79J7cc1FgfUZ6TRwBgXUQw3hBKfKvVaC-rOBTnEa5-efCc&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=cfEn9Vq3lkNfnAPp18tIWA&oh=00_Af3LlpQXG6ljcgJfhvtjZgWkaLdaAaFgSuQkHcSuo-RwIQ&oe=69EFC915' },
  { title: 'Spicy Bulgogi', price: '149.00', img: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/10/14/DV3413__spicy-bork-bulgogi_s4x3.jpg.rend.hgtvcom.616.462.suffix/1634235905928.webp' },
  { title: 'Dark Bulgogi', price: '149.00', img: 'https://mykoreankitchen.com/wp-content/uploads/2016/08/1.-Spicy-Pork-Bulgogi-Rice-Bowl-500x500.jpg' },
  { title: 'Mixed Seafoods', price: '149.00', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStbJKZ6R1v3VJepf1CzeecCBRaP75RTv2aug&s' },
  { title: 'Tempura', price: '149.00', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ8IEKp5_W_UHD2rkZ4zIDF4i3ciyuuACung&s' }
];

const samgyupsalAddOns = [
  { name: '1 Cup Rice', price: '₱ 20', img: 'rice-cup.png' },
  { name: 'Kimchi', price: '₱ 30', img: 'https://delishglobe.com/wp-content/uploads/2024/12/Kimchi-Fermented-Vegetables.png' },
  { name: '150 Gram Beef', price: '₱ 150', img: 'https://scontent.fmnl14-1.fna.fbcdn.net/v/t39.30808-6/646495870_34142298428718772_1978370629544380195_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFfxfzIr3cpL-_eXbZZyACxpJojuZ2Ljn6kmiO5nYuOfpYd73h7NHSuw4Mz7M25-_q97Wu3FELusWGrepNkgc_7&_nc_ohc=jcf9Iev3Qs4Q7kNvwEZVpN2&_nc_oc=AdqKriHmgg7cgo6iS3TleKzyJ-CtDOF5cgavu_TJFQphfF64sjR9-ogxZUqe5xI2g0I&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=y7RLMLy4K6PDO-EwiMH19w&oh=00_Af2TURR7cc723F2mSim9t_mfbn0Az2lCcmN3YhQCeJyJXg&oe=69EFC4AF' },
  { name: 'Cheese Sauce', price: '₱ 35', img: 'cheese-sauce.png' },
  { name: '150 Gram Pork', price: '₱ 150', img: 'https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/649111082_34237033812578566_2225647303843140808_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEoxn_TcKDgvnzpjLfV4OuPZJlDWbIBSRJkmUNZsgFJEu07V0SMVTqzDlGtosag5u-Oh-JOc08-swUkFmrln99k&_nc_ohc=yeAhG2whfzAQ7kNvwHpbLIx&_nc_oc=AdqQvK2VN8PBmS1uZPu8xHoeS9ax_ZjeJfwQlVQOehDOIkWSPk1AKyehoHdZ5OcD7uA&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=B52We7Q1ZpD1TZJByVzNMQ&oh=00_Af1EOsZNa7cPocZo8pD0rY1goZS_FCd0avYNJHHjsMkS9g&oe=69EFBC9B' },
  { name: '150 Gram Chicken', price: '₱ 120', img: 'https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/649253050_34237033029245311_8341555241762855587_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHGneNF816FnHBbCa3HKjypNNqBmtcuocU02oGa1y6hxYw8lcvY3pjpukil88G0LlTeHpe-J16xLpv9dz02LLnL&_nc_ohc=k7GSTsoSewgQ7kNvwFbzGF4&_nc_oc=AdrQfL2TBOLJitxLOB3AyNh3969iz9Y6U5EnH0UoiJ6_QObnGhCeqFK8x8mU7q9-UcQ&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=lz8Qi7lnB1ORSTwVp9syqQ&oh=00_Af0YQYZbvM0fxhBtLyRLLl5RJi3lomVLLEXTCwsDbRF2gQ&oe=69EF9038' }
];

const hotpotAddOns = [
  { name: 'Rice Cake', price: '₱ 20', img: 'https://www.health.com/thmb/Bm0ZBIz05qrweDGJZchL6VJLUBc=/7360x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-GettyImages-588615904-cee2aff9acda4771aec9365b8a2f1655.jpg' },
  { name: 'Chicken', price: '₱ 150', img: 'https://www.koreanbapsang.com/wp-content/uploads/2012/03/DSC_1825-e1562126941436.jpg' },
  { name: 'Plain Meat', price: '₱ 150', img: 'https://thefatbutcherph.com/cdn/shop/articles/4_2024-11-04_00-01-06_square.jpg?v=1755485062' },
  { name: 'Shrimp', price: '₱ 150', img: 'https://www.skinnytaste.com/wp-content/uploads/2025/02/Pan-Seared-Shrimp-7-500x500.jpg' },
  { name: 'Hotdog', price: '₱ 25', img: 'https://pampangasbest.store/cdn/shop/products/Boom-boom-slim-250g-2.jpg?v=1754548688' },
  { name: 'Egg', price: '₱ 20', img: 'https://i.ytimg.com/vi/NVriw_UBdTA/maxresdefault.jpg' }
];

const highlightPhotos = [
  "https://scontent.fcgy3-1.fna.fbcdn.net/v/t39.30808-6/650817658_34322237094058237_5337376460600950014_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHUN-YABDcNh7yLTEjQnCOC5wd7yDdh-KvnB3vIN2H4qxQwehDq46qiTPPRcrDYjOa_vFGMJ1ZtHOeROTS5Kdbl&_nc_ohc=WsLrhOG0MtwQ7kNvwFHwZhi&_nc_oc=AdpEkBN_s6PCCgcXEku4EoyDYj9fFAZidq5wl12GJudonnqxoQRTkQfDOEDtJKVAuUw&_nc_zt=23&_nc_ht=scontent.fcgy3-1.fna&_nc_gid=AduGlQKVe--77jKQjgb_dw&_nc_ss=7b2a8&oh=00_Af3zTfk2wAM--Z49cUOe4sk56o-bc5gGCPHzpQY13TKhOw&oe=69F2D885",
  "https://scontent.fcgy3-2.fna.fbcdn.net/v/t39.30808-6/652266913_34322209614060985_769728902360643821_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGrKT--sqfWgtMQIthVinKgENk5Yd1hNQIQ2Tlh3WE1An0txkqlB9L1U8jVkM8PCOp6wHF98TFG6iRywxhDJ-fN&_nc_ohc=nK4J249vPs0Q7kNvwFOPtbS&_nc_oc=AdqsQqsNPMUmL0WKcV2y1ckPvcJq-grTNTkxfkBSukncoTQ67Py_c8mZVcbjOxQRIlw&_nc_zt=23&_nc_ht=scontent.fcgy3-2.fna&_nc_gid=Q8-4zPiHi4m7N1dYaj8VpQ&_nc_ss=7b2a8&oh=00_Af33Yd88c8_NfJhxe1BgS4XeTUg3gSWpTH9uDVP5VQahYA&oe=69F2C64D",
  "https://scontent.fcgy3-2.fna.fbcdn.net/v/t39.30808-6/652318368_34322231264058820_2835216337116650551_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFVpwMUiasIZ2D_8KhmWSKeA78aOMKhi64Dvxo4wqGLrlCHNZgXnmb1UpVq0qwoVQSUbNTqTGrMf_gevoopmlqU&_nc_ohc=YMbCuEnLgYwQ7kNvwF7KOLr&_nc_oc=Adq-gLQue1vTWG9A-riiHK4skaGjR2JcYEwIlBfDsJzcMbtvwkHskTBi_D_rJoaAAqE&_nc_zt=23&_nc_ht=scontent.fcgy3-2.fna&_nc_gid=LD7TIKpMjNrqLn-__OEbLA&_nc_ss=7b2a8&oh=00_Af2yKyNCvwvY40V2dUX1ej0OHxfcmXEVKwhjPbpeSCtzig&oe=69F2DD1B",
  "https://scontent.fcgy3-2.fna.fbcdn.net/v/t39.30808-6/650335507_34308448378770442_5796916546382933302_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGI34IE__sF2Ku8FJj8jAiVw7CKF69AEuzDsIoXr0AS7HWRUjdPdofFdoWjd-4313VyDhflxA-eVtYTXtRaYRe4&_nc_ohc=7_ROQSrgjEcQ7kNvwHL_5Rb&_nc_oc=Adqei8YjPjc1U4q0PpiOwGn1x05JGqkVdu-6aJ_3FPcugnpKpdUTejYMoc_mKtz8HR8&_nc_zt=23&_nc_ht=scontent.fcgy3-2.fna&_nc_gid=dWnrdIYTtHup5G1gQ2nNaw&_nc_ss=7a2a8&oh=00_Af3zEFy700W23Ahz5wwseBXPH0F7pshJquVPK59vx7nA8g&oe=69F2CA9E",
  "https://scontent.fcgy3-1.fna.fbcdn.net/v/t39.30808-6/650445682_34308457455436201_5228763913022343794_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFwV-5en9CGreCWHU2q5Y8iV1OJR5CWE1tXU4lHkJYTW356APzOKGxEd8GRX7Qxfia4JX3SuVzSwDvI39fzyiB5&_nc_ohc=El-yePaDZG4Q7kNvwHUrhSn&_nc_oc=AdpNMEoVs5N_ykorH_jk_HQzgvQJrpc4101r90b6s1OdeSx3OEG1bhXWHZsk5hSERMM&_nc_zt=23&_nc_ht=scontent.fcgy3-1.fna&_nc_gid=VwEMBzhEXv0Cjo3mOR6mLw&_nc_ss=7a2a8&oh=00_Af3W9jyc1kSQeIeo8dnYGnjJjH4c4ZFRfMKmYnQ2efAAhg&oe=69F2E043",
  "https://scontent.fcgy3-1.fna.fbcdn.net/v/t39.30808-6/652127010_34308516492096964_4084992464561060253_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeH3FoS7-VGAfXV9SfGJv8i_GigbDMjKbawaKBsMyMptrNz11vd1E4_a9OTLkMKxjFZD36b5COIHXNqMSzMPQ6Kr&_nc_ohc=4D2FwSYBa7sQ7kNvwE5A9pM&_nc_oc=AdqixyqV1qblSHNcz__UH4NdaIHlydrOY30w8ZqaIMO20J0d5DwyIJDi3BgEQZZ_7tE&_nc_zt=23&_nc_ht=scontent.fcgy3-1.fna&_nc_gid=Z9e2xHVyTlIs-Umn1yPoDg&_nc_ss=7b2a8&oh=00_Af1G3PoxhP5oaEuexI6n0agfQqh4-z8M26aEKLqFZ7yCIQ&oe=69F2C701",
  "https://scontent.fcgy3-1.fna.fbcdn.net/v/t39.30808-6/649722197_34234369466178334_5467866633620509960_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHtnAxLbleRB9T-emtrmahxoYRadlI6C62hhFp2UjoLrc5B1VAUtY7beAdHsCO7UMXt1qC6uCGgqpR4GzC41gbg&_nc_ohc=RcOk6DanmFEQ7kNvwGEkTBX&_nc_oc=AdqcsiJ_hGHUU0GrMxeUZQvAWVBPf1wBb_oP610mAaTskW9X7hMto8YcwxrGIDVSO8o&_nc_zt=23&_nc_ht=scontent.fcgy3-1.fna&_nc_gid=4WUMhO8AncR5rYJUsW1Ynw&_nc_ss=7b2a8&oh=00_Af1HD8f3eBGrJ9DFKXfHW8hmFtkWHj7gWRJYrrvIkPhjLg&oe=69F2C95B",
  "https://scontent.fcgy3-1.fna.fbcdn.net/v/t39.30808-6/649255210_34234300629518551_2421062688689202700_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHKtDC4voWXn3Be8ItUgC-AWumrZcbJfRVa6atlxsl9FQE0Lq8rb1L3MwqrbFN7pNHOHxBYtEOChsGJzqPPS9kd&_nc_ohc=oqiqE--3UzcQ7kNvwHjKKlP&_nc_oc=Adr_3FXJLV2w0D37xwvZLKxljmaTha508gtjNLWd1ME7YS-keFF_mc_RkCSc40TOBn0&_nc_zt=23&_nc_ht=scontent.fcgy3-1.fna&_nc_gid=m2DqktDavuUQ8l9tYv-3JA&_nc_ss=7b2a8&oh=00_Af1ITSt-K5tXUkCZoW_1GkYFU0OCsS0Veb_zERvcmAzzVQ&oe=69F2D16C",
  "https://scontent.fcgy3-2.fna.fbcdn.net/v/t39.30808-6/653799456_34380404514908161_9057326021557159907_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeER2OPEs38Jl2Rq7pYCdo8BeJ1ncXx59OV4nWdxfHn05cDjTfzamxZniR1KZWTxlPYQD9DLkDohIRsXO3BF9LXx&_nc_ohc=eIRiHnMeJPIQ7kNvwGW5t8B&_nc_oc=AdqftgXzEDDvNy4Wxc8_GEKaq6dtk1fxi_fOJkj2T6G3NtrHl7UWjOWpM1Phq-uhFFQ&_nc_zt=23&_nc_ht=scontent.fcgy3-2.fna&_nc_gid=pKryJ6pLScj26C3faJ8SGg&_nc_ss=7b2a8&oh=00_Af0qAglD6d6-qJvd4tKv3PzFJUXvna0lF75kjeLIMUBz9Q&oe=69F353E3",
  "https://scontent.fcgy3-1.fna.fbcdn.net/v/t39.30808-6/649621430_34234351222846825_9050375254130888863_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeH2nLjiqokH2lX7yCff_gL6m-vBD4-Sul2b68EPj5K6XTAJsDY86lIkrzBZSy1krMm19d5S07VEbziotGuVOJnu&_nc_ohc=1y-aBSEBXlEQ7kNvwH2XrCU&_nc_oc=AdpKKbgMofqn6c6-pfUIho6jkQ0KCNy1HHZCar51pI_S4Kmk5j-guEsx4mQYtdtDEeU&_nc_zt=23&_nc_ht=scontent.fcgy3-1.fna&_nc_gid=pTFjisd92i6LdbktISEbwQ&_nc_ss=7b2a8&oh=00_Af1yWfxD2yMYk1JHkeoF1Pbcx_a5IwkQUE5pcjtGp3FS9w&oe=69F2E02B",
  "https://scontent.fcgy3-1.fna.fbcdn.net/v/t39.30808-6/649263350_34234263829522231_5379412505548997207_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHB5jv5PjYtqxssYlLzbd1Fe62L7_14Wbl7rYvv_XhZuZD-pp2opg2-tcnj04QyJ3_LHTNZzE3IcP4SXzrcrZn-&_nc_ohc=JAIwC5NrBuEQ7kNvwFqabK7&_nc_oc=AdpJLi9sTIgSeBfm_36SL2B9KCv5a7_8wkksxq2EYqveCYeJ2x4khe8KzpCS-g9IpGQ&_nc_zt=23&_nc_ht=scontent.fcgy3-1.fna&_nc_gid=MUIxriTu0yF5PjbCJpoOsA&_nc_ss=7b2a8&oh=00_Af2b2NA9vhMMWYmck1JSs8noYjskYVWQ1E5q54_0vH_l0g&oe=69F2F48F",
  "https://scontent.fcgy3-2.fna.fbcdn.net/v/t39.30808-6/649391346_34234225322859415_6896911669178621158_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFOMG6Sqh9YtF6LYJHt4gqt-1_fo1-G3I37X9-jX4bcjdr2RmCPfYW435KR0Tf328uhrIOuttVfXrulWYEOB1np&_nc_ohc=nrto8FtOytIQ7kNvwE7YYbY&_nc_oc=Adr1wWZG0UtpdG7D84OSs3iNVh-cFmCSy1FBc3ctuHP9ab_9hUyz1PhC7czj9lQbjGs&_nc_zt=23&_nc_ht=scontent.fcgy3-2.fna&_nc_gid=6d4lZEWRQ0zjbJheG-Mn3Q&_nc_ss=7b2a8&oh=00_Af03Bf6YoWZMF9eA6-JnqyUKYhxT2Ql3I00kKBxJ1D7wgQ&oe=69F2D198"
];

const Banner = ({ onOrderNow }) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      subtitle: t('hero_subtitle'),
      title: t('hero_title'),
      image: "https://scontent.fcgy3-1.fna.fbcdn.net/v/t39.30808-6/670828338_34942482295367044_5615715018383213135_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGaYDDBKw9CdTHhN9qw5wjdYYvwGP56yKdhi_AY_nrIpy4xdsir7hw5Hg9BYasVcbdHonKDuETA6ajAVZWQaP76&_nc_ohc=h_6nDjguSIgQ7kNvwFTcd4O&_nc_oc=AdrWQ2hGbQtzWKKZBzz1sqphNBjxg-d8GnEu6rgYTitTq6-W_hjP8Fvh-DRvQ8hCrcU&_nc_zt=23&_nc_ht=scontent.fcgy3-1.fna&_nc_gid=O-hBLRo5IFDzn4Wu7Si5FQ&_nc_ss=7b2a8&oh=00_Af5IpxIWXfVcFvbTGJvoyT3dVDR49fbhHLYkDl1N7igfUg&oe=69FA7CA5"
    },
    {
      id: 2,
      subtitle: "FOOD BILAO",
      title: "Any gatherings for this Holy Week? Try our Food Bilao",
      // Using a photo from the highlights that resembles a food bilao/tray
      image: "https://scontent.fmnl14-1.fna.fbcdn.net/v/t39.30808-6/667681651_34846453068303301_786827027501367100_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFd2zVGs1OZSfEgHUkb0QQrcShOQ_SJcIZxKE5D9Ilwhk0i5eaDwya8A6xqjPjgvmS7QpNUxdm9S7a8TWVlb3KW&_nc_ohc=e6ldTO_A3oUQ7kNvwEmZKmL&_nc_oc=Adq1Oafh-mmNjKxEgj9gcViN2nzNACQFb2_QefuZNy3yIPaZXprrI2aQjbFPRw3dkR4&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=st5mxzvS95kX3D4Kx_vlsA&_nc_ss=7b2a8&oh=00_Af0HsylmKV9eHj1hA7kiRCLdhgPK_OAnuPainVknC_xP6Q&oe=69EF9259"
    },
    {
      id: 3,
      subtitle: "SPECIAL OFFER",
      title: "Experience authentic Korean dining at home",
      image: "https://scontent.fcgy3-1.fna.fbcdn.net/v/t39.30808-6/660332315_34725400470408562_7015120891274042744_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeG5kctpW7xTrTlAYNBW3yo6qZyA6sqPPxGpnIDqyo8_ET3w674TXG89v29IFzZc4ImRAi6DbnF9oZw9teCvsEeU&_nc_ohc=Tw1icy7wV4IQ7kNvwF4-PsX&_nc_oc=AdrVOTxFxZCuVNuOWpHYAsV6Vp2v2JBecf-slM_qL6dxAa_Rr3Ac9vwsBRY_BoXsuJo&_nc_zt=23&_nc_ht=scontent.fcgy3-1.fna&_nc_gid=xgKbIToFK5mGA52XqrlVOA&_nc_ss=7b2a8&oh=00_Af5Wrsn_cvkNIdWMqqUopPeMTRdlNOW8F-t9xUSyg1lJfQ&oe=69FAAC2E"
    }
  ];

  // Auto-play effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      onClick={() => onOrderNow && onOrderNow()}
      className="w-full h-[180px] rounded-sm relative mb-8 border border-white/20 shadow-lg shrink-0 overflow-hidden flex items-center justify-between group cursor-pointer bg-[#640a0a]"
    >
      {/* Background with slight pattern/image */}
      <div className="absolute inset-0">
        <img
          key={currentSlide}
          src={slides[currentSlide].image}
          alt="Background"
          className="w-full h-full object-cover opacity-10 mix-blend-overlay animate-fadeIn"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#640a0a] via-[#640a0a]/95 to-[#640a0a]/80"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex items-center justify-between px-10 sm:px-14 h-full w-full">
        {/* Left: Text */}
        <div className="flex flex-col justify-center flex-1 pr-4 max-w-[65%]">
          <span className="font-bold text-[11px] sm:text-[13px] tracking-wide mb-1 text-gray-300 uppercase animate-slideInLeft">{slides[currentSlide].subtitle}</span>
          <h2 className="text-[20px] sm:text-[28px] font-bold leading-tight font-sans tracking-tight text-white animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
            {slides[currentSlide].title}
          </h2>
        </div>

        {/* Right: Image */}
        <div className="w-[130px] sm:w-[220px] h-[130px] sm:h-[150px] rounded-2xl overflow-hidden shadow-2xl shrink-0 animate-fadeIn bg-[#4d0707]">
          <img src={slides[currentSlide].image} alt="Promotion" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/60 transition-colors z-20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/60 transition-colors z-20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
            className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProductGrid = ({ title, items, onProductClick, onSeeAll }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-end mr-4">
        <h3 onClick={() => onSeeAll && onSeeAll()} className="text-[17px] font-bold tracking-wide cursor-pointer hover:text-gray-200 transition-colors">{title}</h3>
        <span onClick={() => onSeeAll && onSeeAll()} className="text-xs font-bold cursor-pointer hover:underline">{t('see_all')}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mr-0 sm:mr-4">
        {items.map((item, idx) => (
          <div key={idx} onClick={() => onProductClick && onProductClick(item)} className="bg-white rounded-2xl p-4 flex flex-col shadow-lg relative object-contain cursor-pointer hover:scale-[1.02] transition-transform duration-200">
            <div className="w-full h-[200px] mb-3 overflow-hidden rounded-xl border border-gray-100 relative">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              {item.badge && <div className="absolute bottom-2 left-2 bg-[#7d1919] text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center border border-white shadow-sm">{item.badge}</div>}
            </div>
            <div className="flex flex-col items-center justify-center flex-1 space-y-1">
              <h4 className="text-black font-semibold text-[15px] text-center px-1 whitespace-pre-line leading-tight">{item.title}</h4>
              {item.price && <div className="text-black font-extrabold text-[15px]">₱ {item.price}</div>}
            </div>
            <div className="flex justify-between items-center mt-3 pt-1 w-full px-1">
              <div className="flex items-center text-[#ff9800] space-x-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                <span className="text-sm font-bold text-gray-500 pb-[1px]">0</span>
              </div>
              <svg className="w-6 h-6 text-[#7d1919] cursor-pointer hover:fill-current" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrderPage = ({ initialProduct, onClearInitialProduct, onMenuClick, onCartClick, activeCategory, setActiveCategory, onLoginClick, onAddToCart, onBuyNow, onRemoveItem, onClearCart, onCheckout, isLoggedIn, onLogout, cartCount = 0, cartItems = [], orderInfo = {}, currentUser = null, onAccountSettingsClick, onOrdersClick, showCartToast, toastProduct }) => {
  const { t } = useLanguage();
  const [isSamgyupAddOnOpen, setIsSamgyupAddOnOpen] = useState(false);
  const [isHotpotAddOnOpen, setIsHotpotAddOnOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (initialProduct) {
      setSelectedProduct(initialProduct);
      setQuantity(1);
      setSelectedAddOns([]);
    }
  }, [initialProduct]);

  // Clear selected product view when navigating via sidebar/categories, 
  // but only if we're not currently handling an initial product.
  useEffect(() => {
    if (activeCategory !== null && !initialProduct) {
      setSelectedProduct(null);
    }
  }, [activeCategory, initialProduct]);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const contentRef = useRef(null);

  const allProducts = useMemo(() => {
    return [
      ...samgyupsalItems.map(i => ({ ...i, category: 'Samgyupsal' })),
      ...hotpotItems.map(i => ({ ...i, category: 'Hotpot' })),
      ...shortOrderItems.map(i => ({ ...i, category: 'GC Short Order' })),
      ...bbqMealsItems.map(i => ({ ...i, category: 'BBQ Meals' })),
      ...dessertItems.map(i => ({ ...i, category: 'GC Dessert' })),
      ...onTheGoItems.map(i => ({ ...i, category: 'Samgyup On The Go!' }))
    ];
  }, []);

  const searchResults = useMemo(() => {
    if (!searchTerm && searchCategory === 'All') return null;

    let results = allProducts;

    if (searchCategory !== 'All') {
      results = results.filter(p => p.category === searchCategory);
    }

    if (searchTerm) {
      const keywords = searchTerm.toLowerCase().split(/\s+/).filter(k => k.length > 0);
      results = results.filter(p =>
        keywords.every(kw =>
          p.title.toLowerCase().includes(kw) ||
          (p.inclusion && p.inclusion.toLowerCase().includes(kw)) ||
          p.category.toLowerCase().includes(kw) ||
          (p.badge && p.badge.toLowerCase().includes(kw)) ||
          (p.price && p.price.toString().includes(kw)) ||
          (p.priceRange && p.priceRange.toString().includes(kw))
        )
      );
    }
    return results;
  }, [searchTerm, searchCategory, allProducts]);

  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
      setSelectedAddOns([]);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeCategory, selectedProduct]);

  const handleCategoryClick = (catName) => {
    setActiveCategory(catName);
    setSearchTerm('');
    setSearchCategory('All');
  };

  const handleBuyNowLocal = () => {
    onBuyNow && onBuyNow({ ...selectedProduct, quantity, selectedAddOns });
    setQuantity(1);
    setSelectedAddOns([]);
  };

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCartLocal = () => {
    if (!currentUser) {
      onAddToCart && onAddToCart({ ...selectedProduct, quantity, selectedAddOns }, true);
      return;
    }

    setIsAdding(true);
    onAddToCart && onAddToCart({ ...selectedProduct, quantity, selectedAddOns });

    // Reset adding state after a short delay
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
      setSelectedAddOns([]);
    }, 1000);
  };

  const toggleAddOn = (addon) => {
    setSelectedAddOns(prev => {
      const existing = prev.find(a => a.name === addon.name);
      if (existing) {
        return prev.map(a => a.name === addon.name ? { ...a, quantity: (a.quantity || 1) + 1 } : a);
      } else {
        return [...prev, { ...addon, quantity: 1 }];
      }
    });
  };

  const renderCategoryScreen = (title, items, categoryName) => (
    <div className="flex flex-col pt-2 animate-fadeIn">
      <Banner onOrderNow={() => setActiveCategory(null)} />
      <h3 className="text-[15px] font-bold tracking-wide mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mr-0 sm:mr-4 mb-10">
        {items.map((item, idx) => (
          <div key={idx} onClick={() => setSelectedProduct({ ...item, category: categoryName })} className="bg-white rounded-2xl p-4 flex flex-col shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200">
            <div className="w-full h-[200px] mb-3 overflow-hidden rounded-xl border border-gray-100 relative">
              {item.badge && <div className="absolute top-2 left-2 bg-[#7A1111] text-white text-[11px] font-bold w-7 h-7 rounded-full flex items-center justify-center z-10 shadow-md border border-white/20">{item.badge}</div>}
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center justify-center flex-1 space-y-1">
              <h4 className="text-black font-semibold text-[15px] text-center px-1 whitespace-pre-line leading-tight">{item.title}</h4>
              <div className="text-black font-extrabold text-[15px]">₱ {item.price || item.priceRange}</div>
            </div>
            <div className="flex justify-between items-center mt-3 pt-1 w-full px-1">
              <div className="flex items-center text-[#ff9800] space-x-1">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                <span className="text-[14px] font-bold text-gray-600 pb-[1px]">0</span>
              </div>
              <svg className="w-6 h-6 text-[#7d1919] cursor-pointer hover:fill-current transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
      {categoryName === 'Samgyupsal' && (
        <>
          <h3 className="text-[14px] font-bold tracking-wide mb-6">{t('samgyupsal_add_ons')} :</h3>
          <div className="flex space-x-4 sm:space-x-6 pb-10 overflow-x-auto hide-scroll-bar">
            {samgyupsalAddOns.map((addon, idx) => (
              <div key={idx} className="flex flex-col items-center cursor-pointer group w-[90px]">
                <div className="w-[85px] h-[85px] rounded-full overflow-hidden bg-white mb-3 shadow-lg border-2 border-transparent group-hover:border-white group-hover:scale-105 transition-all duration-200">
                  <img src={addon.img} alt={addon.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-bold text-center leading-tight px-1 text-white">{addon.name}</span>
                {addon.price && <span className="text-[10px] font-semibold text-yellow-300 mt-0.5">{addon.price}</span>}
              </div>
            ))}
          </div>
        </>
      )}
      {categoryName === 'Hotpot' && (
        <>
          <h3 className="text-[14px] font-bold tracking-wide mb-6">{t('hotpot_add_ons')} :</h3>
          <div className="flex space-x-4 sm:space-x-6 pb-10 overflow-x-auto hide-scroll-bar">
            {hotpotAddOns.map((addon, idx) => (
              <div key={idx} className="flex flex-col items-center cursor-pointer group w-[90px]">
                <div className="w-[85px] h-[85px] rounded-full overflow-hidden bg-white mb-3 shadow-lg border-2 border-transparent group-hover:border-white group-hover:scale-105 transition-all duration-200">
                  <img src={addon.img} alt={addon.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-bold text-center leading-tight px-1 text-white">{addon.name}</span>
                {addon.price && <span className="text-[10px] font-semibold text-yellow-300 mt-0.5">{addon.price}</span>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#680000] font-sans text-white flex flex-col relative overflow-hidden">
      {/* Header - Redesigned to match Turn 17 screenshot */}
      <header className="bg-[#680000] border-b border-[#3e0202] py-3 sm:py-4 px-4 sm:px-8 flex flex-wrap sm:flex-nowrap justify-between items-center text-white sticky top-0 z-[100] shadow-md gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onMenuClick && onMenuClick()}
            className="text-white hover:text-gray-200 transition-colors cursor-pointer"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <div onClick={() => { handleCategoryClick(null); setSelectedProduct(null); }} className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border border-white/20">
              <img src="https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/414820211_24446117301670315_6333978278326920804_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHj56M924AN-nIC1b_7dsVv3gU-2rzyePneBT7avPJ4-RdZS6-sbisgarqtK_nSSKkN_aUrFcX-xoNaICHUj10m&_nc_ohc=nImjurVIoNwQ7kNvwGCCqfR&_nc_oc=AdoKVu7D_Xy0WbGzHlbjY5ZtEtagrzXFKs89apVHwZas6GAdMkUTnneMx7UiciMlAzI&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=ljmFn3p0w6petYuAHS2a8g&_nc_ss=7a2a8&oh=00_Af12ECLaP_rCRhhKpKb84HvJSlNiCUZyg_-MZG5LjZGzdQ&oe=69EF4AC5" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white whitespace-nowrap">G.C. KOREAN BBQ</span>
          </div>
        </div>

        {/* Persist Search Bar */}
        <div className="flex-1 w-full max-w-xl mx-0 sm:mx-6 flex">
          {!['Customer Highlights', 'Corporate Information'].includes(activeCategory) && !selectedProduct && (
            <div className="bg-white rounded-xl flex items-center w-full shadow-md border border-gray-100 group focus-within:ring-2 focus-within:ring-[#680000]/10 transition-all duration-300">
              {/* Search Icon / Button */}
              <div className="flex items-center flex-1">
                <button
                  onClick={() => {
                    const input = document.getElementById('main-search-input');
                    if (input) input.focus();
                  }}
                  className="pl-3 sm:pl-5 pr-2 text-gray-300 group-focus-within:text-[#680000] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>

                {/* Input */}
                <input
                  id="main-search-input"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.target.blur();
                    }
                  }}
                  placeholder={t('search')}
                  className="bg-transparent border-none outline-none w-full text-gray-700 text-sm sm:text-[15px] font-medium py-2 sm:py-3 pr-2 placeholder:text-gray-300"
                />

                {/* Clear Button */}
                {(searchTerm || searchCategory !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSearchCategory('All');
                    }}
                    className="p-2 mr-1 text-gray-400 hover:text-red-600 transition-colors shrink-0"
                    title="Clear all filters"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-200 shrink-0"></div>

              {/* Category Filter Custom Dropdown */}
              <div className="relative shrink-0 h-full">
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="bg-gray-50/50 text-[#680000] text-[11px] sm:text-[13px] font-black h-full px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-center space-x-1 sm:space-x-2 hover:bg-[#680000]/5 transition-colors rounded-r-xl"
                >
                  <span className="truncate max-w-[70px] sm:max-w-none">{searchCategory === 'All' ? 'All Categories' : searchCategory}</span>
                  <svg className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {isCategoryDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-[110]" onClick={() => setIsCategoryDropdownOpen(false)}></div>
                    <div className="absolute top-[calc(100%+8px)] right-0 w-[180px] sm:w-[220px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-gray-100 py-2 z-[120] animate-fadeIn overflow-hidden">
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Category</span>
                      </div>
                      <button
                        onClick={() => {
                          setSearchCategory('All');
                          setActiveCategory(null);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-[13px] font-bold transition-colors ${searchCategory === 'All' ? 'bg-[#680000] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        All Categories
                      </button>
                      {categories.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSearchCategory(c.name);
                            setActiveCategory(null);
                            setIsCategoryDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-[13px] font-bold transition-colors ${searchCategory === c.name ? 'bg-[#680000] text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right side actions - matching screenshot style */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {!isLoggedIn && (
            <button onClick={onLoginClick} className="hidden sm:block px-5 py-1.5 border border-white text-white rounded-full text-sm font-bold hover:bg-white/10 transition-colors whitespace-nowrap">
              {t('login')}
            </button>
          )}



          {/* Cart Icon with Badge */}
          <div className="relative">
            <button
              id="cart-toggle-btn"
              onClick={() => currentUser && setIsCartOpen(!isCartOpen)}
              className={`text-white transition-colors p-2 ${currentUser ? 'hover:text-[#d4af37]' : 'opacity-50 cursor-default pointer-events-none'}`}
            >
              <div className="relative">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                {cartCount > 0 && (
                  <span className={`absolute -top-1 -right-1 bg-[#d4af37] text-[#640a0a] text-[10px] sm:text-[11px] font-extrabold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-sm ${showCartToast ? 'animate-cartPulse' : ''}`}>
                    {cartCount}
                  </span>
                )}
              </div>
            </button>

            <CartDropdown
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cartItems={cartItems}
              orderInfo={orderInfo}
              onRemoveItem={onRemoveItem}
              onClearCart={onClearCart}
              onCheckout={onCheckout}
            />
          </div>

          {isLoggedIn && (
            <div className="flex items-center space-x-3 relative">
              <span className="hidden sm:inline-block text-sm font-bold text-gray-200">
                {currentUser?.username || currentUser?.email?.split('@')[0]}
              </span>
              <div className="relative">
                <div
                  id="profile-toggle-btn"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-300 transition-colors shrink-0"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
                <ProfileDropdown
                  isOpen={isProfileOpen}
                  onClose={() => setIsProfileOpen(false)}
                  onLogout={onLogout}
                  user={currentUser}
                  onAccountSettingsClick={onAccountSettingsClick}
                  onLoginClick={onLoginClick}
                  onOrdersClick={onOrdersClick}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Body */}
      {selectedProduct ? (
        <div className="flex-1 bg-white flex flex-col w-full px-8 md:px-12 py-6 animate-fadeIn text-black lg:rounded-t-2xl overflow-y-auto custom-scroll">
          <div className="flex items-center mb-8 sm:mb-10">
            <button
              onClick={() => {
                setSelectedProduct(null);
                if (initialProduct && onClearInitialProduct) {
                  onClearInitialProduct();
                }
              }}
              className="mr-5 flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-all active:scale-90 border border-gray-100 shadow-sm"
              title="Back to menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h2 className="text-[20px] sm:text-[22px] font-black tracking-tight text-gray-900">{t('product_details')}</h2>
          </div>
          <div className="flex flex-col lg:flex-row flex-1 max-w-6xl mx-auto w-full gap-6 sm:gap-8 lg:gap-12 pb-6">
            <div className="w-full lg:w-[38%] shrink-0">
              <div className="w-full aspect-[4/5] sm:aspect-square rounded-[20px] sm:rounded-[28px] overflow-hidden shadow-xl border-4 border-white">
                <img src={selectedProduct.img} alt={selectedProduct.title} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1 flex flex-col pt-0 text-black">
              <div className="flex flex-col mb-10">
                <h1 className="text-[32px] sm:text-[38px] font-bold leading-tight text-gray-900 mb-6">{selectedProduct.title}</h1>
                <div className="flex flex-col items-end">
                  <div className="text-[28px] sm:text-[32px] font-black tracking-tight text-gray-900">₱ {selectedProduct.price || selectedProduct.priceRange}</div>
                  <div className="flex items-center space-x-3 mt-4">
                    <h3 className="text-[12px] font-bold tracking-widest text-gray-500 uppercase">QTY.</h3>
                    <div className="flex items-center w-[110px] h-9 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="flex-1 h-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors border-r border-gray-100 active:bg-gray-100"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                      </button>
                      <div className="w-10 h-full flex items-center justify-center font-bold text-[15px] text-gray-800">
                        {quantity}
                      </div>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="flex-1 h-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors border-l border-gray-100 active:bg-gray-100"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-gray-100 mb-6" />
              <div className="mb-8">
                <h3 className="text-[14px] font-black text-gray-900 mb-3 uppercase tracking-wider">Set Inclusion:</h3>
                <div className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed font-bold whitespace-pre-line bg-[#f8f9fa] p-5 rounded-2xl border border-gray-100">
                  {selectedProduct.inclusion || 'UNLI Rice\nSide Dishes\nSauces\nMeat Selection'}
                </div>
              </div>
              <hr className="border-gray-100 mb-6" />
              {(selectedProduct.category === 'Samgyupsal' || selectedProduct.category === 'Hotpot') && (
                <div className="mb-6">
                  <h3 className="text-[14px] font-black text-gray-900 mb-4 uppercase tracking-wider">{selectedProduct.category} Add On :</h3>
                  <div className="flex space-x-4 overflow-x-auto pb-2 custom-scroll">
                    {(selectedProduct.category === 'Samgyupsal' ? samgyupsalAddOns : hotpotAddOns).map((addon, idx) => {
                      const selectedAddon = selectedAddOns.find(a => a.name === addon.name);
                      const isSelected = !!selectedAddon;
                      const addonQty = selectedAddon?.quantity || 0;

                      return (
                        <div
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleAddOn(addon);
                          }}
                          className="flex flex-col items-center shrink-0 group cursor-pointer relative pt-2 active:scale-95 transition-transform"
                        >
                          <div className="relative pointer-events-none">
                            <div className={`w-[64px] h-[64px] rounded-full overflow-hidden bg-white shadow-sm border-2 transition-all duration-200 ${isSelected ? 'border-red-800 scale-105' : 'border-gray-100 group-hover:border-gray-300'}`}>
                              <img src={addon.img} alt={addon.name} className="w-full h-full object-cover" />
                            </div>
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-800 flex items-center justify-center border-2 border-white shadow-sm">
                                <span className="text-white text-[10px] font-black">{addonQty}</span>
                              </div>
                            )}
                          </div>
                          <span className={`text-[11px] font-bold text-center leading-tight mt-3 px-1 w-[80px] pointer-events-none transition-colors ${isSelected ? 'text-red-900' : 'text-gray-700'}`}>{addon.name}</span>
                          {addon.price && <span className="text-[10px] font-semibold text-[#7d1919] mt-0.5 pointer-events-none">{addon.price}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity selector removed from here */}

              <div className="relative">
                {/* Pop-up Toast */}
                {showCartToast && toastProduct && (
                  <div className="absolute bottom-full right-0 mb-3 z-[100] animate-bounceIn w-[300px] pointer-events-none">
                    <div className="bg-white px-4 py-3 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-50">
                        <img src={toastProduct.img} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[#640a0a] font-black text-[14px] leading-tight mb-0.5">Added to Cart!</p>
                        <p className="text-gray-500 text-[12px] font-bold truncate leading-tight">{toastProduct.title}</p>
                      </div>
                      <div className="w-7 h-7 bg-[#640a0a] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-5 mt-6 sm:mt-8">
                  <button onClick={handleBuyNowLocal} className="flex-1 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-xl text-black font-extrabold text-[15px] sm:text-[16px] shadow-sm hover:bg-[#6b0202] hover:text-white hover:border-[#6b0202] transition-all duration-300">{t('buy_now')}</button>
                  <button
                    onClick={handleAddToCartLocal}
                    disabled={isAdding}
                    className={`flex-1 py-3 sm:py-4 rounded-xl font-extrabold text-[15px] sm:text-[16px] shadow-lg transition-all duration-300 ${isAdding ? 'bg-[#843e18] text-white scale-95' : 'bg-[#6b0202] text-white hover:bg-white hover:text-black hover:border-2 hover:border-gray-200 hover:scale-[1.02]'}`}
                  >
                    {isAdding ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                        <span>Added!</span>
                      </span>
                    ) : t('add_to_cart')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row flex-1 px-4 md:px-6 pb-6 pt-2 animate-fadeIn overflow-hidden">
          {/* Mobile Categories Scroll */}
          <div className="lg:hidden flex space-x-3 overflow-x-auto custom-scroll-x pb-4 pt-2 shrink-0 w-full touch-pan-x">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat.name || searchCategory === cat.name;
              return (
                <div key={idx} onClick={() => handleCategoryClick(cat.name === activeCategory ? null : cat.name)} className={`shrink-0 h-10 px-4 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition duration-200 ${isActive ? 'bg-[#310c0c] text-white' : 'bg-white text-black'}`}>
                  {cat.name}
                </div>
              );
            })}
          </div>

          {!['Customer Highlights', 'Corporate Information'].includes(activeCategory) && (
            <div className="hidden lg:flex w-[320px] shrink-0 rounded-lg p-4 flex-col space-y-4 overflow-y-auto hide-scroll-bar mr-6">
              {categories.map((cat, idx) => {
                const isActive = activeCategory === cat.name || searchCategory === cat.name;
                return (
                  <div key={idx} onClick={() => handleCategoryClick(cat.name === activeCategory ? null : cat.name)} className={`group rounded-xl shadow-md p-1.5 flex items-center cursor-pointer transition duration-200 ${isActive ? 'bg-[#310c0c] text-white' : 'bg-white text-black hover:bg-red-950 hover:text-white'}`}>
                    <div className="w-[100px] h-[80px] rounded-lg overflow-hidden shrink-0">
                      <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                    </div>
                    <div className={`flex-1 px-4 font-extrabold text-[17px] leading-tight tracking-tight ${isActive ? 'text-white' : 'text-black group-hover:text-white'}`}>{cat.name}</div>
                  </div>
                );
              })}
              <div className="flex flex-col mt-4 space-y-5 px-2 pb-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center cursor-pointer group" onClick={() => setIsSamgyupAddOnOpen(!isSamgyupAddOnOpen)} onMouseEnter={() => setIsSamgyupAddOnOpen(true)}>
                    <span className="text-[20px] font-bold tracking-wide group-hover:text-white transition-colors">{t('samgyupsal_add_ons')}</span>
                    <svg className={`w-5 h-5 group-hover:text-gray-300 transition-transform duration-300 ${isSamgyupAddOnOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSamgyupAddOnOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="grid grid-cols-3 gap-y-6 gap-x-2 pt-2 pb-4">
                      {samgyupsalAddOns.map((addon, idx) => (
                        <div key={idx} className="flex flex-col items-center group cursor-pointer">
                          <div className="w-[75px] h-[75px] rounded-full overflow-hidden bg-white mb-2 shadow-md group-hover:scale-105 transition-transform duration-200"><img src={addon.img} alt={addon.name} className="w-full h-full object-cover" /></div>
                          <span className="text-[12px] font-semibold text-center leading-tight px-1">{addon.name}</span>
                          {addon.price && <span className="text-[10px] font-semibold text-yellow-300 mt-0.5">{addon.price}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center cursor-pointer group" onClick={() => setIsHotpotAddOnOpen(!isHotpotAddOnOpen)} onMouseEnter={() => setIsHotpotAddOnOpen(true)}>
                    <span className="text-[20px] font-bold tracking-wide group-hover:text-white transition-colors">{t('hotpot_add_ons')}</span>
                    <svg className={`w-5 h-5 group-hover:text-white transition-transform duration-300 ${isHotpotAddOnOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isHotpotAddOnOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="grid grid-cols-3 gap-y-6 gap-x-2 pt-2 pb-4">
                      {hotpotAddOns.map((addon, idx) => (
                        <div key={idx} className="flex flex-col items-center group cursor-pointer">
                          <div className="w-[75px] h-[75px] rounded-full overflow-hidden bg-white mb-2 shadow-md group-hover:scale-105 transition-transform duration-200"><img src={addon.img} alt={addon.name} className="w-full h-full object-cover" /></div>
                          <span className="text-[12px] font-semibold text-center leading-tight px-1">{addon.name}</span>
                          {addon.price && <span className="text-[10px] font-semibold text-yellow-300 mt-0.5">{addon.price}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={contentRef} className={`flex-1 flex flex-col overflow-y-auto custom-scroll relative ${['Customer Highlights', 'Corporate Information'].includes(activeCategory) ? 'pr-0' : 'pr-0 lg:pr-8'}`}>
            {searchResults ? (
              <div className="flex flex-col animate-fadeIn">
                <div className="px-1 py-4 mb-2">
                  <h2 className="text-[22px] font-bold tracking-tight text-white">
                    {searchTerm ? `Search results for "${searchTerm}"` : (searchCategory === 'All' ? 'All Categories' : searchCategory)}
                  </h2>
                </div>
                {searchResults.length > 0 ? (
                  <ProductGrid
                    title=""
                    items={searchResults}
                    onProductClick={(item) => setSelectedProduct(item)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <p className="text-lg font-bold">No items found.</p>
                    <p className="text-sm">Try adjusting your search or category filter.</p>
                  </div>
                )}
              </div>
            ) : activeCategory === 'Corporate Information' ? (
              <div className="flex flex-col animate-fadeIn bg-white min-h-full lg:rounded-t-2xl overflow-hidden text-black custom-scroll relative">
                <CorporateInformation onClose={() => setActiveCategory(null)} />
              </div>
            ) : activeCategory === 'Customer Highlights' ? (
              <div className="flex flex-col animate-fadeIn bg-white min-h-full lg:rounded-t-2xl overflow-hidden text-black custom-scroll">
                <div className="px-8 py-6 mb-2">
                  <h2 className="text-[22px] font-bold tracking-tight text-gray-800">{t('customer_highlights')}</h2>
                </div>
                <div className="flex flex-col sm:flex-row px-6 sm:px-14 gap-6 sm:gap-12 mb-10 items-center sm:items-start text-center sm:text-left">
                  <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden border-2 border-gray-100 shadow-lg shrink-0">
                    <img src="https://scontent.fmnl14-2.fna.fbcdn.net/v/t39.30808-6/414820211_24446117301670315_6333978278326920804_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHj56M924AN-nIC1b_7dsVv3gU-2rzyePneBT7avPJ4-RdZS6-sbisgarqtK_nSSKkN_aUrFcX-xoNaICHUj10m&_nc_ohc=nImjurVIoNwQ7kNvwGCCqfR&_nc_oc=AdoKVu7D_Xy0WbGzHlbjY5ZtEtagrzXFKs89apVHwZas6GAdMkUTnneMx7UiciMlAzI&_nc_zt=23&_nc_ht=scontent.fmnl14-2.fna&_nc_gid=ljmFn3p0w6petYuAHS2a8g&_nc_ss=7a2a8&oh=00_Af12ECLaP_rCRhhKpKb84HvJSlNiCUZyg_-MZG5LjZGzdQ&oe=69EF4AC5" alt="GC Logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col pt-0 sm:pt-4 items-center sm:items-start">
                    <div className="flex flex-col items-center sm:items-start pt-2">
                      <h2 className="text-[22px] sm:text-[24px] font-black mb-1.5 text-gray-900 tracking-tight">{t('about_title')}</h2>
                      <p className="text-[16px] sm:text-[18px] font-extrabold mb-5 text-[#680000] leading-tight italic">{t('about_welcome')}</p>
                      <div className="max-w-3xl">
                        <p className="text-[15px] sm:text-[16px] leading-[1.7] text-gray-700 font-medium text-justify sm:text-left">{t('about_p1')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="border-gray-100 mb-8 mx-14" />
                <div className="px-14 mb-6"><h3 className="text-xl font-bold text-gray-900">{t('highlights')}</h3></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 px-6 sm:px-14 pb-20">
                  {highlightPhotos.map((url, idx) => (
                    <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-md hover:scale-[1.03] transition-transform duration-300 cursor-pointer border border-gray-100">
                      <img src={url} alt={`Highlight ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            ) : activeCategory === 'Samgyupsal' ? renderCategoryScreen('Samgyupsal', samgyupsalItems, 'Samgyupsal')
              : activeCategory === 'Hotpot' ? renderCategoryScreen('Hotpot', hotpotItems, 'Hotpot')
                : activeCategory === 'GC Short Order' ? renderCategoryScreen('GC Short Order', shortOrderItems, 'GC Short Order')
                  : activeCategory === 'BBQ Meals' ? renderCategoryScreen('BBQ Meals', bbqMealsItems, 'BBQ Meals')
                    : activeCategory === 'GC Dessert' ? renderCategoryScreen('GC Dessert', dessertItems, 'GC Dessert')
                      : activeCategory === 'Samgyup On The Go!' ? renderCategoryScreen('Samgyup On The Go!', onTheGoItems, 'Samgyup On The Go!')
                        : (
                          <div className="flex flex-col animate-fadeIn">
                            <Banner onOrderNow={() => handleCategoryClick(null)} />
                            <div className="flex flex-col space-y-8 pb-10">
                              <ProductGrid title="Samgyupsal" items={samgyupsalItems} onProductClick={(item) => setSelectedProduct({ ...item, category: 'Samgyupsal' })} onSeeAll={() => handleCategoryClick('Samgyupsal')} />
                              <ProductGrid title="Hotpot" items={hotpotItems} onProductClick={(item) => setSelectedProduct({ ...item, category: 'Hotpot' })} onSeeAll={() => handleCategoryClick('Hotpot')} />
                              <ProductGrid title="GC Short Order" items={shortOrderItems} onProductClick={(item) => setSelectedProduct({ ...item, category: 'GC Short Order' })} onSeeAll={() => handleCategoryClick('GC Short Order')} />
                              <ProductGrid title="GC Dessert" items={dessertItems} onProductClick={(item) => setSelectedProduct({ ...item, category: 'GC Dessert' })} onSeeAll={() => handleCategoryClick('GC Dessert')} />
                              <ProductGrid title="Samgyup On The Go!" items={onTheGoItems} onProductClick={(item) => setSelectedProduct({ ...item, category: 'Samgyup On The Go!' })} onSeeAll={() => handleCategoryClick('Samgyup On The Go!')} />
                              <ProductGrid title="BBQ Meals" items={bbqMealsItems} onProductClick={(item) => setSelectedProduct({ ...item, category: 'BBQ Meals' })} onSeeAll={() => handleCategoryClick('BBQ Meals')} />
                            </div>
                          </div>
                        )}
          </div>
        </div>
      )}



      <style>{`
        @keyframes bounceIn {
          0% { transform: translate(-50%, 20px) scale(0.8); opacity: 0; }
          50% { transform: translate(-50%, -10px) scale(1.05); }
          100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
        }
        .animate-bounceIn {
          animation: bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes cartPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); background-color: #ffffff; }
          100% { transform: scale(1); }
        }
        .animate-cartPulse {
          animation: cartPulse 0.4s ease-out;
        }

        .hide-scroll-bar::-webkit-scrollbar { display: none; }
        .hide-scroll-bar { -ms-overflow-style: none; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
        .custom-scroll::-webkit-scrollbar { width: 14px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background-color: white; border-radius: 20px; border: 3px solid #7A1111; }
        .custom-scroll-x::-webkit-scrollbar { height: 6px; }
        .custom-scroll-x::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll-x::-webkit-scrollbar-thumb { background-color: rgba(255,255,255,0.5); border-radius: 10px; }
        .custom-scroll-x { -webkit-overflow-scrolling: touch; }
      `}</style>
    </div>
  );
};

export default OrderPage;
