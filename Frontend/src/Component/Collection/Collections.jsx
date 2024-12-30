import { useContext } from "react"
import { shopContext } from "../../Context/ContextProvider"
import '../../CSS/Collections.css'


const Collections = () => {
    const { allProducts ,addToCart} = useContext(shopContext)
    console.log("home:", allProducts)
    return (
        <>
            {/* {
        allProducts && allProducts.length>0?
        allProducts.map((product)=>
          <div key={product.id}>
                 <img src={product.image} alt="" />
                 <h1>{product.title}</h1>
                 <h1>{product.price}</h1>
                 <h1>{product.compare_at_price}</h1>
          </div>
        ):(
          <p>No data found</p>
        )
      } */}
            {
                allProducts && allProducts.length > 0 ? (
                    allProducts.map((category) => (
                        <div key={category.category_name}>
                            <h1 className="text-2xl font-bold mt-5">{category.category_name}</h1>
                            <div className="products">
                                {
                                    category.category_products && category.category_products.length > 0 ? (
                                        <div className="card">
                                            {category.category_products.map((products) => (
                                                <div key={products.id}>
                                                    <img src={products.image} alt="" />
                                                    <div className="descript">
                                                        <h1>{products.title}</h1>
                                                        <h2>${products.price}</h2>
                                                        <h3>{products.vendor}</h3>
                                                        <button className="addToCart" onClick={()=>{addToCart(products.id)}}>Add to Cart</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No Products</p>
                                    )
                                }
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading</p>
                )
            }

        </>
    )
}

export default Collections