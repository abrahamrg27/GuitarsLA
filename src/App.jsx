import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"
function App() {

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




  return (
    <>
      <Header
        cart={cart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />




      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (

            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}

        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App