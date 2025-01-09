import CategoriesForm from "@/components/categories-form/CategoriesForm";

interface Subcategory {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    children: Subcategory[];
}

export default async function Page() {
    const response = await fetch('https://staging.mazaady.com/api/v1/get_all_cats', {
        headers: {
            "private-key": "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16"
        }
    });
    const data = await response.json();
    const categories: Category[] = data.data.categories;



    return (
        <main className="min-h-screen bg-gray-100 p-6">
            {/* <h1 className="text-center text-2xl font-bold mb-6">Category Selector</h1> */}
            <CategoriesForm categories={categories} />
        </main>
    );
}
