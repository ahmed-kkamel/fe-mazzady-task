"use client";

import CategorySelect from "./CategorySelect";
import SubcategorySelect from "./SubcategorySelect";
import PropertySelect from "./PropertySelect";
import SubmitButton from "./SubmitButton";
import SubmittedData from "./SubmittedData";
import Loader from "./Loader"; // Import the Loader component
import { useCategoriesForm } from "@/hooks/useCategoriesForm";
import { Category } from "@/types/CategoriesFormTypes";

const CategoriesForm = ({ categories }: { categories: Category[] }) => {
    const {
        formData,
        submittedData,
        categoryOptions,
        subcategoryOptions,
        isSubmitDisabled,
        loading,
        handleOptionChange,
        setFormData,
        handleSubmit,
        handleCategoryChange,
        handleSubcategoryChange,
    } = useCategoriesForm(categories);

    return (
        <div className="p-6 max-w-3xl mx-auto bg-gradient-to-r from-indigo-50 via-white to-indigo-100 shadow-lg rounded-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                Categories Form
            </h2>
            {submittedData ? (
                <SubmittedData submittedData={submittedData} categories={categories} />
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <CategorySelect
                        formData={formData}
                        categoryOptions={categoryOptions}
                        handleCategoryChange={handleCategoryChange}
                    />
                    {formData.categoryId && (
                        <SubcategorySelect
                            formData={formData}
                            subcategoryOptions={subcategoryOptions}
                            handleSubcategoryChange={handleSubcategoryChange}
                        />
                    )}
                    {loading && <Loader text="Loading properties..." />}
                    {!loading && formData.subcategoryId && (
                        <PropertySelect
                            formData={formData}
                            handleOptionChange={handleOptionChange}
                            setFormData={setFormData}
                        />
                    )}
                    <SubmitButton isSubmitDisabled={isSubmitDisabled} />
                </form>
            )}
        </div>
    );
};

export default CategoriesForm;
