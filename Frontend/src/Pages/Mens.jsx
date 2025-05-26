/* eslint-disable react/prop-types */
import '../CSS/Products.css'
import { useContext } from "react"
import Hero from '../Component/Hero/Hero'
import { shopContext } from "../Context/ContextProvider"


const Mens = ({ banner }) => {
  const { mensProducts } = useContext(shopContext)
  return (
    <>
      <Hero banner={banner} />
      {
        mensProducts && mensProducts.length > 0 ? (
          <div className="prods">
            {
              mensProducts.map((products) =>
                <div key={products.id}>
                  <img src={products.image} alt="" />

                  <h1>{products.title}</h1>
                  <h2>${products.price}</h2>
                  <h3>{products.vendor}</h3>
                  <button className="btn">Add To Cart</button>

                </div>
              )
            }
          </div>
        ) : (<p>No Mens Products</p>)
      }
    </>
  )
}

export default Mens