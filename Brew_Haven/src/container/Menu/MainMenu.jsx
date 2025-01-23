import React, { useEffect, useState } from "react";
import { MenuItem } from "../../components";
import axios from "axios";
import "./MainMenu.css";

const MainMenu = () => {
    const [menuItems, setMenuItems] = useState({});

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get("http://localhost:4000/menu/getmenu");
                const data = response.data.data;

                // Group items dynamically by category
                const groupedItems = data.reduce((acc, item) => {
                    if (!acc[item.category]) {
                        acc[item.category] = [];
                    }
                    acc[item.category].push(item);
                    return acc;
                }, {});

                setMenuItems(groupedItems);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        fetchMenuItems();
        
    }, []);

    return (
        <div className="app__mainMenu">
            <div className="app__specialMenu-grid">
                {Object.keys(menuItems).map((category) => {
                    // Define emojis for each category
                    let emoji;
                    switch (category) {
                        case "wines":
                            emoji = "🍷"; // Wine
                            break;
                        case "cocktails":
                            emoji = "🍸"; // Cocktail
                            break;
                        case "Hotcoffee":
                            emoji = "☕"; // Hot Coffee
                            break;
                        case "Coldcoffee":
                            emoji = "🧋"; // Cold Coffee
                            break;
                        
                        case "burgers":
                            emoji = "🍔"; // Burger
                            break;
                        case "sandwiches":
                            emoji = "🥪"; // Sandwich
                            break;
                        case "frenchFries":
                            emoji = "🍟"; // French Fries
                            break;
                        case "Chinese":
                            emoji = "🥢"; // Chinese Food (Chopsticks)
                            break;
                        case "Cakes":
                            emoji = "🎂"; // Cake
                            break;
                            case "pizzas":
                            emoji = "🍕"; // Pizza
                            break;
                        case "IceCreams":
                            emoji = "🍦"; // Ice Cream
                            break;
                    }

                    return (
                        <div key={category} className="app__specialMenu-category">
                            {/* Category Heading with Emoji */}
                            <p className="app__mainMenu-heading">{`${emoji} ${category.charAt(0).toUpperCase() + category.slice(1)}`}</p>

                            {/* Menu Items for the Category */}
                            <div className="app__mainMenu-items">
                                {menuItems[category].map((item) => (
                                    <MenuItem key={item._id} title={item.title} price={item.price} tags={item.tag} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MainMenu;
