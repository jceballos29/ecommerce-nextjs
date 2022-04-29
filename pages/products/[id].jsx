// import { useRouter } from 'next/router'
import React from 'react'

// export async function getServerSideProps(context){
//   console.log(context)
//   return {
//     props: {
//       id: context.params.id,
//       name: context.params.name,
//     }
//   }
// }

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/products')
  const products = await res.json()
  const paths = products.map(product => ({
    params: {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price
    }
  }))
  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params }) {

  console.log('getStaticProps',params)
  return {
    props: {
      product: {
        id: params.id,
        name: 'Nombre',
      }
    }
  }  

}


const Product = ({product}) => {
  console.log('Product',product)
  // const router = useRouter()
  // const { name, description, price } = router.query
  
  return (
    <div>
      <h1>{product.id}</h1>
      
    </div>
  )
}

export default Product
