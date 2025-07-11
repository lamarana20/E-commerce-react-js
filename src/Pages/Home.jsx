import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSeller from '../Components/BestSeller'
import MyPolicy from '../Components/MyPolicy'
import NewLetters from '../Components/NewLetters'



const Home = () => {
  return (
    <div>
     
     <Hero />
     <LatestCollection  />
     <BestSeller />
     <MyPolicy/>
     <NewLetters />
    </div>
  )
}

export default Home
