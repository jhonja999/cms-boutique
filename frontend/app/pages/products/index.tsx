import type React from "react"
import Link from "next/link"
import Layout from "../../../components/Layout"
import { fetchAPI } from "@/lib/api"

interface Category {
  id: number
  name: string
  slug: string
}

interface ProductsProps {
  categories: Category[]
}

const Products: React.FC<ProductsProps> = ({ categories }) => {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products/${category.slug}`}
            className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
            <p className="text-gray-400">View products →</p>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const categoriesData = await fetchAPI("/categories")
  return {
    props: {
      categories: categoriesData,
    },
    revalidate: 60,
  }
}

export default Products

