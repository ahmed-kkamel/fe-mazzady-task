import React, { memo } from "react";
import { FormData, SubcategoryOption } from "@/types/CategoriesFormTypes";


const SubcategorySelect = ({
    formData,
    subcategoryOptions,
    handleSubcategoryChange,
}: {
    formData: FormData;
    subcategoryOptions: SubcategoryOption[];
    handleSubcategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Subcategories</label>
            <select
                onChange={handleSubcategoryChange}
                value={formData.subcategoryId || ""}
                className="mt-1 block w-full rounded border border-gray-300 shadow-sm p-2 focus:border-blue-800 focus:outline-none"
            >
                <option value="">Select a subcategory</option>
                {subcategoryOptions.map((option) => (
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
        formData: FormData;
        subcategoryOptions: SubcategoryOption[];
        handleSubcategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    },
    nextProps: {
        formData: FormData;
        subcategoryOptions: SubcategoryOption[];
        handleSubcategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    }
) => {
    return (
        prevProps.subcategoryOptions === nextProps.subcategoryOptions &&
        prevProps.formData === nextProps.formData &&
        prevProps.handleSubcategoryChange === nextProps.handleSubcategoryChange
    );
};

export default memo(SubcategorySelect, areEqual);
