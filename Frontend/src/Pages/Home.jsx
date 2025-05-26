/* eslint-disable react/prop-types */
import Collections from "../Component/Collection/Collections"
import Hero from "../Component/Hero/Hero"



const Home = ({ banner }) => {
  return (
    <>
      <Hero banner={banner} />
      <Collections />
    </>
  )
}

export default Home