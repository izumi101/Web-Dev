import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private categories: Category[] = [
        { id: 1, name: 'Smartphones' },
        { id: 2, name: 'Laptops & Tablets' },
        { id: 3, name: 'Audio' },
        { id: 4, name: 'Home & Gadgets' }
    ];

    private products: Product[] = [
        // Category 1: Smartphones
        {
            id: 1,
            categoryId: 1,
            name: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
            description: 'Флагманский смартфон Apple с процессором A17 Pro, титановым корпусом и улучшенными камерами.',
            price: 649990,
            rating: 4.9,
            image: 'assets/images/Smarthphones/Iphone15pro.jpg.webp',
            images: ['assets/images/Smarthphones/Iphone15pro.jpg.webp', 'assets/images/Smarthphones/Iphone15pro.jpg.webp', 'assets/images/Smarthphones/Iphone15pro.jpg.webp'],
            link: 'https://kaspi.kz/shop/p/apple-iphone-15-pro-max-256gb-seryi-113138420/',
            likes: 0
        },
        {
            id: 2,
            categoryId: 1,
            name: 'Samsung Galaxy S24 Ultra 256GB Titanium Black',
            description: 'Мощный флагман на Android с процессором Snapdragon 8 Gen 3, стилусом S Pen и камерой 200 МП.',
            price: 589990,
            rating: 4.8,
            image: 'assets/images/Smarthphones/SamsungS24.jpg',
            images: ['assets/images/Smarthphones/SamsungS24.jpg', 'assets/images/Smarthphones/SamsungS24.jpg', 'assets/images/Smarthphones/SamsungS24.jpg'],
            link: 'https://kaspi.kz/shop/p/samsung-galaxy-s24-ultra-5g-12-gb-256-gb-chernyi-116043556/',
            likes: 0
        },
        {
            id: 3,
            categoryId: 1,
            name: 'Apple iPhone 13 128GB Midnight',
            description: 'Популярный смартфон с процессором A15 Bionic, отличной двойной камерой и ярким дисплеем.',
            price: 299990,
            rating: 4.9,
            image: 'assets/images/Smarthphones/iphone13.webp',
            images: ['assets/images/Smarthphones/iphone13.webp', 'assets/images/Smarthphones/iphone13.webp', 'assets/images/Smarthphones/iphone13.webp'],
            link: 'https://kaspi.kz/shop/p/apple-iphone-13-128gb-chernyi-102298404/',
            likes: 0
        },
        {
            id: 4,
            categoryId: 1,
            name: 'Xiaomi Redmi Note 13 Pro 8/256GB',
            description: 'Отличный смартфон среднего класса с экраном 120 Гц AMOLED и камерой 200 МП.',
            price: 139990,
            rating: 4.7,
            image: 'assets/images/Smarthphones/redmi_note_13.jpg',
            images: ['assets/images/Smarthphones/redmi_note_13.jpg', 'assets/images/Smarthphones/redmi_note_13.jpg', 'assets/images/Smarthphones/redmi_note_13.jpg'],
            link: 'https://kaspi.kz/shop/p/xiaomi-redmi-note-13-pro-8-gb-256-gb-chernyi-115848520/',
            likes: 0
        },
        {
            id: 5,
            categoryId: 1,
            name: 'Poco X6 Pro 12/512GB Black',
            description: 'Геймерский смартфон с высокой производительностью и быстрой зарядкой.',
            price: 189990,
            rating: 4.8,
            image: 'assets/images/Smarthphones/poco_x6_pro.avif',
            images: ['assets/images/Smarthphones/poco_x6_pro.avif', 'assets/images/Smarthphones/poco_x6_pro.avif', 'assets/images/Smarthphones/poco_x6_pro.avif'],
            link: 'https://kaspi.kz/shop/p/poco-x6-pro-12-gb-512-gb-chernyi-115852277/',
            likes: 0
        },

        // Category 2: Laptops & Tablets
        {
            id: 6,
            categoryId: 2,
            name: 'Apple MacBook Pro 14" M3 Pro 18GB 512GB',
            description: 'Профессиональный ноутбук от Apple с мощным чипом M3 Pro для ресурсоемких задач.',
            price: 899990,
            rating: 5.0,
            image: 'assets/images/Laptops & Tablets/Macbook.jpg',
            images: ['assets/images/Laptops & Tablets/Macbook.jpg', 'assets/images/Laptops & Tablets/Macbook.jpg', 'assets/images/Laptops & Tablets/Macbook.jpg'],
            link: 'https://kaspi.kz/shop/p/apple-macbook-pro-14-2023-mrx33-m3-pro-18-gb-ssd-512-gb-macos-chernyi-114481079/',
            likes: 0
        },
        {
            id: 7,
            categoryId: 2,
            name: 'iPad Air 11" M2 256GB Wi-Fi Blue',
            description: 'Универсальный планшет с чипом M2, экраном Liquid Retina 11" и поддержкой Apple Pencil.',
            price: 399990,
            rating: 4.9,
            image: 'assets/images/Laptops & Tablets/Ipad.jpg.webp',
            images: ['assets/images/Laptops & Tablets/Ipad.jpg.webp', 'assets/images/Laptops & Tablets/Ipad.jpg.webp', 'assets/images/Laptops & Tablets/Ipad.jpg.webp'],
            link: 'https://kaspi.kz/shop/p/apple-ipad-air-11-2024-wi-fi-8-gb-256-gb-sinii-119645281/',
            likes: 0
        },
        {
            id: 8,
            categoryId: 2,
            name: 'ASUS ROG Strix G16 16" i7-13650HX 16GB 1TB',
            description: 'Игровой ноутбук с мощной видеокартой RTX 4060 и дисплеем 165 Гц.',
            price: 749990,
            rating: 4.8,
            image: 'assets/images/Laptops & Tablets/asus_rog.webp',
            images: ['assets/images/Laptops & Tablets/asus_rog.webp', 'assets/images/Laptops & Tablets/asus_rog.webp', 'assets/images/Laptops & Tablets/asus_rog.webp'],
            link: 'https://kaspi.kz/shop/p/asus-rog-strix-g16-16-djuim-16-gb-ssd-1000-gb-dos-g614jv-n3074-90nr0c61-m003w0-111000720/',
            likes: 0
        },
        {
            id: 9,
            categoryId: 2,
            name: 'Lenovo IdeaPad Slim 3 15.6" i5 8GB 512GB',
            description: 'Тонкий и легкий ноутбук для повседневных задач и учебы.',
            price: 269990,
            rating: 4.6,
            image: 'assets/images/Laptops & Tablets/lenovo_ideapad.webp',
            images: ['assets/images/Laptops & Tablets/lenovo_ideapad.webp', 'assets/images/Laptops & Tablets/lenovo_ideapad.webp', 'assets/images/Laptops & Tablets/lenovo_ideapad.webp'],
            link: 'https://kaspi.kz/shop/p/lenovo-ideapad-slim-3-15-6-djuim-8-gb-ssd-512-gb-bez-os-15iah8-83er00alrk-116631898/',
            likes: 0
        },
        {
            id: 10,
            categoryId: 2,
            name: 'Samsung Galaxy Tab S9 FE 10.9" 128GB Silver',
            description: 'Отличный Android-планшет с S Pen в комплекте и защитой от воды и пыли.',
            price: 229990,
            rating: 4.8,
            image: 'assets/images/Laptops & Tablets/samsung_tab_s9_fe.jpg',
            images: ['assets/images/Laptops & Tablets/samsung_tab_s9_fe.jpg', 'assets/images/Laptops & Tablets/samsung_tab_s9_fe.jpg', 'assets/images/Laptops & Tablets/samsung_tab_s9_fe.jpg'],
            link: 'https://kaspi.kz/shop/p/samsung-galaxy-tab-s9-fe-sm-x510-wi-fi-6-gb-128-gb-serebristyi-113524855/',
            likes: 0
        },

        // Category 3: Audio
        {
            id: 11,
            categoryId: 3,
            name: 'Apple AirPods Pro 2nd Gen USB-C',
            description: 'TWS наушники с превосходным активным шумоподавлением и пространственным звуко.',
            price: 119990,
            rating: 4.9,
            image: 'assets/images/Audio/airpods2pro.jpg',
            images: ['assets/images/Audio/airpods2pro.jpg', 'assets/images/Audio/airpods2pro.jpg', 'assets/images/Audio/airpods2pro.jpg'],
            link: 'https://kaspi.kz/shop/p/apple-airpods-pro-2-s-type-c-belyi-113677582/',
            likes: 0
        },
        {
            id: 12,
            categoryId: 3,
            name: 'Sony WH-1000XM5 Black',
            description: 'Полноразмерные беспроводные наушники с лучшим в классе шумоподавлением.',
            price: 154990,
            rating: 4.8,
            image: 'assets/images/Audio/WH.jpg.webp',
            images: ['assets/images/Audio/WH.jpg.webp', 'assets/images/Audio/WH.jpg.webp', 'assets/images/Audio/WH.jpg.webp'],
            link: 'https://kaspi.kz/shop/p/sony-wh-1000xm5-chernyi-105259822/',
            likes: 0
        },
        {
            id: 13,
            categoryId: 3,
            name: 'Apple AirPods Max Silver',
            description: 'Премиальные накладные наушники от Apple с Hi-Fi звуком и активным шумоподавлением.',
            price: 369990,
            rating: 4.7,
            image: 'assets/images/Audio/airpods_max.jpg',
            images: ['assets/images/Audio/airpods_max.jpg', 'assets/images/Audio/airpods_max.jpg', 'assets/images/Audio/airpods_max.jpg'],
            link: 'https://kaspi.kz/shop/p/apple-airpods-max-serebristyi-100949286/',
            likes: 0
        },
        {
            id: 14,
            categoryId: 3,
            name: 'JBL Flip 6 Black',
            description: 'Портативная Bluetooth-колонка с мощным звуком и защитой от воды IP67.',
            price: 54990,
            rating: 4.9,
            image: 'assets/images/Audio/jbl_flip_6.jpg',
            images: ['assets/images/Audio/jbl_flip_6.jpg', 'assets/images/Audio/jbl_flip_6.jpg', 'assets/images/Audio/jbl_flip_6.jpg'],
            link: 'https://kaspi.kz/shop/p/jbl-flip-6-chernyi-103323282/',
            likes: 0
        },
        {
            id: 15,
            categoryId: 3,
            name: 'Marshall Major IV Black',
            description: 'Стильные накладные наушники с автономностью более 80 часов и фирменным звуком.',
            price: 74990,
            rating: 4.8,
            image: 'assets/images/Audio/marshall_major_iv.webp',
            images: ['assets/images/Audio/marshall_major_iv.webp', 'assets/images/Audio/marshall_major_iv.webp', 'assets/images/Audio/marshall_major_iv.webp'],
            link: 'https://kaspi.kz/shop/p/marshall-major-iv-chernyi-102138144/',
            likes: 0
        },

        // Category 4: Home & Gadgets
        {
            id: 16,
            categoryId: 4,
            name: 'Sony PlayStation 5 Slim 1TB',
            description: 'Игровая приставка нового поколения в обновленном компактном дизайне.',
            price: 249990,
            rating: 4.9,
            image: 'assets/images/Home/PS5.jpg',
            images: ['assets/images/Home/PS5.jpg', 'assets/images/Home/PS5.jpg', 'assets/images/Home/PS5.jpg'],
            link: 'https://kaspi.kz/shop/p/sony-playstation-5-slim-1-tb-114696098/',
            likes: 0
        },
        {
            id: 17,
            categoryId: 4,
            name: 'Apple Watch Series 9 41mm Midnight',
            description: 'Умные часы от Apple с новым двойным касанием и ярким дисплеем.',
            price: 199990,
            rating: 4.8,
            image: 'assets/images/Home/Applewatch.jpg',
            images: ['assets/images/Home/Applewatch.jpg', 'assets/images/Home/Applewatch.jpg', 'assets/images/Home/Applewatch.jpg'],
            link: 'https://kaspi.kz/shop/p/apple-watch-series-9-gps-s-m-41-mm-dopolnitel-nyi-remeshok-chernyi-113398164/',
            likes: 0
        },
        {
            id: 18,
            categoryId: 4,
            name: 'Dyson V15 Detect Absolute',
            description: 'Мощный беспроводной пылесос с лазером для обнаружения мельчайшей пыли.',
            price: 369990,
            rating: 4.8,
            image: 'assets/images/Home/Dyson.jpg',
            images: ['assets/images/Home/Dyson.jpg', 'assets/images/Home/Dyson.jpg', 'assets/images/Home/Dyson.jpg'],
            link: 'https://kaspi.kz/shop/p/dyson-v15-detect-absolute-serebristyi-zheltyi-101700676/',
            likes: 0
        },
        {
            id: 19,
            categoryId: 4,
            name: 'Xiaomi Robot Vacuum X10 White',
            description: 'Умный робот-пылесос с функцией самоочистки на док-станции.',
            price: 169990,
            rating: 4.6,
            image: 'assets/images/Home/Xiaomi.jpg',
            images: ['assets/images/Home/Xiaomi.jpg', 'assets/images/Home/Xiaomi.jpg', 'assets/images/Home/Xiaomi.jpg'],
            link: 'https://kaspi.kz/shop/p/xiaomi-robot-vacuum-x10-belyi-110026217/',
            likes: 0
        },
        {
            id: 20,
            categoryId: 4,
            name: 'Samsung 65" QLED 4K Smart TV',
            description: 'Тонкий QLED телевизор с великолепной цветопередачей и технологией HDR10+.',
            price: 389990,
            rating: 4.7,
            image: 'assets/images/Home/SamsungTV.jpg.avif',
            images: ['assets/images/Home/SamsungTV.jpg.avif', 'assets/images/Home/SamsungTV.jpg.avif', 'assets/images/Home/SamsungTV.jpg.avif'],
            link: 'https://kaspi.kz/shop/p/samsung-qe65q60cauxce-165-sm-chernyi-110255376/',
            likes: 0
        }
    ];

    constructor() { }

    getCategories(): Category[] {
        return this.categories;
    }

    getProductsByCategory(categoryId: number): Product[] {
        return this.products.filter(p => p.categoryId === categoryId);
    }

    removeProduct(productId: number): void {
        this.products = this.products.filter(p => p.id !== productId);
    }

    incrementLikes(productId: number): void {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.likes++;
        }
    }
}
