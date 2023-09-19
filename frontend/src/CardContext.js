import { createContext, useState } from "react";
import store from "./store";

export const CartContext = createContext({
  items: [],
  getProductQty: () => {},
  addOneToCart: () => {},
  addToCart: () => {},
  removeOneToCart: () => {},
  deleteOneToCart: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  function getProductQty(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }
  // function addOneToCart(_id) {
  //   const quantity = getProductQty(_id);
  //   if (quantity === 0) {
  //     // product is not in card
  //     setCartProducts([
  //       ...cartProducts,
  //       {
  //         id: _id,
  //         quantity: 1,
  //       },
  //     ]);
  //   } else {
  //     // product is in cart
  //     setCartProducts(
  //       cartProducts.map((product) =>
  //         product.id === _id
  //           ? { ...product, quantity: product.quantity + 1 }
  //           : product
  //       )
  //     );
  //   }
  // }
  function addToCart(_id, quantity) {
    const existingProductIndex = cartProducts.findIndex(
      (product) => product.id === _id
    );

    if (existingProductIndex === -1) {
      // Product is not in the cart, add it
      setCartProducts([
        ...cartProducts,
        {
          id: _id,
          quantity: quantity,
        },
      ]);
    } else {
      // Product is already in the cart, update its quantity
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts[existingProductIndex].quantity += quantity;
      setCartProducts(updatedCartProducts);
    }
  }

  function removeOneToCart(id) {
    const quantity = getProductQty(id);
    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id !== id;
      })
    );
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = store[0].products.find(
        (item) => item._id === cartItem.id
      );
      totalCost += productData.price * cartItem.quantity;
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQty,
    // addOneToCart,
    addToCart,
    removeOneToCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;