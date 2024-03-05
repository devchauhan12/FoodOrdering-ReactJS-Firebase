import React from 'react'
import { useSelector } from 'react-redux'

const Products = () => {
  const products = useSelector((state) => state.products)
  return (
    <div>Products {console.log(products)}</div>
  )
}

export default Products