import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filteredProducts, gridView } = useFilterContext();

  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, there is no products to match your search.
      </h5>
    );
  }

  if (gridView) {
    return <GridView products={filteredProducts} />;
  }
  return <ListView products={filteredProducts} />;
};

export default ProductList;
