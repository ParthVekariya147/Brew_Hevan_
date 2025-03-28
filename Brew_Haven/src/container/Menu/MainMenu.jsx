// @ts-ignore
import React, { useEffect, useState } from "react";
import { MenuItem } from "../../components";
import axios from "axios";
import "./MainMenu.css";
// @ts-ignore
import menuPDF from "../../assets/menu.pdf";

const MainMenu = () => {
  const [menuItems, setMenuItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/menu/getmenu");
        const data = response.data.data;

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

  const onButtonClick = () => {
    const fileURL = menuPDF;
    let alink = document.createElement("a");
    alink.href = fileURL;
    alink.download = "Menu.pdf";
    alink.click();
  };

  const filteredMenuItems = Object.keys(menuItems).reduce((acc, category) => {
    const filteredItems = menuItems[category].filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredItems.length > 0) {
      acc[category] = filteredItems;
    }
    return acc;
  }, {});

  return (
    <div className="app__mainMenu">
      <div className="app__mainMenu-header">
        <input
          type="text"
          placeholder="Search for an item..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="app__mainMenu-search"
        />
      </div>
      <div className="app__specialMenu-grid">
        {Object.keys(filteredMenuItems).map((category) => {
          let emoji;
          switch (category) {
            case "wines":
              emoji = "🍷";
              break;
            case "cocktails":
              emoji = "🍸";
              break;
            case "Hotcoffee":
              emoji = "☕";
              break;
            case "Coldcoffee":
              emoji = "🧋";
              break;
            case "burgers":
              emoji = "🍔";
              break;
            case "sandwiches":
              emoji = "🥪";
              break;
            case "frenchFries":
              emoji = "🍟";
              break;
            case "Chinese":
              emoji = "🥢";
              break;
            case "Cakes":
              emoji = "🎂";
              break;
            case "pizzas":
              emoji = "🍕";
              break;
            case "IceCreams":
              emoji = "🍦";
              break;
          }

          return (
            <div key={category} className="app__specialMenu-category">
              <p className="app__mainMenu-heading">{`${emoji} ${
                category.charAt(0).toUpperCase() + category.slice(1)
              }`}</p>

              <div className="app__mainMenu-items">
                {filteredMenuItems[category].map((item) => (
                  <MenuItem
                    key={item._id}
                    title={item.title}
                    price={item.price}
                    tags={item.tag}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <center>
        <button
          type="button"
          className="custom__button"
          style={{
            background: "transparent",
            color: "var(--color-golden)",
            padding: "0.75rem 2rem",
            fontWeight: "600",
            letterSpacing: "0.05em",
            borderRadius: "5px",
            border: "2px solid var(--color-golden)",
            transition: "all 0.3s ease",
          }}
          onMouseOut={(e) => {
            // @ts-ignore
            e.target.style.background = "transparent";
            // @ts-ignore
            e.target.style.color = "var(--color-golden)";
          }}
          onMouseOver={(e) => {
            // @ts-ignore
            e.target.style.background = "var(--color-golden)";
            // @ts-ignore
            e.target.style.color = "var(--color-black)";
          }}
          onClick={onButtonClick}
        >
          Download Menu
        </button>
      </center>
    </div>
  );
};

export default MainMenu;