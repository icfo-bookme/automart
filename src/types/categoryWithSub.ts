export interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  created_by: string;
  updated_by: string;
  soft_delete: number; 
  created_at: string; 
  updated_at: string; 
}

export interface CategoryWithSub {
  id: number;
  name: string;
  priority: number;
  created_by: string;
  updated_by: string;
  soft_delete: number; 
  created_at: string;
  updated_at: string;
  sub_categories: SubCategory[]; 
}
