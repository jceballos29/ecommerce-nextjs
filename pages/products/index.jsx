/** @format */

import Link from 'next/link';
import {database} from '../../config/firebase'
import { collection, getDocs } from 'firebase/firestore'

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

export async function getStaticProps(context) {
  
  // console.log('Index getStaticProps: ', context);
  // const res = await fetch('http://localhost:3000/api/products');
  // const products = await res.json();

  const col = collection(database, 'products')
  const docs = await getDocs(col)
  const products = []
  docs.forEach(doc => {
    products.push({...doc.data(), id: doc.id})
  })


  return {
    props: {
      products,
    },
  };
}

const Products = ({ products }) => {
  
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
