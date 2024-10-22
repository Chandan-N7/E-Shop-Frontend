import React from 'react'
import HomeNav from './HomeNav/HomeNav'
import HomeRoute from './HomeRoute'
import { Route, Routes } from 'react-router-dom'

const Homepage = () => {
  return (
    <div>
        <HomeNav/>
        <HomeRoute/>
    </div>
  )
}

export default Homepage
