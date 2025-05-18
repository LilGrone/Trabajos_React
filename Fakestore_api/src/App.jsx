import { useState, useEffect } from 'react';
import './App.css';
import Pcard from './Component/Card.jsx';
import Barra from './Component/NavBar.jsx';

const App = () => {
  const [Product, setProduct] = useState([]);
  const [modal, setModal] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const categories = Product.reduce((acc, prod) => {
    acc[prod.category] = acc[prod.category] || [];
    acc[prod.category].push(prod);
    return acc;
  }, {});

  const handleSearch = (query) => {
    const found = Product.find(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    if (found) {
      setModal({ type: 'product', data: found });
    } else {
      setModal({ type: 'message', data: { title: "Producto no encontrado" } });
    }
  };

  const handleShowCategories = () => {
    setModal({ type: 'categories', data: categories });
  };

  const handleShowCart = () => {
    setModal({ type: 'cart', data: cart });
  };

  const closeModal = () => setModal(null);

  const addToCart = (product) => {
    setCart(prevCart => {
      const found = prevCart.find(item => item.id === product.id);
      if (found) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCart(prevCart => {
      const found = prevCart.find(item => item.id === product.id);
      if (found && found.cantidad > 1) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== product.id);
      }
    });
  };

  return (
    <>
      <Barra
        onSearch={handleSearch}
        onShowCategories={handleShowCategories}
        onShowCart={handleShowCart}
      />
      <div className='card'>
        <Pcard
          Product={Product}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cart={cart}
        />
      </div>
      {modal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={closeModal}>X</button>
            {modal.type === 'product' && (
              <>
                {modal.data.image && <img src={modal.data.image} alt={modal.data.title} style={{maxWidth: 100}} />}
                <h2>{modal.data.title}</h2>
                {modal.data.price && <p>Precio: ${modal.data.price}</p>}
                {modal.data.description && <p>{modal.data.description}</p>}
              </>
            )}
            {modal.type === 'categories' && (
              <>
                <h2>Categorías</h2>
                {Object.entries(modal.data).map(([cat, prods]) => (
                  <div key={cat}>
                    <h3>{cat}</h3>
                    <ul>
                      {prods.map(prod => (
                        <li key={prod.id}>{prod.title}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
            {modal.type === 'cart' && (
              <>
                <h2>Carrito de compras</h2>
                {modal.data.length === 0 ? (
                  <p>El carrito está vacío.</p>
                ) : (
                  <ul>
                    {modal.data.map((prod, idx) => (
                      <li key={idx}>
                        {prod.title} - ${prod.price} x {prod.cantidad}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
            {modal.type === 'message' && (
              <h2>{modal.data.title}</h2>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default App;