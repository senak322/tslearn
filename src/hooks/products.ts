import { useState, useEffect } from 'react';
import axios, {AxiosError} from 'axios';
import { IProduct } from '../models';

export function useProducts() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    function addProduct(product: IProduct) {
      setProducts(prev => [...prev, product])
    }
  
    async function fetchProduct() {
      try {
        setLoading(true)
        const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products?limit=5')
        setProducts(response.data)
        setLoading(false)
      } catch (e: unknown) {
        const error = e as AxiosError
        setLoading(false)
        setError(error.message)
      }
  
    }
  
    useEffect(() => {
      fetchProduct()
    }, [])

    return {
        products, loading, error, addProduct
    }
}