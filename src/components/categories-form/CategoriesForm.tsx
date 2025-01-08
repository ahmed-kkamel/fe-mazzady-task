"use client";
import { useState } from "react";

interface Subcategory {
    id: number;
    name: string;
}
interface Category {
    id: number;
    name: string;
    children: Subcategory[];
}
interface CategoriesFormProps {
    categories: Category[];
}

export default function CategoriesForm({ categories }: CategoriesFormProps) {
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = parseInt(e.target.value);
        const category = categories.find((cat) => cat.id === categoryId);
        setSubcategories(category?.children || []);
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Categories</label>
                    <select
                        onChange={handleCategoryChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Subcategories</label>
                    <select
                        disabled={!subcategories.length}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="">{subcategories.length ? 'Select a subcategory' : 'No subcategories available'}</option>
                        {subcategories.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
}
