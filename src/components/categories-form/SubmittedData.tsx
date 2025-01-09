
const SubmittedData = ({ submittedData, categories }: { submittedData: any; categories: any[] }) => (
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
                                ?.children.find((sub: any) => sub.id === submittedData.subcategoryId)?.name || "Unknown"}
                        </td>
                    </tr>
                )}
                {submittedData.properties.map((property: any) => {
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
                        (option: any) => option.id.toString() === childOptionId
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
);

export default SubmittedData;
