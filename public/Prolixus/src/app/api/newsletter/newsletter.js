import { apiService } from "@/lib/api";

/**
 * Subscribes an email to the newsletter.
 * @param {string} email - The email address to subscribe.
 * @returns {Promise<Object|null>} - The API response or null on error.
 */
export async function subscribeNewsletter(email) {
  try {
    const response = await apiService.postGuest("/Configuration/newsletter-emails/subscribe", {
      email: email,
    });

    return response;
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);
    throw error;
  }
}
