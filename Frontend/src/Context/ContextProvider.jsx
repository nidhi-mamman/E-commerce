/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const shopContext = createContext()

export const ContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('user'))
    const authToken = `Bearer ${token}`
    const [cartItems, setCartItems] = useState({});
    const [allProducts, setAllProducts] = useState([])
    const [mensProducts, setMensProducts] = useState([])
    const [womensProducts, setWomensProducts] = useState([])
    const [kidsProducts, setKidsProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const BASE_URL = "http://localhost:5000/api"
    const isLoggedin = !!token;
    const navigate = useNavigate()


    const userAuthentication = async () => {
        if (!token) return;

        try {
            setIsLoading(true)
            const response = await axios.get(`${BASE_URL}/user`, {
                headers: {
                    Authorization: authToken
                }
            })
            if (response.status === 200) {
                const userdata = response.data.userData
                setUser(userdata)
            } else {
                console.log("Error fetching user data")
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const LogoutUser = async () => {
        setToken("")
        setCartItems({})
        localStorage.removeItem("user");
    };

    const getCartData = (products) => {
        const cart = {};
        products.forEach((product) => {
            cart[product.id] = cart[product.id] || 0;
        });
        return cart;
    };

    const addToCart = (itemId) => {
        if (!isLoggedin) {
            toast("Login first");
            navigate('/myAcc');
            return;
        }
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        if (localStorage.getItem('user')) {
            axios.post(
                `${BASE_URL}/addToCart`,
                { itemId },
                {
                    headers: {
                        Authorization: authToken,
                        'Content-Type': 'application/json',
                    }
                }
            )
                .then(response => {
                    console.log('Item added to cart:', response.data);
                })
                .catch(error => {
                    console.error('Error adding item to cart:', error.response?.data || error.message);
                });
        }


    };


    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            // Only decrement if the item count is greater than 0
            if (prev[itemId] > 0) {
                return { ...prev, [itemId]: prev[itemId] - 1 };
            }
            return prev; // Don't modify if quantity is 0
        });
        if (localStorage.getItem('user')) {
            axios.post(
                `${BASE_URL}/removeFromCart`,
                { itemId },
                {
                    headers: {
                        Authorization: authToken,
                        'Content-Type': 'application/json',
                    }
                }
            )
                .then(response => {
                    console.log('Item removing to cart:', response.data);
                })
                .catch(error => {
                    console.error('Error removing item to cart:', error.response?.data || error.message);
                });
        }
    }

    const getTotalAmount = () => {
        let totalAmount = 0;

        for (let item in cartItems) {
            if (cartItems[item] > 0) {

                let itemInfo = allProducts.flatMap(category => category.category_products).find((product) => product.id === item);

                if (itemInfo) {
                    totalAmount += Number(itemInfo.price) * cartItems[item];
                } else {
                    console.warn(`Product with ID ${item} not found.`);
                }
            }
        }

        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem
    }

    const getAllData = async () => {
        try {
            const response = await axios.get('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
            const all_products = response.data.categories;
            setAllProducts(all_products);

            // Only set initial cart data if there are no existing cart items
            if (Object.keys(cartItems).length === 0) {
                setCartItems(getCartData(all_products.flatMap(category => category.category_products)));
            }

            console.log("all products are:", allProducts);
            console.log("cart items are:", cartItems);
        } catch (error) {
            console.log(error);
        }
    };

    const getMensProducts = () => {
        if (allProducts.length > 0) {
            const mensCategory = allProducts.find((category) => category.category_name === 'Men')
            if (mensCategory) {
                setMensProducts(mensCategory.category_products)
            }
        }
    }

    const getWomensProducts = () => {
        if (allProducts.length > 0) {
            const womensCategory = allProducts.find((category) => category.category_name === 'Women')
            if (womensCategory) {
                setWomensProducts(womensCategory.category_products)
            }
        }
    }

    const getKidsProducts = () => {
        if (allProducts.length > 0) {
            const kidsCategory = allProducts.find((category) => category.category_name === 'Kids')
            if (kidsCategory) {
                setKidsProducts(kidsCategory.category_products)
            }
        }
    }

    const searchProducts = (query) => {
        const regex = new RegExp(`\\b${query}\\b`, "i");
        const results = allProducts
            .flatMap(category => category.category_products)
            .filter(product => regex.test(product.title) || regex.test(product.category || ""));

        setSearchResults(results);
        console.log("Search results:", results);

        if (results.length > 0) {
            navigate('/search', { replace: true });
        }
    };

    
    useEffect(() => {
        getAllData()
        if (localStorage.getItem('user')) {
            axios.post(
                `${BASE_URL}/getCart`, {},
                {
                    headers: {
                        Authorization: authToken,
                        'Content-Type': 'application/json',
                    }
                }
            )
                .then((response) => {
                    console.log(response.data)
                    setCartItems(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching cart data:', error);
                });
        }
    }, [token])

    useEffect(() => {
        getMensProducts()
        getWomensProducts()
        getKidsProducts()
    }, [allProducts])

    useEffect(() => {
        userAuthentication()
    }, [token])

    return (
        <shopContext.Provider value={{
            allProducts,
            getAllData,
            mensProducts,
            setMensProducts,
            womensProducts,
            setWomensProducts,
            kidsProducts,
            setKidsProducts,
            searchResults,
            setSearchResults,
            searchProducts,
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            getTotalAmount,
            getTotalCartItems,
            BASE_URL,
            user,
            setUser,
            token,
            setToken,
            authToken,
            isLoggedin,
            isLoading,
            setIsLoading,
            LogoutUser,
        }}>
            {props.children}
        </shopContext.Provider>
    )
}