export interface OrderItem {
  product_id: number;
  barcode?: number | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  price: number;
  cost_price?: number | null;
}

export interface Order {
  id: number;
  first_name: string;
  last_name?: string | null;
  phone_number: string;
  email?: string | null;

  order_code: string;

  country?: string | null;
  district?: string | null;
  city?: string | null;
  thana?: string | null;
  area?: string | null;
  road_no?: string | null;
  flat_no?: string | null;
  car_no?: string | null;

  order_notes?: string | null;
  customer_notes?: string | null;
  remarks?: string | null;

  advance_payment: number;
  discount_amount: number;

  status: number;
  soft_delete: number;
  created_by: number;

  created_at?: string;
  updated_at?: string;

  order_details: OrderItem[];
}