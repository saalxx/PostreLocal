import { useEffect, useState } from "react";

function Form({ token, onLogout }) {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("No estas autenticado");
      return;
    }

    fetch("http://localhost:3000/api/products", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Sesion expirada o token invalido");
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => setError(err.message));

  }, [token]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={onLogout}>Volver al login</button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <p>Cargando productos...</p>;
  }

  const productoActual = products[index];

  return (
    <div>
      <h1>Productos</h1>
      <button onClick={onLogout}>Cerrar sesion</button>
      <hr />
      <p>{index + 1} / {products.length}</p>
      <h3>{productoActual.nombre}</h3>
      <p>Precio: ${productoActual.precio}</p>
      <p>Stock: {productoActual.stock}</p>

      <button onClick={() => setIndex(prev => Math.max(prev - 1, 0))} disabled={index === 0}>
        Anterior
      </button>
      <button onClick={() => setIndex(prev => Math.min(prev + 1, products.length - 1))} disabled={index === products.length - 1}>
        Siguiente
      </button>
    </div>
  );
}

export default Form;