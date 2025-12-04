/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    setSortType("default");
  }, [props.category]);

  let filtered = all_product.filter(
    (item) => item.category === props.category
  );

  if (sortType === "low-high") {
    filtered = [...filtered].sort((a, b) => a.new_price - b.new_price);
  } else if (sortType === "high-low") {
    filtered = [...filtered].sort((a, b) => b.new_price - a.new_price);
  }

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Explore Products</span>
        </p>

        <div className="shopcategory-sort">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="sort-dropdown"
          >
            <option value="default">Sort by</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="shopcategory-products">
        {filtered.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
