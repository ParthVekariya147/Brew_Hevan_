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

