import { useContext } from 'react';
import '../CSS/CartItems.css';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { shopContext } from '../Context/ContextProvider';
import { RiDeleteBin5Line } from "react-icons/ri";

const CartItems = () => {
    const { allProducts, cartItems, getTotalAmount, removeFromCart, addToCart } = useContext(shopContext);

    console.log('Total Amount:', getTotalAmount());

    return (
        <div className="cartitems">
            <h1 className='text-3xl font-bold mt-5 '>SHOPPING CART</h1>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {allProducts && allProducts.length > 0 ? (
                allProducts.map((category) => (
                    <div key={category.category_name}>
                        <div className="cartitems-format">
                            {category.category_products.map((product) => {
                                if (cartItems[product.id] > 0) { 
                                    return (<>
                                        <div key={product.id} className="cartitems-card">
                                            <img src={product.image} alt={product.title} />
                                            <p>{product.title}</p>
                                            <p>${product.price}</p>
                                            <div className='quantity'>
                                                <FaPlus className='border-1 border-gray-600 cursor-pointer' onClick={() => { addToCart(product.id) }} />
                                                <p>{cartItems[product.id]}</p>
                                                <FaMinus className='cursor-pointer' size={18} onClick={() => { removeFromCart(product.id) }} />
                                            </div>
                                            <p>${product.price * cartItems[product.id]}</p>
                                            <RiDeleteBin5Line
                                                onClick={() => removeFromCart(product.id)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                        <hr />
                                    </>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                ))
            ) : (
                <p>No products available.</p> // Fallback message
            )}
            <div className="totalCartAmount">
                <div className="cartitem-total">
                    <h1 className='cart-total'>CART TOTAL</h1>
                    <div>
                        <div className="subtotal">
                            <p>
                                Subtotal
                            </p>
                            <p>
                                ${getTotalAmount()}
                            </p>
                        </div>
                        <hr />
                        <div className="shipping">
                            <p>
                                Shipping
                            </p>
                            <p>
                                Free
                            </p>
                        </div>
                        <hr />
                        <div className="total-cartitem">
                            <p>
                                Total
                            </p>
                            <p>
                                ${getTotalAmount()}
                            </p>
                        </div>
                        <Link to='/order' className='cursor-pointer'> <button className='checkout'>PROCEED TO CHECKOUT</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
