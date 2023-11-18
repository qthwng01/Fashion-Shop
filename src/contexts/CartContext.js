import { useState, useEffect, createContext } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const total = cart.reduce((acc, cur) => {
      return acc + cur.price * cur.amount
    }, 0)
    setTotal(total);
  })

  useEffect(() => {
    if(cart) {
      const amount = cart.reduce((acc, cur) => {
        return acc + cur.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart])

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    //setCart([...cart, newItem]);
    //check có trong giỏ hàng
    const checkItemsInCart = cart.find((item) => {
      return item.id === id;
    });
    //nếu trùng
    if (checkItemsInCart !== undefined) {
      const newCart = [...cart].map((data) => {
        if(data.id === id) {
          return { ...data, amount: checkItemsInCart.amount + 1 }
        } else {
          return data
        }
      });
      setCart(newCart)
      //không trùng
    } else {
      setCart([...cart, newItem])
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      //lọc mảng có id truyền vào -> xoá id(trả về false)
      //filter() dùng để lọc mảng trả về true hoặc false, nếu true thì mảng kh thay đổi, nếu false lọc phần tử đó ra khỏi mảng
      return item.id !== id
    });
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  }

  const increaseAmount = (id) => {
    const item = cart.find(item => item.id === id)
    addToCart(item, id)
  }

  const decreaseAmount = (id) => {
    //check có trong giỏ hàng
    const checkItemsInCart = cart.find((item) => {
      return item.id === id;
    });
    //nếu trùng
    if (checkItemsInCart !== undefined) {
      const itemInCart = [...cart].map((data) => {
        if(data.id === id) {
          return { ...data, amount: checkItemsInCart.amount - 1 }
        } else {
          return data
        }
      });
      setCart(itemInCart)
    }
    if(checkItemsInCart.amount < 2) {
      removeFromCart(id)
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
