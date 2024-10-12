import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { businessId, productId } = useParams(); // Obtener los parámetros de la URL

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simular llamada a la API para obtener los datos del producto usando productId
    fetchProductDetails(productId);
  }, [productId]);

  const fetchProductDetails = (id) => {
    // Aquí llamarías a tu API para obtener los detalles del producto
    console.log(`Fetching details for product: ${id} in business: ${businessId}`);
    // setProduct(response);
  };

  return (
    <div>
      <h1>Editando producto {productId} del negocio {businessId}</h1>
      {/* Formulario para editar el producto */}
    </div>
  );
};

export default EditProduct;
