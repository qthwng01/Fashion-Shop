import { useContext } from 'react'
import { Link } from "react-router-dom";
import { CartContext } from '../contexts/CartContext'

function CartItem({ item }) {
  const {removeFromCart, increaseAmount, decreaseAmount} = useContext(CartContext)
  const { id, title, image, amount, price } = item;

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <div>
          <Link to={`/product/${id}`} elements="">
            <img src={image} alt="sản phẩm" className="max-w-[80px]"></img>
          </Link>
        </div>
        <div className="w-full flex-col">
          <div className="flex justify-between mb-2">
            <Link
              to={`/product/${id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {title}
            </Link>
            <div onClick={() => removeFromCart(id)} className="text-xl cursor-pointer text-gray-500 hover:text-red-500 transition">
              <ion-icon name="close-circle-outline"></ion-icon>
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <div onClick={() => decreaseAmount(id)} className="flex-1 h-full flex justify-center items-center cursor-pointer">
                <ion-icon name="remove-outline"></ion-icon>
              </div>
              <div className="h-full flex justify-center items-center px-2 text-black">{amount}</div>
              <div onClick={() => increaseAmount(id)} className="flex-1 h-full flex justify-center items-center cursor-pointer">
                <ion-icon name="add-outline"></ion-icon>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-around">$ {price}</div>
            <div className="flex-1 flex justify-center items-center text-primary font-medium">{`$ ${parseFloat(price * amount).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
