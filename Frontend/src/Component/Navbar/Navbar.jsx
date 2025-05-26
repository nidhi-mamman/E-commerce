import { FaSearch } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import '../../CSS/Navbar.css'
import { useContext, useState } from "react"
import { shopContext } from "../../Context/ContextProvider"
import { NavLink, useNavigate, Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
    const { searchProducts, getTotalCartItems, isLoggedin } = useContext(shopContext)
    const [query, setQuery] = useState('')
    const [showSubmenu, setShowSubmenu] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const navigate = useNavigate()
    const handleSearch = (e) => {
        e.preventDefault()
        setQuery(e.target.value)
        searchProducts(e.target.value)
    }
    const handleCategoryChange = (event) => {
        const category = event.target.value;
        if (category === "Men") {
            navigate("/men");
        } else if (category === "Women") {
            navigate("/women");
        } else if (category === "Kids") {
            navigate("/kids");
        } else {
            navigate("/");
        }
    };
    return (
        <>
            <div className="nav-bar">
                <ul>
                    <li className="logo">
                        <Link to='/'>SHOPIFY</Link>
                    </li>
                    <li>
                        <div className="flex">
                            <div className='search-area'>
                                <div className="search-btn" >
                                    <FaSearch />
                                </div>
                                <input type="text" className="search-input" value={query} onChange={handleSearch} placeholder="Type to Search....." />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center justify-center">
                            <NavLink to='/cart'> <div className=" text-black border-none p-1">
                                <BsCart4 size={28} />
                            </div></NavLink>
                            <div className="cart">
                                <p className="mt-1">{getTotalCartItems()}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="nav-items">
                <div className="search-bar">
                    <input type="text" className="search-input" value={query} onChange={handleSearch} placeholder="Type to Search....." />
                    <FaSearch className="search-btn-in" />
                </div>
                <ul>
                    <NavLink to='/'> <li className="text-white">Home</li></NavLink>
                    <li>
                        <select name="categories" className="category" onChange={handleCategoryChange}>
                            <option value="All Categories">Categories</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </li>
                    <li className="text-white">FAQ</li>
                    <li className="text-white">Contact</li>
                </ul>
                {
                    showMobileMenu ?
                        <RxCross1 size={24} color="white" className="hamburger-menu" onClick={() => { setShowMobileMenu(!showMobileMenu) }} />
                        :
                        <IoIosMenu size={30} color="white" className="hamburger-menu" onClick={() => { setShowMobileMenu(!showMobileMenu) }} />
                }
            </div>
            <div className={`mobile-menu ${showMobileMenu ? 'show' : 'hide'}`}>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li className='cursor-pointer flex gap-4 items-center justify-center' onClick={() => { setShowSubmenu(!showSubmenu) }}>Categories <IoIosArrowDown /></li>
                    <div className={`sub-menu ${showSubmenu ? "show" : "hide"}`}>
                        <ul>
                            <li><Link to='/men'>Men</Link></li>
                            <li><Link to='/women'>Women</Link></li>
                            <li><Link to='/kids'>Kids</Link></li>
                        </ul>
                    </div>
                    <li>FAQ</li>
                    <li>Contact</li>
                    {
                        isLoggedin ?
                            <li><Link to='/logout'><button className="bg-blue-950 text-white p-2">Logout</button></Link></li>
                            :
                            <li><Link to='/myAcc'><button className="bg-blue-950 text-white p-2">Login</button></Link></li>
                    }

                </ul>
            </div>
        </>
    )
}

export default Navbar