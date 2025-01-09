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
    selectedOption?: Option | null;
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
    const [formData, setFormData] = useState<{
        category?: string;
        subcategory?: string;
        properties: Property[];
        otherInputs: Record<number, string>;
        childOptions: Record<number, Option[]>;
        selectedChildOptions: Record<number, string>;
    }>({
        properties: [],
        otherInputs: {},
        childOptions: {},
        selectedChildOptions: {}
    });
    const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = parseInt(e.target.value);
        const category = categories.find((cat) => cat.id === categoryId);
        setFormData({
            ...formData,
            category: category?.name || "",
            subcategory: undefined,
            properties: [],
            otherInputs: {},
            childOptions: {},
            selectedChildOptions: {}
        });
    };

    const handleSubcategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const subcategoryId = parseInt(e.target.value);
        const subcategory = formData.category
            ? categories
                .find((cat) => cat.name === formData.category)
                ?.children.find((sub) => sub.id === subcategoryId)
            : null;

        if (!subcategoryId) {
            setFormData((prev) => ({
                ...prev,
                subcategory: undefined,
                properties: []
            }));
            return;
        }

        try {
            const response = await fetch(`https://staging.mazaady.com/api/v1/properties?cat=${subcategoryId}`, {
                headers: {
                    "private-key": "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16"
                }
            });
            const data = await response.json();
            setFormData((prev) => ({
                ...prev,
                subcategory: subcategory?.name || "",
                properties: data.data || []
            }));
        } catch (error) {
            console.error("Failed to fetch properties:", error);
        }
    };

    const handleOptionChange = async (propertyId: number, value: string) => {
        const selectedOption = formData.properties
            .find((property) => property.id === propertyId)
            ?.options.find((option) => option.id === parseInt(value));

        setFormData((prev) => {
            const updatedOtherInputs = { ...prev.otherInputs };
            if (value === "other") {
                updatedOtherInputs[propertyId] = "";
            } else if (updatedOtherInputs[propertyId] !== undefined) {
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
                const response = await fetch(
                    `https://staging.mazaady.com/api/v1/get-options-child/${value}`,
                    {
                        headers: {
                            "private-key": "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16",
                        },
                    }
                );
                const data = await response.json();
                if (data.code === 200) {
                    setFormData((prev) => ({
                        ...prev,
                        childOptions: {
                            ...prev.childOptions,
                            [propertyId]: data.data[0]?.options || [],
                        },
                    }));
                } else {
                    setFormData((prev) => ({
                        ...prev,
                        childOptions: {
                            ...prev.childOptions,
                            [propertyId]: [],
                        },
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch child options:", error);
                setFormData((prev) => ({
                    ...prev,
                    childOptions: {
                        ...prev.childOptions,
                        [propertyId]: [],
                    },
                }));
            }
        }
    };


    const handleChildOptionChange = (propertyId: number, childId: string) => {
        setFormData((prev) => ({
            ...prev,
            selectedChildOptions: {
                ...prev.selectedChildOptions,
                [propertyId]: childId,
            }
        }));
    };

    const handleOtherInputChange = (propertyId: number, value: string) => {
        setFormData((prev) => ({
            ...prev,
            otherInputs: {
                ...prev.otherInputs,
                [propertyId]: value
            }
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedData(formData);
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-gradient-to-r from-indigo-50 via-white to-indigo-100 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Categories Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Categories</label>
                    <select
                        onChange={handleCategoryChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-indigo-500"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {formData.category && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subcategories</label>
                        <select
                            onChange={handleSubcategoryChange}
                            disabled={!formData.category}
                            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-indigo-500"
                        >
                            <option value="">{formData.category ? 'Select a subcategory' : 'No subcategories available'}</option>
                            {categories.find((cat) => cat.name === formData.category)?.children.map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {formData.properties.map((property) => (
                    <div key={property.id}>
                        <label className="block text-sm font-medium text-gray-700">{property.name}</label>
                        <select
                            onChange={(e) => handleOptionChange(property.id, e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-indigo-500"
                        >
                            <option value="">Select an option</option>
                            {property.options.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                            <option value="other">Other</option>
                        </select>

                        {formData.childOptions[property.id] && formData.childOptions[property.id].length > 0 && (
                            <div className="mt-2">
                                <label className="block text-sm font-medium text-gray-700">Child Options</label>
                                <select
                                    onChange={(e) => handleChildOptionChange(property.id, e.target.value)}
                                    value={formData.selectedChildOptions[property.id] ?? ""}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring focus:ring-indigo-500"
                                >
                                    <option value="">Select a child option</option>
                                    {formData.childOptions[property.id].map((child) => (
                                        <option key={child.id} value={child.id}>
                                            {child.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {formData.otherInputs[property.id] !== undefined && (
                            <input
                                type="text"
                                value={formData.otherInputs[property.id]}
                                onChange={(e) => handleOtherInputChange(property.id, e.target.value)}
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

            {submittedData && (
                <div className="mt-8 p-4 bg-white rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Submitted Data</h3>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="text-left px-4 py-2 border">Field</th>
                                <th className="text-left px-4 py-2 border">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedData.category && (
                                <tr>
                                    <td className="px-4 py-2 border">Category</td>
                                    <td className="px-4 py-2 border">{submittedData.category}</td>
                                </tr>
                            )}
                            {submittedData.subcategory && (
                                <tr>
                                    <td className="px-4 py-2 border">Subcategory</td>
                                    <td className="px-4 py-2 border">{submittedData.subcategory}</td>
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
                        </tbody>

                    </table>
                </div>
            )}

        </div>
    );
}
