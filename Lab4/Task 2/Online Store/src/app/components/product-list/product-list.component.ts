import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  trackById(index: number, product: Product): number {
    return product.id;
  }

  products: Product[] = [
    {
      id: 1,
      name: 'Apple iPhone 15 Pro 256GB Natural Titanium',
      description: 'Смартфон с чипом A17 Pro, камерой 48 МП, титановым корпусом и USB-C. Поддержка 5G и USB 3 для быстрой передачи данных.',
      price: 649990,
      rating: 4.8,
      image: 'assets/images/Iphone15pro.jpg.webp',
      images: [
        'assets/images/Iphone15pro.jpg.webp',
        'assets/images/Iphone15pro.jpg.webp',
        'assets/images/Iphone15pro.jpg.webp'
      ],
      link: 'https://kaspi.kz/shop/p/apple-iphone-15-pro-256gb-chernyi-113138191/'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra 256GB Titanium Black',
      description: 'Флагманский смартфон с встроенным S Pen, камерой 200 МП, чипом Snapdragon 8 Gen 3 и дисплеем 6.8" Dynamic AMOLED.',
      price: 589990,
      rating: 4.7,
      image: 'assets/images/SamsungS24.jpg',
      images: [
        'assets/images/SamsungS24.jpg',
        'assets/images/SamsungS24.jpg',
        'assets/images/SamsungS24.jpg'
      ],
      link: 'https://kaspi.kz/shop/p/samsung-galaxy-s24-ultra-256gb-chernyi-116512345/'
    },
    {
      id: 3,
      name: 'Apple MacBook Pro 14" M3 Pro 18GB 512GB',
      description: 'Профессиональный ноутбук с чипом M3 Pro, дисплеем Liquid Retina XDR, до 22 часов автономной работы и портами Thunderbolt 4.',
      price: 899990,
      rating: 4.9,
      image: 'assets/images/Macbook.jpg',
      images: [
        'assets/images/Macbook.jpg',
        'assets/images/Macbook.jpg',
        'assets/images/Macbook.jpg'
      ],
      link: 'https://kaspi.kz/shop/p/apple-macbook-pro-14-m3-pro-18gb-512gb-118765432/'
    },
    {
      id: 4,
      name: 'Sony PlayStation 5 Slim 1TB',
      description: 'Игровая консоль нового поколения с SSD 1 ТБ, поддержкой 4K/120fps, DualSense контроллером с тактильной обратной связью.',
      price: 249990,
      rating: 4.9,
      image: 'assets/images/PS5.jpg',
      images: [
        'assets/images/PS5.jpg',
        'assets/images/PS5.jpg',
        'assets/images/PS5.jpg'
      ],
      link: 'https://kaspi.kz/shop/p/sony-playstation-5-slim-1tb-115998877/'
    },
    {
      id: 5,
      name: 'Apple AirPods Pro 2nd Generation USB-C',
      description: 'Беспроводные наушники с активным шумоподавлением H2, адаптивным звуком, прозрачным режимом и зарядкой через USB-C.',
      price: 129990,
      rating: 4.8,
      image: 'assets/images/airpods2pro.jpg',
      images: [
        'assets/images/airpods2pro.jpg',
        'assets/images/airpods2pro.jpg',
        'assets/images/airpods2pro.jpg'
      ],
      link: 'https://kaspi.kz/shop/p/apple-airpods-pro-2-usb-c-114556677/'
    },
    {
      id: 6,
      name: 'Samsung 65" QLED 4K Smart TV QE65Q80C',
      description: 'Телевизор с технологией Quantum Dot, процессором Neo Quantum, поддержкой Dolby Atmos и встроенными стриминговыми сервисами.',
      price: 379990,
      rating: 4.6,
      image: 'assets/images/SamsungTV.jpg.avif',
      images: [
        'assets/images/SamsungTV.jpg.avif',
        'assets/images/SamsungTV.jpg.avif',
        'assets/images/SamsungTV.jpg.avif'
      ],
      link: 'https://kaspi.kz/shop/p/samsung-qe65qn85fauxce-165-sm-chernyi-145236663/'
    },
    {
      id: 7,
      name: 'DJI Mini 4 Pro Drone RC-N2',
      description: 'Компактный квадрокоптер весом 249 г с камерой 4K/100fps, HDR-видео, препятствиями по 360° и временем полёта 34 минуты.',
      price: 329990,
      rating: 4.7,
      image: 'assets/images/DJ.jpg',
      images: [
        'assets/images/DJ.jpg',
        'assets/images/DJ.jpg',
        'assets/images/DJ.jpg'
      ],
      link: 'https://kaspi.kz/shop/p/dji-mini-4-pro-rc-n2-belyi-113425594/'
    },
    {
      id: 8,
      name: 'Xiaomi Robot Vacuum S10+',
      description: 'Робот-пылесос с мощностью всасывания 4000 Па, лазерной навигацией LDS, функцией мойки пола и автоматической очисткой базы.',
      price: 189990,
      rating: 4.5,
      image: 'assets/images/Xiaomi.jpg',
      images: [
        'assets/images/Xiaomi.jpg',
        'assets/images/Xiaomi.jpg',
        'assets/images/Xiaomi.jpg'
      ],
      link: 'https://kaspi.kz/shop/p/xiaomi-robot-vacuum-x20-bhr8124eu-belyi-117857029/'
    },
    {
      id: 9,
      name: 'Apple Watch Series 9 41mm Midnight Aluminium',
      description: 'Смарт-часы с чипом S9 SiP, двойным касанием, яркостью экрана 2000 нит, датчиком ЧСС и кислорода, до 18 часов работы.',
      price: 169990,
      rating: 4.8,
      image: 'assets/images/Applewatch.jpg',
      images: [
        'assets/images/Applewatch.jpg',
        'assets/images/Applewatch.jpg',
        'assets/images/Applewatch.jpg'
      ],
      link: 'https://kaspi.kz/shop/p/apple-watch-series-9-gps-s-m-41-mm-serebristyi-sinii-113398164/'
    },
    {
      id: 10,
      name: 'Dyson V15 Detect Absolute Extra',
      description: 'Беспроводной пылесос с лазерным обнаружением пыли, мощностью 240 АВт, HEPA-фильтрацией и интеллектуальным датчиком пыли.',
      price: 279990,
      rating: 4.7,
      image: 'assets/images/Dyson.jpg',
      images: [
        'assets/images/Dyson.jpg',
        'assets/images/Dyson.jpg',
        'assets/images/Dyson.jpg'
      ],
      link: 'https://kaspi.kz/shop/p/dyson-v15-detect-absolute-serebristyi-110975356/'
    },
    {
      id: 11,
      name: 'Sony WH-1000XM5 Wireless Headphones Black',
      description: 'Полноразмерные наушники с лучшим в классе шумоподавлением, 30 часами работы, Multipoint Bluetooth и Hi-Res Audio.',
      price: 139990,
      rating: 4.9,
      image: 'assets/images/WH.jpg.webp',
      images: [
        'assets/images/WH.jpg.webp',
        'assets/images/WH.jpg.webp',
        'assets/images/WH.jpg.webp'
      ],
      link: 'https://kaspi.kz/shop/p/naushniki-sony-wh-1000xm5-chernyi-105259822/'
    },
    {
      id: 12,
      name: 'iPad Air 11" M2 256GB Wi-Fi Blue',
      description: 'Планшет с чипом M2, экраном Liquid Retina 11", поддержкой Apple Pencil Pro, Magic Keyboard и USB-C с USB 3.',
      price: 399990,
      rating: 4.8,
      image: 'assets/images/Ipad.jpg.webp',
      images: [
        'assets/images/Ipad.jpg.webp',
        'assets/images/Ipad.jpg.webp',
        'assets/images/Ipad.jpg.webp'
      ],
      link: 'https://kaspi.kz/shop/p/apple-ipad-air-11-2025-wi-fi-11-djuim-8-gb-512-gb-sinii-138403564/'
    }
  ];
}
