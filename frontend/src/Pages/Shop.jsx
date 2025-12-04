import React from "react";
import Sample from "../Components/Sample/Sample";
import Popular from "../Components/Popular/Popular";
import Offer from "../Components/Offers/Offer";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";

const Shop = () => {
  return (
    <div>
      <Sample />
      <Popular />
      <Offer />
      <NewCollections/>
      <NewsLetter/>
    </div>
  );
};
export default Shop;
