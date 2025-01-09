import { useState, useMemo, useCallback } from "react";
import { fetchProperties, fetchChildOptions } from "@/utils/api/api";
import { FormData } from "@/types/CategoriesFormTypes";

export const useCategoriesForm = (categories: any[]) => {
  const [formData, setFormData] = useState<FormData>({
    properties: [],
    otherInputs: {},
    childOptions: {},
    selectedChildOptions: {},
  });
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(
    null
  );

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

  const handleOptionChange = async (propertyId: number, value: string) => {
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
  };

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
      ? category.children.map((sub: any) => ({
          value: sub.id.toString(),
          label: sub.name,
        }))
      : [];
  }, [categories, formData.categoryId]);

  return {
    formData,
    setFormData,
    submittedData,
    categoryOptions,
    subcategoryOptions,
    handleCategoryChange,
    handleSubcategoryChange,
    handleOptionChange,
    handleSubmit,
  };
};
