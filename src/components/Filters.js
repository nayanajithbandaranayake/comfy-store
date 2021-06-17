import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    filters: {
      text,
      company,
      category,
      max_price,
      min_price,
      price,
      shipping,
      color,
    },
    updateFilters,
    clearFilters,
    allProducts,
  } = useFilterContext();

  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");
  const colors = getUniqueValues(allProducts, "colors");

  return (
    <Wrapper>
      <form onSubmit={(e) => e.preventDefault}>
        <div className="form-control">
          <input
            type="text"
            className="search-input"
            placeholder="search.."
            name="text"
            value={text}
            onChange={updateFilters}
          />
        </div>
        <div className="form-control">
          <h5>Category</h5>
          {categories.map((_category, index) => {
            return (
              <button
                type="button"
                key={index}
                name="category"
                className={
                  category === _category.toLowerCase() ? "active" : null
                }
                onClick={updateFilters}
              >
                {_category}
              </button>
            );
          })}
        </div>
        <div className="form-control">
          <h5>Company</h5>

          <select
            className="company"
            name="company"
            onChange={updateFilters}
            value={company}
          >
            {companies.map((_company, index) => {
              return <option key={index}>{_company}</option>;
            })}
          </select>
        </div>
        <div className="form-control">
          <div className="colors">
            {colors.map((_color, index) => {
              if (_color === "all") {
                return (
                  <button
                    name="color"
                    type="button"
                    className={color === "all" ? "all-btn active" : "all-btn"}
                    data-color="all"
                    onClick={updateFilters}
                  >
                    {_color}
                  </button>
                );
              }

              return (
                <button
                  className={
                    color === _color ? "color-btn active" : "color-btn"
                  }
                  type="button"
                  style={{ background: _color }}
                  key={index}
                  onClick={updateFilters}
                  data-color={_color}
                  name="color"
                >
                  {color === _color ? <FaCheck /> : null}
                </button>
              );
            })}
          </div>
        </div>
        <div className="form-control">
          <h5>price</h5>
          <p>{formatPrice(price)}</p>
          <input
            type="range"
            name="price"
            max={max_price}
            min={min_price}
            value={price}
            onChange={updateFilters}
          />
        </div>
        <div className="form-control shipping">
          <label htmlFor="shipping">free shipping</label>
          <input
            type="checkbox"
            name="shipping"
            id="shipping"
            checked={shipping}
            onChange={updateFilters}
          />
        </div>
        <button type="button" onClick={clearFilters} className="clear-btn">
          Clear filters
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
