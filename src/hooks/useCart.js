import { useState, useEffect } from "react"
import { db } from "../data/db"

export const useCart = () => {
   //logica 
       // funcion para obtener el carrito guardado
       const initialCart = () => {
           const localStorageCart = localStorage.getItem('cart');
           return localStorageCart ? JSON.parse(localStorageCart) : [];
       };
   
       const [data] = useState(db);
       const [cart, setCart] = useState(initialCart);
   
           
   
       const MIN_ITEMS = 1;
       const MAX_ITEMS = 5;
   
       //Guardar cambios en localStorage
       useEffect(() => {
           localStorage.setItem('cart', JSON.stringify(cart));
       }, [cart]);
   
     function addToCart(item) {
       const itemExist = cart.findIndex(guitar => guitar.id === item.id);
       if (itemExist >= 0) {
   
         if (cart[itemExist].quantity >= MAX_ITEMS) return
         const updatedCart = [...cart];
         updatedCart[itemExist].quantity++
         setCart(updatedCart);
   
       } else {
         item.quantity = 1;
         setCart([...cart, item]);
       }
     }
     function decreaseQuantity(id) {
       const updateCart = cart.map(
         (item) => {
           if (item.id === id && item.quantity > MIN_ITEMS) {
             return {
               ...item,
               quantity: item.quantity - 1
             }
           }
           return item
         })
       setCart(updateCart)
     }
     function increaseQuantity(id) {
       const updateCart = cart.map(
         (item) => {
           if (item.id === id && item.quantity < MAX_ITEMS) {
             return {
               ...item,
               quantity: item.quantity + 1
             }
           }
           return item
         })
       setCart(updateCart)
     }
     function removeFromCart(id) {
       setCart(prevcart => prevcart.filter(guitar => guitar.id !== id));
   
     }
     function clearCart(e) {
       setCart([])
   
     }
   
   
    return {
        //metodos y variables
        cart,
        data,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        removeFromCart,
        clearCart

    }
}

//toda la logica se encuentre en el hook 
//el hedder se manda al hook 