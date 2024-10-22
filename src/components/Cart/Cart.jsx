import React, { useEffect } from 'react'
import ProductCart from '../../Pages/CartPage/ProductCart'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const userInfo = useSelector(state=>state.user.user)
  const navigate = useNavigate();
  console.log(userInfo)
  useEffect(()=>{
    if(!userInfo || !userInfo.verified){
      navigate('/auth')
    }
  },[userInfo, navigate])
  return (
    <div className='min-h-[85vh]'>
      <ProductCart/>
    </div>
  )
}

export default Cart
