import type React from "react"
import Image from "next/image"
import Layout from "../components/Layout"
import { fetchAPI } from "../lib/api"

interface HomeProps {
  hero: {
    title: string
    subtitle: string
    image: {
      url: string
    }
  }
}

const Home: React.FC<HomeProps> = ({ hero }) => {
  return (
    <Layout>
      <div className="relative h-[80vh]">
        <Image
          src={hero.image.url || "/placeholder.svg"}
          alt={hero.title}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start p-8">
          <h1 className="text-6xl font-bold mb-4">{hero.title}</h1>
          <p className="text-xl mb-8">{hero.subtitle}</p>
          <button className="bg-cyan-500 text-white px-6 py-2 rounded">SEPA MAS</button>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const heroData = await fetchAPI("/hero")
  return {
    props: {
      hero: heroData,
    },
    revalidate: 60,
  }
}

export default Home

