import CategoriesForm from "@/components/categories-form/CategoriesForm";
import { fetchCategories } from "@/utils/api/api";
import { Category } from "@/types/CategoriesFormTypes"


export default async function Page() {

    const data = await fetchCategories()
    const categories: Category[] = data.data.categories;

    return (
        <main className="min-h-screen bg-gray-100 p-6">
            <CategoriesForm categories={categories} />
        </main>
    );
}
