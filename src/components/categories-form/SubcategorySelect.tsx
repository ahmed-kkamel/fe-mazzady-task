
const SubcategorySelect = ({ formData, subcategoryOptions, handleSubcategoryChange }:
    { formData: any, subcategoryOptions: any, handleSubcategoryChange: any }
) => {

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Subcategories</label>
            <select
                onChange={handleSubcategoryChange}
                value={formData.subcategoryId || ""}
                className="mt-1 block w-full rounded border border-gray-300 shadow-sm p-2 focus:border-blue-800 focus:outline-none"
            >
                <option value="">Select a subcategory</option>
                {subcategoryOptions.map((option: any) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SubcategorySelect;
