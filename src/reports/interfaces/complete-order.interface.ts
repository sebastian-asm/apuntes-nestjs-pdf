export interface CompleteOrder {
  order_id: number
  customer_id: number
  order_date: Date
  customers: Customers
  order_details: OrderDetail[]
}

interface Customers {
  customer_id: number
  customer_name: string
  contact_name: string
  address: string
  city: string
  postal_code: string
  country: string
}

interface OrderDetail {
  order_detail_id: number
  order_id: number
  product_id: number
  quantity: number
  products: Products
}

interface Products {
  product_id: number
  product_name: string
  category_id: number
  unit: string
  price: string
}
