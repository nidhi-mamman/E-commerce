import { useContext } from 'react';
import '../CSS/Search.css'
import { shopContext } from '../Context/ContextProvider';

const SearchResults = () => {
    const { searchResults } = useContext(shopContext);
    console.log("Search Results:", searchResults);

    return (
        <>
            <div className="search">
                {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                        <div key={product.id}>
                            <img src={product.image} alt={product.title} />
                            <div className="descript">
                                <h3>{product.title}</h3>
                                <p>Price: {product.price}</p>
                                <p>Vendor: {product.vendor}</p>
                                <button className="btn">Add To Cart</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </>
    );
};

export default SearchResults;
