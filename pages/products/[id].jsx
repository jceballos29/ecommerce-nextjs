// import { useRouter } from 'next/router'
import React from 'react'
import {database} from '../../config/firebase'
import { collection, getDocs } from 'firebase/firestore'

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
  // console.log('getStaticPaths',context)
  // const res = await fetch('http://localhost:3000/api/products')
  // const products = await res.json()

  const col = collection(database, 'products')
  const docs = await getDocs(col)
  const products = []
  docs.forEach(doc => {
    products.push({...doc.data(), id: doc.id})
  })

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

  // console.log('getStaticProps',params)
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
  // console.log('Product',product)
  // const router = useRouter()
  // const { name, description, price } = router.query
  
  return (
    <div>
      <h1>{product.id}</h1>
      
    </div>
  )
}

export default Product
