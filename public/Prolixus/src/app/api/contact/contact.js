import { apiService } from "@/lib/api";

export async function submitContactForm(payload) {
  try {
    const response = await apiService.postGuest("/Configuration/contact-us", payload);
    return response;
  } catch (error) {
    console.error("Contact API Error:", error);
    throw error;
  }
}
