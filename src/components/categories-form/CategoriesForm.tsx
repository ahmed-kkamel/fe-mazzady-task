"use client";
import { useState, useMemo, useCallback } from "react";
import Select from "react-select";
import { fetchProperties, fetchChildOptions } from "@/utils/api/api"
import { Option, Property, CategoriesFormProps } from "@/types/CategoriesFormTypes"


export default function CategoriesForm({ categories }: CategoriesFormProps) {
    const [formData, setFormData] = useState<{
        categoryId?: number;
        subcategoryId?: number;
        properties: Property[];
        otherInputs: Record<number, string>;
        childOptions: Record<number, Option[]>;
        selectedChildOptions: Record<number, string>;
    }>({
        properties: [],
        otherInputs: {},
        childOptions: {},
        selectedChildOptions: {},
    });
    const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

    const handleCategoryChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const categoryId = parseInt(e.target.value);
            setFormData({
                categoryId,
                subcategoryId: undefined,
                properties: [],
                otherInputs: {},
                childOptions: {},
                selectedChildOptions: {},
            });
        },
        []
    );

    const handleSubcategoryChange = useCallback(
        async (e: React.ChangeEvent<HTMLSelectElement>) => {
            const subcategoryId = parseInt(e.target.value);
            setFormData((prev) => ({
                ...prev,
                subcategoryId,
                properties: [],
            }));

            if (!subcategoryId) return;

            try {
                const data = await fetchProperties(subcategoryId);
                setFormData((prev) => ({
                    ...prev,
                    properties: data.data || [],
                }));
            } catch (error) {
                console.error("Failed to fetch properties:", error);
            }
        },
        []
    );

    const handleOptionChange = useCallback(
        async (propertyId: number, value: string) => {
            const selectedOption = formData.properties
                .find((property) => property.id === propertyId)
                ?.options.find((option) => option.id === parseInt(value));

            setFormData((prev) => {
                const updatedOtherInputs = { ...prev.otherInputs };
                if (value === "other") {
                    updatedOtherInputs[propertyId] = "";
                } else {
                    delete updatedOtherInputs[propertyId];
                }

                return {
                    ...prev,
                    properties: prev.properties.map((property) =>
                        property.id === propertyId
                            ? { ...property, selectedOption: selectedOption || null }
                            : property
                    ),
                    otherInputs: updatedOtherInputs,
                };
            });

            if (value !== "other") {
                try {
                    const data = await fetchChildOptions(value);
                    setFormData((prev) => ({
                        ...prev,
                        childOptions: {
                            ...prev.childOptions,
                            [propertyId]: data.data[0]?.options || [],
                        },
                    }));
                } catch (error) {
                    console.error("Failed to fetch child options:", error);
                }
            }
        },
        [formData.properties]
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            setSubmittedData(formData);
        },
        [formData]
    );

    const categoryOptions = useMemo(
        () =>
            categories.map((cat) => ({
                value: cat.id.toString(),
                label: cat.name,
            })),
        [categories]
    );

    const subcategoryOptions = useMemo(() => {
        const category = categories.find((cat) => cat.id === formData.categoryId);
        return category
            ? category.children.map((sub) => ({
                value: sub.id.toString(),
                label: sub.name,
            }))
            : [];
    }, [categories, formData.categoryId]);

    return (
        <div className="p-6 max-w-xl mx-auto bg-gradient-to-r from-indigo-50 via-white to-indigo-100 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Categories Form</h2>
            {submittedData ? (
                <div className="mt-8 p-4 bg-white rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Submitted Data</h3>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Field</th>
                                <th className="px-4 py-2 border">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedData.categoryId && (
                                <tr>
                                    <td className="px-4 py-2 border">Category</td>
                                    <td className="px-4 py-2 border">
                                        {categories.find((cat) => cat.id === submittedData.categoryId)?.name || "Unknown"}
                                    </td>
                                </tr>
                            )}
                            {submittedData.subcategoryId && (
                                <tr>
                                    <td className="px-4 py-2 border">Subcategory</td>
                                    <td className="px-4 py-2 border">
                                        {categories
                                            .find((cat) => cat.id === submittedData.categoryId)
                                            ?.children.find((sub) => sub.id === submittedData.subcategoryId)?.name || "Unknown"}
                                    </td>
                                </tr>
                            )}
                            {submittedData.properties.map((property) => {
                                const selectedOption = property.selectedOption;
                                const otherValue = submittedData.otherInputs[property.id];

                                return (
                                    <tr key={property.id}>
                                        <td className="px-4 py-2 border">{property.name}</td>
                                        <td className="px-4 py-2 border">
                                            {otherValue
                                                ? `Other: ${otherValue}`
                                                : selectedOption
                                                    ? `Option: ${selectedOption.name}`
                                                    : "No option selected"}
                                        </td>
                                    </tr>
                                );
                            })}
                            {Object.entries(submittedData.selectedChildOptions).map(([propertyId, childOptionId]) => {
                                const childOption = submittedData.childOptions[parseInt(propertyId)]?.find(
                                    (option) => option.id.toString() === childOptionId
                                );
                                return (
                                    <tr key={propertyId}>
                                        <td className="px-4 py-2 border">Child Option</td>
                                        <td className="px-4 py-2 border">
                                            {childOption ? childOption.name : "No child option selected"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Categories</label>
                        <select
                            onChange={handleCategoryChange}
                            value={formData.categoryId || ""}
                            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-indigo-500"
                        >
                            <option value="">Select a category</option>
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    {formData.categoryId && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Subcategories</label>
                            <select
                                onChange={handleSubcategoryChange}
                                value={formData.subcategoryId || ""}
                                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-indigo-500"
                            >
                                <option value="">Select a subcategory</option>
                                {subcategoryOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {formData.properties.map((property) => (
                        <div key={property.id}>
                            <label className="block text-sm font-medium text-gray-700">{property.name}</label>
                            <Select
                                options={[
                                    ...property.options.map((option) => ({
                                        value: option.id.toString(),
                                        label: option.name,
                                    })),
                                    { value: "other", label: "Other" },
                                ]}
                                onChange={(selectedOption) =>
                                    handleOptionChange(property.id, selectedOption?.value || "")
                                }
                                placeholder="Select an option"
                                className="mt-1"
                            />
                            {formData.otherInputs[property.id] !== undefined && (
                                <input
                                    type="text"
                                    value={formData.otherInputs[property.id]}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            otherInputs: {
                                                ...prev.otherInputs,
                                                [property.id]: e.target.value,
                                            },
                                        }))
                                    }
                                    placeholder="Specify other"
                                    className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring focus:ring-indigo-500"
                                />
                            )}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:ring focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}
