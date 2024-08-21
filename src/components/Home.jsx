import React from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import Statistics from './Statistics'
import News from './News'



const Home = () => {
  return (
    <>
      <h4 className="text-4xl font-bold text-white  mt-10 text-center">Global Crypto Stats</h4>
      <Statistics />
      <News/>
    </>
  )
}

export default Home