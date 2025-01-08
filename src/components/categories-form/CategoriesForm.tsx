"use client";
import { useState } from "react";

interface Option {
    id: number;
    name: string;
    slug: string;
    parent: number;
    child: boolean;
}

interface Property {
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
}

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
    const [properties, setProperties] = useState<Property[]>([]);
    const [otherInputs, setOtherInputs] = useState<Record<number, string>>({});

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = parseInt(e.target.value);
        const category = categories.find((cat) => cat.id === categoryId);
        setSubcategories(category?.children || []);
        setProperties([]);
        setOtherInputs({});
    };

    const handleSubcategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const subcategoryId = parseInt(e.target.value);
        if (!subcategoryId) {
            setProperties([]);
            return;
        }

        try {
            const response = await fetch(`https://staging.mazaady.com/api/v1/properties?cat=${subcategoryId}`, {
                headers: {
                    "private-key": "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16"
                }
            });
            const data = await response.json();
            console.log(data, "data");

            setProperties(data.data || []);
        } catch (error) {
            console.error("Failed to fetch properties:", error);
        }
    };

    const handleOptionChange = (propertyId: number, value: string) => {
        setOtherInputs((prev) => {
            const updated = { ...prev };
            if (value === "other") {
                updated[propertyId] = "";
            } else {
                delete updated[propertyId];
            }
            return updated;
        });
    };

    const handleOtherInputChange = (propertyId: number, value: string) => {
        setOtherInputs((prev) => ({
            ...prev,
            [propertyId]: value,
        }));
    };

    console.log(properties, "properties");

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
                        onChange={handleSubcategoryChange}
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

                {properties.map((property) => (
                    <div key={property.id}>
                        <label className="block text-sm font-medium text-gray-700">{property.name}</label>
                        <select
                            onChange={(e) => handleOptionChange(property.id, e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Select an option</option>
                            {property.options.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                            <option value="other">Other</option>
                        </select>

                        {otherInputs[property.id] !== undefined && (
                            <input
                                type="text"
                                value={otherInputs[property.id]}
                                onChange={(e) => handleOtherInputChange(property.id, e.target.value)}
                                placeholder="Specify other"
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        )}
                    </div>
                ))}
            </form>
        </div>
    );
}
