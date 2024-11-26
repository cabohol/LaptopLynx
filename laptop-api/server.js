const express = require('express');
const cors = require('cors');  // Import the CORS package
const app = express();
const PORT = 3000;

// Sample laptop data
const laptops = [
    { 
        id: 1, 
        name: 'Dell XPS 13', 
        specs: '• Processor: Intel Core i7-1185G7 (up to 4.8 GHz)\n• RAM: 16GB LPDDR4x\n• Storage: 512GB PCIe NVMe SSD\n• Display: 13.4" FHD+ (1920 x 1200)\n• Graphics: Intel Iris Xe Graphics', 
        price: '₱180/day', 
        bestFor: 'Coding', 
        image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9315/media-gallery/notebook-xps-9315-nt-blue-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=575&qlt=100,1&resMode=sharp2&size=575,402&chrss=full' 
    },
    { 
        id: 2, 
        name: 'Asus ROG Zephyrus G14', 
        specs: '• Processor: AMD Ryzen 9 5900HS (up to 4.6 GHz)\n• RAM: 32GB DDR4\n• Storage: 1TB PCIe NVMe SSD\n• Display: 14" QHD (2560 x 1440) 120Hz\n• Graphics: NVIDIA GeForce RTX 3060', 
        price: '₱200/day', 
        bestFor: 'Gaming', 
        image: 'https://dlcdnwebimgs.asus.com/gain/8D12A135-FBA7-4C6F-BB9D-A654F4398FFD/w1000/h732' 
    },
    { 
        id: 3, 
        name: 'MacBook Pro 16', 
        specs: '• Processor: Apple M1 Pro (up to 3.2 GHz)\n• RAM: 16GB Unified Memory\n• Storage: 512GB SSD\n• Display: 16.2" Liquid Retina XDR (3456 x 2234)\n• Graphics: 16-core GPU', 
        price: '₱200/day', 
        bestFor: 'Projects', 
        image: 'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111883_macbookair.png' 
      },
      { 
        id: 4, 
        name: 'HP Spectre x360', 
        specs: '• Processor: Intel Core i7-1165G7 (up to 4.7 GHz)\n• RAM: 16GB LPDDR4x\n• Storage: 1TB PCIe NVMe SSD\n• Display: 13.3" FHD (1920 x 1080) OLED\n• Graphics: Intel Iris Xe Graphics', 
        price: '₱190/day', 
        bestFor: 'Coding', 
        image: 'https://images.acer.com/is/image/acer/Aspire-Vero-AV15-51R-fingerprint-backlit-on-wallpaper-win11-01?$Series-Component-XL$' 
      },
      { 
        id: 5, 
        name: 'Lenovo ThinkPad X1', 
        specs: '• Processor: Intel Core i7-1160G7 (up to 4.4 GHz)\n• RAM: 16GB LPDDR4x\n• Storage: 1TB PCIe NVMe SSD\n• Display: 14" FHD (1920 x 1080) IPS\n• Graphics: Intel Iris Xe Graphics', 
        price: '₱170/day', 
        bestFor: 'Coding', 
        image: 'https://p1-ofp.static.pub//fes/cms/2024/08/27/sa9ozzagxvov6y59tywitpce6ix4hf666876.png' 
      },
      { 
        id: 6, 
        name: 'MSI GS66 Stealth', 
        specs: '• Processor: Intel Core i7-10870H (up to 5.0 GHz)\n• RAM: 32GB DDR4\n• Storage: 1TB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080) 240Hz\n• Graphics: NVIDIA GeForce RTX 3070', 
        price: '₱200/day', 
        bestFor: 'Gaming', 
        image: 'https://asset.msi.com/resize/image/global/product/product_3_20200311103035_5e684d4b13299.png62405b38c58fe0f07fcef2367d8a9ba1/380.png' 
      },
      { 
        id: 7, 
        name: 'Razer Blade 15', 
        specs: '• Processor: Intel Core i7-10750H (up to 5.0 GHz)\n• RAM: 16GB DDR4\n• Storage: 512GB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080) 144Hz\n• Graphics: NVIDIA GeForce GTX 1660 Ti', 
        price: '₱190/day', 
        bestFor: 'Gaming', 
        image: 'https://assets.razerzone.com/eeimages/support/products/1517/1517_blade15_mid2019.png' 
      },
      { 
        id: 8, 
        name: 'Huawei MateBook D15', 
        specs: '• Processor: Intel Core i5-1135G7 (up to 4.2 GHz)\n• RAM: 8GB DDR4\n• Storage: 512GB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080)\n• Graphics: Intel Iris Xe Graphics', 
        price: '₱150/day', 
        bestFor: 'Projects', 
        image: 'https://img01.huaweifile.com/sg/ms/ph/pms/uomcdn/PH_HW_B2B2C/pms/202307/gbom/6942103100611/group/800_800_39AA5EF24B88FF3396C55FA5E9FE9B93.png' 
      },
      { 
        id: 9, 
        name: 'Acer Aspire 5', 
        specs: '• Processor: AMD Ryzen 5 5500U (up to 4.0 GHz)\n• RAM: 8GB DDR4\n• Storage: 256GB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080)\n• Graphics: AMD Radeon Graphics', 
        price: '₱160/day', 
        bestFor: 'Projects', 
        image: 'https://images.acer.com/is/image/acer/Aspire-Vero-16?$Series-Component-XL$' 
      },
      { 
        id: 10, 
        name: 'Acer Nitro 5', 
        specs: '• Processor: Intel Core i7-11800H (up to 4.6 GHz)\n• RAM: 16GB DDR4\n• Storage: 1TB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080) 144Hz\n• Graphics: NVIDIA GeForce RTX 3060', 
        price: '₱200/day', 
        bestFor: 'Gaming', 
        image: 'https://images.acer.com/is/image/acer/acer-nitro-v-15-anv15-41-non-fingerprint-with-backlit-on-wp-black-01-1?$Series-Component-XL$' 
      },
      { 
        id: 11, 
        name: 'Lenovo V15 Gen 5', 
        specs: '• Processor: Intel Core i7-1165G7 (up to 4.7 GHz)\n• RAM: 16GB DDR4\n• Storage: 512GB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080) IPS\n• Graphics: Intel Iris Xe Graphics', 
        price: '₱170/day', 
        bestFor: 'Projects', 
        image: 'https://p3-ofp.static.pub//fes/cms/2024/05/17/t7s0iw77gpx1asifnfouhk4y23pvh0503560.png' 
      },
      { 
        id: 12, 
        name: 'Acer Predator Helios', 
        specs: '• Processor: Intel Core i7-11800H (up to 4.6 GHz)\n• RAM: 32GB DDR4\n• Storage: 1TB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080) 144Hz\n• Graphics: NVIDIA GeForce RTX 3080', 
        price: '₱230/day', 
        bestFor: 'Gaming', 
        image: 'https://asset.msi.com/resize/image/global/product/product_3_20200413144706_5e9b7ff627a36.jpg' 
      }
  ];


  app.use(cors()); // Allow all origins

  
  app.use(express.json()); // Allow parsing JSON data from requests
  
  app.get('/api/laptops', (req, res) => {
      res.json(laptops); // Send the laptop data as JSON response
  });
  
  // Server setup
  app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
  });