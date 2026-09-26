import Header from "./components/header.jsx";
import { useState, useMemo } from "react";
import { db } from "./data/db.js";
import Guitar from "./components/guitar.jsx";

function App() {
  const [data, setData] = useState(db);
  const [auth, setAuth] = useState(false);
  const [cart, setCart] = useState([]);

  const max_item = 5;
  const min_item = 1;

  const cartTotal = useMemo(
    () => cart.reduce((acc, guitar) => acc + guitar.price * guitar.quantity, 0),
    [cart]
  );

  function handlerClick(item) {
    const guitarExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (guitarExists >= 0) {
      if (cart[guitarExists].quantity >= max_item) return;
      const updatedCart = [...cart];
      updatedCart[guitarExists].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  }

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < max_item) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity >= min_item);

    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Header
        cart={cart}
        total={cartTotal}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              guitar={guitar}
              handlerClick={handlerClick}
              key={guitar.id}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;