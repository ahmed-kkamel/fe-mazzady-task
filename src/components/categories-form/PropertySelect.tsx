import Select from "react-select";
import { Property, FormData } from "@/types/CategoriesFormTypes";

const PropertySelect = ({
    formData,
    handleOptionChange,
    setFormData,
}: {
    formData: FormData;
    handleOptionChange: (propertyId: number, value: string) => void;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) => {
    console.log(formData.properties, "Ahmed");

    return (
        <>
            {formData.properties.map((property: Property) => (
                <div key={property.id}>
                    <label className="block text-sm font-medium text-gray-700">
                        {property.name}
                    </label>
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
                                setFormData((prev: FormData) => ({
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
                    {formData.childOptions[property.id] &&
                        formData.childOptions[property.id].length > 0 && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    {`${property.name} Child Options`}
                                </label>
                                <Select
                                    options={formData.childOptions[property.id].map((option) => ({
                                        value: option.id.toString(),
                                        label: option.name,
                                    }))}
                                    onChange={(selectedOption) =>
                                        setFormData((prev: FormData) => ({
                                            ...prev,
                                            selectedChildOptions: {
                                                ...prev.selectedChildOptions,
                                                [property.id]: selectedOption?.value || "",
                                            },
                                        }))
                                    }
                                    placeholder={`Select a ${property.name} child option`}
                                    className="mt-1"
                                />
                            </div>
                        )}
                </div>
            ))}
        </>
    );
};

export default PropertySelect;
