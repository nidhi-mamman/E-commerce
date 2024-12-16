/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const shopContext = createContext()

export const ContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('user'))
    const [cartItems, setCartItems] = useState({})
    const [allProducts, setAllProducts] = useState([])
    const [mensProducts, setMensProducts] = useState([])
    const [womensProducts, setWomensProducts] = useState([])
    const [kidsProducts, setKidsProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const authToken = `Bearer ${token}`
    // const BASE_URL = "http://localhost:5000/api"
    const BASE_URL = "https://e-commerce-server-sqfv.onrender.com"
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
        return localStorage.removeItem("user")
    }


    const getCartData = (products) => {
        const cart = {};
        products.forEach(product => {
            cart[product.id] = 0;
        });
        return cart;
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            console.log(updatedCart);
            return updatedCart;
        });
    };


    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalAmount = () => {
        let totalAmount = 0;

        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                // Flatten the products and find the item
                let itemInfo = allProducts.flatMap(category => category.category_products).find((product) => product.id === item);

                // Check if itemInfo exists before accessing price
                if (itemInfo) {
                    totalAmount += Number(itemInfo.price) * cartItems[item]; // Ensure price is treated as a number
                } else {
                    console.warn(`Product with ID ${item} not found.`);
                }
            }
        }

        return totalAmount; // Return the total amount after the loop
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
            const response = await axios.get('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
            const all_products = await response.data.categories;
            setAllProducts(all_products)
            setCartItems(getCartData(all_products.flatMap(category => category.category_products)));
            console.log("all products are:", allProducts)
            console.log("cart items are:", cartItems)
        } catch (error) {
            console.log(error)
        }
    }

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
        const regex = new RegExp(`\\b${query}\\b`, "i"); // Whole word, case-insensitive
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
    }, [])

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
            LogoutUser
        }}>
            {props.children}
        </shopContext.Provider>
    )

}