import React from "react";

const CategorySelect = ({ categoryOptions, handleCategoryChange, formData }:
    { categoryOptions: any[], handleCategoryChange: any, formData: any }) => {

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            <select
                onChange={handleCategoryChange}
                value={formData.categoryId || ""}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-indigo-500"
            >
                <option value="">Select a category</option>
                {categoryOptions.map((option: any) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySelect;
