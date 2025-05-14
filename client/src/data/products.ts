export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  images: string[];
  featured?: boolean;
  isNew?: boolean;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Slim Fit Oxford Shirt',
    description: 'Classic Oxford shirt in premium cotton with a slim fit. Button-down collar and long sleeves with adjustable cuffs.',
    price: 49.90,
    category: 'shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: true,
    isNew: true
  },
  {
    id: '2',
    name: 'Relaxed Fit Wool Blend Pants',
    description: 'Wool blend pants with a relaxed fit. Features front pleats, side pockets, and back welt pockets.',
    price: 79.90,
    category: 'pants',
    sizes: ['28', '30', '32', '34', '36'],
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: true
  },
  {
    id: '3',
    name: 'Leather Chelsea Boots',
    description: 'Premium leather Chelsea boots with elastic side panels and pull tab at the back. Stacked leather heel.',
    price: 149.90,
    category: 'shoes',
    sizes: ['7', '8', '9', '10', '11', '12'],
    images: [
      'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    isNew: true
  },
  {
    id: '4',
    name: 'Oversized Wool Blend Coat',
    description: 'Oversized coat in a wool blend with a notched lapel collar. Welt chest pocket and flap front pockets.',
    price: 199.90,
    category: 'jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: true
  },
  {
    id: '5',
    name: 'Silk Twill Pocket Square',
    description: 'Pocket square in a silk twill weave with a hand-rolled hem and printed pattern.',
    price: 29.90,
    category: 'accessories',
    sizes: ['ONE SIZE'],
    images: [
      'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    isNew: true
  },
  {
    id: '6',
    name: 'Print T-shirt',
    description: 'T-shirt in soft cotton jersey with a printed design at front.',
    price: 29.90,
    category: 'shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ]
  },
  {
    id: '7',
    name: 'Slim Fit Linen Pants',
    description: 'Slim-fit pants in cooling linen blend. Features side pockets and back welt pockets.',
    price: 59.90,
    category: 'pants',
    sizes: ['28', '30', '32', '34', '36'],
    images: [
      'https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    isNew: true
  },
  {
    id: '8',
    name: 'Leather Minimalist Watch',
    description: 'Minimalist watch with a stainless steel case and genuine leather strap.',
    price: 129.90,
    category: 'accessories',
    sizes: ['ONE SIZE'],
    images: [
      'https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    featured: true
  }
];

export default products;