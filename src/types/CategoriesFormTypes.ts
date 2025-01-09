export interface Option {
  id: number;
  name: string;
  slug: string;
  parent: number;
  child: boolean;
}

export interface Property {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  parent: number | null;
  list: boolean;
  type: string | null;
  value: string;
  other_value: string | null;
  options: Option[];
  selectedOption?: Option | null;
}

export interface Subcategory {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  children: Subcategory[];
}

export interface CategoriesFormProps {
  categories: Category[];
}
export interface CategoryOption {
  value: string;
  label: string;
}

export interface SubcategoryOption {
  value: string;
  label: string;
}

export interface FormData {
  categoryId?: number;
  subcategoryId?: number;
  properties: Property[];
  otherInputs: Record<number, string>;
  childOptions: Record<number, Option[]>;
  selectedChildOptions: Record<number, string>;
}
