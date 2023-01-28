import { useState, createContext, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
  
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setcartItems] = useState([]);
    const [cartCount, setCartCount] = useState(null);

    const addItemToCart = (productToAdd) => {
        setcartItems(addCartItem(cartItems, productToAdd));
    };

    useEffect(() => {
        setCartCount(cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0));
    }, [cartItems]);

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };

    return <CartContext.Provider value={value} >{ children }</CartContext.Provider>
}