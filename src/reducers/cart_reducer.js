import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { amount, color, id, product } = action.payload;
    const tempProduct = state.cart_products.find((i) => i.id === id + color);

    if (tempProduct) {
      const tempCart = state.cart_products.map((item) => {
        if (item.id === id + color) {
          let newAmount =
            item.amount + amount < product.stock
              ? item.amount + amount
              : product.stock;

          return {
            ...item,
            amount: newAmount,
          };
        } else {
          return item;
        }
      });
      return { ...state, cart_products: tempCart };
    } else {
      const newItem = {
        id: id + color,
        color,
        price: product.price,
        amount,
        image: product.images[0].url,
        name: product.name,
        stock: product.stock,
      };
      return { ...state, cart_products: [...state.cart_products, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const filteredCart = state.cart_products.filter(
      (item) => item.id !== action.payload
    );
    return { ...state, cart_products: filteredCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart_products: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;

    const tempCart = state.cart_products.map((item) => {
      if (item.id === id) {
        if (value === "+") {
          let newAmount = item.amount + 1;
          if (item.amount >= item.stock) {
            newAmount = item.stock;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "-") {
          let newAmount = item.amount - 1;
          if (item.amount <= 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });

    return { ...state, cart_products: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    let total_amount = 0;
    let total_items = 0;
    state.cart_products.forEach((item) => {
      total_amount += item.price * item.amount;
      total_items += item.amount;
    });
    return { ...state, total_amount, total_items };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
