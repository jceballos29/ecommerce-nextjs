/** @format */

import Link from 'next/link';

// export async function getServerSideProps() {
//   const res = await fetch('http://localhost:3000/api/products');
//   const products = await res.json();
//   return {
//     props: {
//       products
//     },
//   };
// }

/// Static Side Generation

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/products');
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}

const Products = ({ products }) => {
  console.log(products);

  return (
    <div>
      <Link href='/'>Home</Link>
      <h1>Productos</h1>

      {products.map((product) => (
        <article key={product.id}>
          <h2>
            <Link
              href='/products/[id]'
              as={`/products/${product.id}`}>
              {product.name}
            </Link>
          </h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </article>
      ))}
    </div>
  );
};

export default Products;
