/* eslint-disable react/prop-types */
import { shopContext } from '../Context/ContextProvider'
import '../CSS/Products.css'
import Hero from '../Component/Hero/Hero'
import { useContext } from 'react'

const Kids = ({ banner }) => {
  const { kidsProducts } = useContext(shopContext)

  return (
    <>
      <Hero banner={banner} />
      {
        kidsProducts && kidsProducts.length > 0 ? (
          <div className="prods">
            {
              kidsProducts.map((products) =>
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
        ) : (<p>No Kids Products</p>)
      }
    </>
  )
}

export default Kids