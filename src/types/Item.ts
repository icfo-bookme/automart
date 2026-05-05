import { Category } from "./category";
import { Specification } from "./specifications";

export type SubCategory = {
  id: number;
  category_id: number;
  name: string;
  created_by: string;
  updated_by: string;
  soft_delete: number;
  created_at: string;
  updated_at: string;
};

export type Item = {
  id: number;
  category_id: number;
  sub_category_id: number;
  brand_id: number;
  section_id: number;
  name: string;
  barcode: string | null;
  length: string | null;
  height: string | null;
  width: string | null;
  regular_price: string;
  minimum_order_quantity: number;
  sales_price: string;
  cost_price: string;
  minimum_price: string;
  thumbnail: string;
  resized_image: string;
  details: string;
  specification_details: string;
  sales_type: "asUsual" | string;
  is_published: boolean;
  car_company_id: number | null;
  car_brand_id: number | null;
  car_model_id: number | null;
  is_outsourced: boolean;
  created_by: string;
  updated_by: string;
  soft_delete: number;
  has_watermark: boolean;
  created_at: string;
  updated_at: string;
  sub_category: SubCategory;
  category: Category;
  yt_video: string | null;
  specifications: Specification[];
};


