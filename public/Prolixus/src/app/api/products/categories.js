// const categories = [
//   {
//     label: "Skincare",
//     children: ["Cleansers", "Serums", "Moisturizers", "Masks"],
//   },
//   {
//     label: "Haircare",
//   },
//   {
//     label: "Body & Bath",
//   },
// ];

// export default categories;


import { apiService } from "@/lib/api";

export default async function categories() {
  try {
    const response = await apiService.get("/Configuration/categories", {});


    if (!response?.success) return [];

    return response.data.map((cat) => ({
      id: cat.categoryId || cat.id,
      label: cat.name,
      children: cat.subCategories?.map((s) => ({
        id: s.categoryId || s.id,
        label: s.name
      })) || [],
    }));
  } catch (error) {
    console.error("Categories API Error:", error);
    return [];
  }
}
