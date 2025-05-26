/* eslint-disable react/prop-types */
import { shopContext } from '../Context/ContextProvider'
import '../CSS/Products.css'
import Hero from '../Component/Hero/Hero'
import { useContext } from 'react'

const Women = ({ banner }) => {
  const { womensProducts } = useContext(shopContext)
  console.log("womens:", womensProducts)
  return (
    <>
      <Hero banner={banner} />
      {
        womensProducts && womensProducts.length > 0 ? (
          <div className="prods">
            {
              womensProducts.map((products) =>
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
        ) : (<p>No Womens Products</p>)
      }
    </>
  )
}

export default Women