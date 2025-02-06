import type React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import Layout from "../../../components/Layout"
import { fetchAPI } from "@/lib/api"

interface ProductAttributes {
  name: string
  description: string
  price: number
  image: {
    data: {
      attributes: {
        url: string
      }
    } | null
  }
  features: string[]
}

interface Product {
  id: number
  attributes: ProductAttributes
}

interface ProductDetailProps {
  product: Product | null
  error?: string
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, error }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="text-red-500">{error}</div>
      </Layout>
    )
  }

  if (!product) {
    return (
      <Layout>
        <div>Product not found</div>
      </Layout>
    )
  }

  const { name, description, price, image, features } = product.attributes

  return (
    <Layout>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {image?.data && (
            <Image
              src={image.data.attributes.url || "/placeholder.svg"}
              alt={name}
              width={500}
              height={500}
              className="rounded-lg"
            />
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{name}</h1>
          <p className="text-xl mb-4">${price?.toFixed(2) || "Price not available"}</p>
          <p className="mb-6">{description}</p>
          {features && features.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-2">Features</h2>
              <ul className="list-disc list-inside mb-6">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}
          <button className="bg-cyan-500 text-white px-6 py-2 rounded">Add to Cart</button>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  try {
    const productsData = await fetchAPI("/products")
    const paths = productsData.map((product: Product) => ({
      params: { slug: product.id.toString() },
    }))
    return { paths, fallback: true }
  } catch (error) {
    console.error("Error in getStaticPaths:", error)
    return { paths: [], fallback: true }
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const productData = await fetchAPI(`/products/${params.slug}`)
    if (!productData) {
      return { notFound: true }
    }
    return {
      props: { product: productData },
      revalidate: 60,
    }
  } catch (error) {
    console.error("Error in getStaticProps:", error)
    return { props: { product: null, error: "Failed to fetch product data" } }
  }
}

export default ProductDetail

