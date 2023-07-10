'use client'
import {useState, useEffect} from 'react'


export function useError() {
  const [error, setError] = useState<string>("")
  
  useEffect(() => {
    let t = setTimeout(() => {
      setError("")
    }, 3000);
  
    return () => {
      clearTimeout(t)
    }
  }, [error])
  
  return {error, setError}
  
}