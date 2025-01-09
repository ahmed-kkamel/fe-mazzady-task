import React, { memo } from "react";
import { FormData, CategoryOption } from "@/types/CategoriesFormTypes";

const CategorySelect = ({
    categoryOptions,
    handleCategoryChange,
    formData,
}: {
    categoryOptions: CategoryOption[];
    handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    formData: FormData;
}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            <select
                onChange={handleCategoryChange}
                value={formData.categoryId || ""}
                className="mt-1 block w-full rounded border border-gray-300 shadow-sm p-2 focus:border-blue-800 focus:outline-none"
            >
                <option value="">Select a category</option>
                {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

const areEqual = (
    prevProps: {
        categoryOptions: CategoryOption[];
        handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        formData: FormData;
    },
    nextProps: {
        categoryOptions: CategoryOption[];
        handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        formData: FormData;
    }
) => {
    return (
        prevProps.categoryOptions === nextProps.categoryOptions &&
        prevProps.handleCategoryChange === nextProps.handleCategoryChange &&
        prevProps.formData === nextProps.formData
    );
};

export default memo(CategorySelect, areEqual);
