import { createContext, useState } from "react";

export const CartContext = createContext();

const normalizeProduct = (product) => ({
    id: product.id,
    name:product.title ?? product.name ?? "Untitled product",
    price:Number(product.price ?? 0),
    image: product.image ?? product.imageUrl ?? "",
    raw: product,
});

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity = 1) => {
        const p = normalizeProduct(product);
     setCartItems(prev => {
     const existingItem = prev.find( item => item.id === product.id);
    if(existingItem) {
        return prev.map(item =>
         item.id === product.id ? {...item, quantity: (item.quantity || 0) + quantity} : item
     //   setCartItems(cartItems.map(item => item.id === product.id ? {...item, quantity: item.quantity + quantity} : item
        );
    } else {
        return [...prev, {...p, quantity}];
           // setCartItems([...cartItems, {...product, quantity}]);
        }
    });
}
    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const clearCart = () => setCartItems([]);

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = Number(item.quantity) || 0;
             return total + price * qty;
        }, 0)
    };
     return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, clearCart, getCartTotal}} >
            {children}
        </CartContext.Provider>
     );
};