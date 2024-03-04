"use client"

interface IPageProps {
  params: {
    id: string
  }
}

const ProductDetail = (props: IPageProps) => {
  const { params: { id } } = props
  return (
    <div>{id}</div>
  )
}

export default ProductDetail