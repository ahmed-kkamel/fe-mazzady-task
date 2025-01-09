"use client"
import CategorySelect from "./CategorySelect";
import SubcategorySelect from "./SubcategorySelect";
import PropertySelect from "./PropertySelect";
import SubmitButton from "./SubmitButton";
import SubmittedData from "./SubmittedData";
import { useCategoriesForm } from "@/hooks/useCategoriesForm";

const CategoriesForm = ({ categories }: { categories: any[] }) => {
    const {
        formData,
        submittedData,
        categoryOptions,
        subcategoryOptions,
        handleOptionChange,
        setFormData,
        handleSubmit,
        handleCategoryChange,
        handleSubcategoryChange
    } = useCategoriesForm(categories);

    return (
        <div className="p-6 max-w-xl mx-auto bg-gradient-to-r from-indigo-50 via-white to-indigo-100 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Categories Form</h2>
            {submittedData ? (
                <SubmittedData submittedData={submittedData} categories={categories} />
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <CategorySelect formData={formData} categoryOptions={categoryOptions} handleCategoryChange={handleCategoryChange} />
                    {formData.categoryId && <SubcategorySelect formData={formData} subcategoryOptions={subcategoryOptions} handleSubcategoryChange={handleSubcategoryChange} />}
                    {formData.subcategoryId && <PropertySelect formData={formData} handleOptionChange={handleOptionChange} setFormData={setFormData} />}
                    <SubmitButton />
                </form>
            )}
        </div>
    );
};

export default CategoriesForm;
