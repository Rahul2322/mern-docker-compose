import  { useState, useEffect } from 'react'
import axios from 'axios'
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5500/api/products');
        console.log(data.data);
        setProducts(data.data)

      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <h1>My Products</h1>
      {products.map((product) => {
                return (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>
                );
            })}
    </div>
  );
}

export default App;
