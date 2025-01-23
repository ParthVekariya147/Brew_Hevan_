import images from './images';

const wines = [
    {
        title: 'Sula Rasa Shiraz',
        price: '₹4,200',
        tags: 'IN | Bottle | Nashik',
    },
    {
        title: 'Fratelli Sette',
        price: '₹4,800',
        tags: 'IN | Bottle | Akluj',
    },
    {
        title: 'Grover La Réserve',
        price: '₹2,800',
        tags: 'IN | 750 ml | Bengaluru',
    },
    {
        title: 'Simba Strong',
        price: '₹150',
        tags: 'IN | 750 ml | Indore',
    },
    {
        title: 'Kingfisher Ultra',
        price: '₹180',
        tags: 'IN | 750 ml | Bengaluru',
    },
];

const cocktails = [
    {
        title: 'Aperol Spritz',
        price: '₹650',
        tags: 'Aperol | Villa Marchesi prosecco | soda | 30 ml',
    },
    {
        title: "Dark 'N' Stormy",
        price: '₹600',
        tags: 'Dark rum | Ginger beer | Slice of lime',
    },
    {
        title: 'Daiquiri',
        price: '₹550',
        tags: 'Rum | Citrus juice | Sugar',
    },
    {
        title: 'Old Fashioned',
        price: '₹700',
        tags: 'Bourbon | Brown sugar | Angostura Bitters',
    },
    {
        title: 'Negroni',
        price: '₹680',
        tags: 'Gin | Sweet Vermouth | Campari | Orange garnish',
    },
];

const awards = [
    {
        imgUrl: images.award02,
        title: 'Bib Gourmond',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
    },
    {
        imgUrl: images.award01,
        title: 'Rising Star',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
    },
    {
        imgUrl: images.award05,
        title: 'AA Hospitality',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
    },
    {
        imgUrl: images.award03,
        title: 'Outstanding Chef',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
    },
];
export default { wines, cocktails, awards};




// import images from './images';

// const wines = [
//     {
//         title: 'Sula Rasa Shiraz',
//         price: '₹4,200',
//         tags: 'IN | Bottle | Nashik',
//     },
//     {
//         title: 'Fratelli Sette',
//         price: '₹4,800',
//         tags: 'IN | Bottle | Akluj',
//     },
//     {
//         title: 'Grover La Réserve',
//         price: '₹2,800',
//         tags: 'IN | 750 ml | Bengaluru',
//     },
//     {
//         title: 'Simba Strong',
//         price: '₹150',
//         tags: 'IN | 750 ml | Indore',
//     },
//     {
//         title: 'Kingfisher Ultra',
//         price: '₹180',
//         tags: 'IN | 750 ml | Bengaluru',
//     },
// ];

// const cocktails = [
//     {
//         title: 'Aperol Spritz',
//         price: '₹650',
//         tags: 'Aperol | Villa Marchesi prosecco | soda | 30 ml',
//     },
//     {
//         title: "Dark 'N' Stormy",
//         price: '₹600',
//         tags: 'Dark rum | Ginger beer | Slice of lime',
//     },
//     {
//         title: 'Daiquiri',
//         price: '₹550',
//         tags: 'Rum | Citrus juice | Sugar',
//     },
//     {
//         title: 'Old Fashioned',
//         price: '₹700',
//         tags: 'Bourbon | Brown sugar | Angostura Bitters',
//     },
//     {
//         title: 'Negroni',
//         price: '₹680',
//         tags: 'Gin | Sweet Vermouth | Campari | Orange garnish',
//     },
// ];

// const awards = [
//     {
//         imgUrl: images.award02,
//         title: 'Bib Gourmond',
//         subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
//     },
//     {
//         imgUrl: images.award01,
//         title: 'Rising Star',
//         subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
//     },
//     {
//         imgUrl: images.award05,
//         title: 'AA Hospitality',
//         subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
//     },
//     {
//         imgUrl: images.award03,
//         title: 'Outstanding Chef',
//         subtitle: 'Lorem ipsum dolor sit amet, consectetur.',
//     },
// ];
// const Coldcoffee = [
//     {
//       title: "Hazelnut Caramel Cold Brew",
//       price: "₹220",
//       tags: "Cold Brew, Hazelnut Syrup, Caramel Sauce, Ice",
//     },
//     {
//       title: "Coconut Vanilla Latte",
//       price: "₹200",
//       tags: "Espresso, Steamed Coconut Milk, Vanilla Syrup, Ice",
//     },
//     {
//       title: "Spicy Chai Cold Brew",
//       price: "₹180",
//       tags: "Cold Brew, Chai Syrup, Ginger, Cinnamon, Ice",
//     },
//     {
//       title: "Toffee Nut Latte",
//       price: "₹220",
//       tags: "Espresso, Steamed Milk, Toffee Nut Syrup, Ice",
//     },
//     {
//       title: "Mint Chocolate Chip Frappuccino",
//       price: "₹250",
//       tags: "Espresso, Chocolate Syrup, Mint Syrup, Whipped Cream, Ice",
//     },
//     {
//       title: "Salted Caramel Cold Brew",
//       price: "₹220",
//       tags: "Cold Brew, Caramel Sauce, Sea Salt, Ice",
//     },
//   ];
// const pizzas = [
//     {
//       title: 'Paneer Tikka Pizza',
//       price: '₹450',
//       tags: 'Paneer | Tikka Masala | Bell Peppers | Onions',
//       isVegetarian: true,
//     },
//     {
//       title: 'Vegetarian Delight Pizza',
//       price: '₹400',
//       tags: 'Tomato | Mozzarella | Mixed Vegetables | Olives',
//       isVegetarian: true,
//     },
//     {
//       title: 'Mushroom and Spinach Pizza',
//       price: '₹420',
//       tags: 'Mushrooms | Spinach | Mozzarella | Garlic',
//       isVegetarian: true,
//     },
//     {
//       title: 'Corn and Cheese Pizza',
//       price: '₹380',
//       tags: 'Sweet Corn | Mozzarella | Tomato Sauce',
//       isVegetarian: true,
//     },
//     {
//       title: 'Margherita Pizza',
//       price: '₹350',
//       tags: 'Tomato | Mozzarella | Basil',
//       isVegetarian: true,
//     },
//     {
//       title: 'Vegetable Supreme Pizza',
//       price: '₹480',
//       tags: 'Mixed Vegetables | Black Olives | Mushrooms | Onions | Bell Peppers',
//       isVegetarian: true,
//     },
//   ];    
// const burgers = [
//     {
//       title: 'McAloo Tikki Burger',
//       price: '₹59',
//       tags: 'Potato patty | Lettuce | Tomato | Pickles | Cheese',
//       restaurant: 'McDonald\'s',
//       isVegetarian: true,
//     },
//     {
//       title: 'McVeggie',
//       price: '₹119',
//       tags: 'Vegetable patty | Lettuce | Tomato | Pickles | Cheese',
//       restaurant: 'McDonald\'s',
//       isVegetarian: true,
//     },
//     {
//       title: 'Spicy Paneer Wrap',
//       price: '₹159',
//       tags: 'Paneer | Spicy sauce | Onion rings | Cheese',
//       restaurant: 'McDonald\'s',
//       isVegetarian: true,
//     },
//     {
//       title: 'Veg Whopper',
//       price: '₹249',
//       tags: 'Vegetable patty | Lettuce | Tomato | Pickles | Onion | Ketchup | Mayo',
//       restaurant: 'Burger King',
//       isVegetarian: true,
//     },
//     {
//       title: 'Crispy Veggie Burger',
//       price: '₹199',
//       tags: 'Vegetable patty | Lettuce | Tomato | Pickles | Onion | Mayo',
//       restaurant: 'Burger King',
//       isVegetarian: true,
//     },
//     {
//       title: 'Paneer Tikki Burger',
//       price: '₹149',
//       tags: 'Paneer patty | Lettuce | Tomato | Pickles | Cheese',
//       restaurant: 'Local eatery',
//       isVegetarian: true,
//     },
//   ];
//   const sandwiches = [
//     {
//       title: 'Masala Grilled Sandwich',
//       price: '₹200',
//       tags: 'Mixed vegetables | Indian spices | Cheese | Bread',
//     },
//     {
//       title: 'Paneer Tikka Sandwich',
//       price: '₹250',
//       tags: 'Paneer | Tikka Masala | Lettuce | Tomato | Mayo',
//     },
//     {
//       title: 'Aloo Tikki Sandwich',
//       price: '₹150',
//       tags: 'Potato patty | Chutney | Cheese | Bread',
//     },
//     {
//       title: 'Vegetable Poha Sandwich',
//       price: '₹120',
//       tags: 'Poha (flattened rice) | Vegetables | Spices | Bread',
//     },
//     {
//       title: 'Mixed Sprouts Sandwich',
//       price: '₹130',
//       tags: 'Mixed sprouts | Indian spices | Cheese | Bread',
//     },
//   ];
//   const frenchFries = [
//     {
//       title: 'Loaded Fries',
//       price: '₹120',
//       tags: 'Crispy | Cheese Sauce | Bacon | Jalapenos | Sour Cream',
//     },
//     {
//       title: 'Truffle Parmesan Fries',
//       price: '₹180',
//       tags: 'Crispy | Truffle Oil | Parmesan | Herbs | Garlic',
//     },
//     {
//       title: 'Chili Cheese Fries',
//       price: '₹100',
//       tags: 'Crispy | Cheese Sauce | Chili Powder | Jalapenos',
//     },
//     {
//       title: 'Sweet Potato Fries with Chipotle Mayo',
//       price: '₹100',
//       tags: 'Sweet Potato | Crispy | Chipotle Mayo | Sea Salt',
//     },
//     {
//       title: 'Fries with Peri Peri Sauce',
//       price: '₹80',
//       tags: 'Crispy | Peri Peri Sauce | Parmesan',
//     },
//   ];
//   const Chinese = [
//     {
//       title: 'Hakka Noodles',
//       price: '₹150',
//       tags: 'Noodles | Mixed Vegetables | Soy Sauce',
//     },
//     {
//       title: 'Vegetable Manchurian',
//       price: '₹120',
//       tags: 'Vegetable Balls | Manchurian Sauce | Spring Onion',
//     },
//     {
//       title: 'Schezwan Fried Rice',
//       price: '₹180',
//       tags: 'Rice | Schezwan Sauce | Mixed Vegetables',
//     },
//     {
//       title: 'Paneer Chili',
//       price: '₹170',
//       tags: 'Paneer | Bell Peppers | Chili Sauce | Soy Sauce',
//     },
//     {
//       title: 'Veg Spring Rolls',
//       price: '₹100',
//       tags: 'Crispy Rolls | Mixed Vegetables | Sweet Chili Sauce',
//     },
//     {
//       title: 'Vegetable Fried Rice',
//       price: '₹150',
//       tags: 'Rice | Mixed Vegetables | Soy Sauce',
//     },
//   ];

//   const Hotcoffee = [
//     {
//       title: "Hazelnut Caramel Latte",
//       price: "₹220",
//       tags: "Espresso, Steamed Milk, Hazelnut Syrup, Caramel Sauce",
//     },
//     {
//       title: "Coconut Vanilla Cappuccino",
//       price: "₹200",
//       tags: "Espresso, Steamed Coconut Milk, Vanilla Syrup, Frothed Milk",
//     },
//     {
//       title: "Spicy Chai Latte",
//       price: "₹180",
//       tags: "Chai Tea, Steamed Milk, Ginger, Cinnamon",
//     },
//     {
//       title: "Toffee Nut Latte",
//       price: "₹220",
//       tags: "Espresso, Steamed Milk, Toffee Nut Syrup",
//     },
//     {
//       title: "Mint Chocolate Chip Hot Chocolate",
//       price: "₹250",
//       tags: "Hot Chocolate, Chocolate Syrup, Mint Syrup, Whipped Cream",
//     },
//     {
//       title: "Salted Caramel Hot Chocolate",
//       price: "₹220",
//       tags: "Hot Chocolate, Caramel Sauce, Sea Salt",
//     },
//   ];
//   const Cakes = [
//     {
//       title: "Chocolate Ganache Cake",
//       price: "₹800",
//       tags: "Chocolate, Ganache, Chocolate Ganache Icing",
//     },
//     {
//       title: "Red Velvet Cake",
//       price: "₹750",
//       tags: "Red Velvet Cake, Cream Cheese Frosting",
//     },
//     {
//       title: "Vanilla Almond Cake",
//       price: "₹700",
//       tags: "Vanilla Cake, Almond Frosting",
//     },
//     {
//       title: "Mango Passion Fruit Cake",
//       price: "₹850",
//       tags: "Mango, Passion Fruit, Cream Cheese Frosting",
//     },
//     {
//       title: "Lemon Blueberry Cake",
//       price: "₹780",
//       tags: "Lemon Cake, Blueberry Filling, Lemon Glaze",
//     },
//     {
//       title: "Chocolate Caramel Cake",
//       price: "₹820",
//       tags: "Chocolate Cake, Caramel Sauce, Chocolate Ganache Icing",
//     },
//   ];
//   const IceCreams = [
//     {
//       title: "Classic Vanilla Ice Cream",
//       price: "₹150",
//       tags: "Vanilla, Ice Cream",
//     },
//     {
//       title: "Chocolate Fudge Brownie Ice Cream",
//       price: "₹200",
//       tags: "Chocolate, Fudge Brownie, Ice Cream",
//     },
//     {
//       title: "Strawberry Swirl Ice Cream",
//       price: "₹180",
//       tags: "Strawberry, Swirl, Ice Cream",
//     },
//     {
//       title: "Mint Chocolate Chip Ice Cream",
//       price: "₹170",
//       tags: "Mint, Chocolate Chip, Ice Cream",
//     },
//     {
//       title: "Cookie Dough Ice Cream",
//       price: "₹220",
//       tags: "Cookie Dough, Ice Cream",
//     },
//     {
//       title: "Salted Caramel Ice Cream",
//       price: "₹190",
//       tags: "Salted Caramel, Ice Cream",
//     },
//   ];

// export default { wines, cocktails, awards, pizzas, burgers, sandwiches, frenchFries, Chinese ,Coldcoffee , Hotcoffee , Cakes ,IceCreams};


