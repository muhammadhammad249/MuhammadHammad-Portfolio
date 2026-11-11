import { apiService } from "@/lib/api";

const PROFILE_ENDPOINT = "/Account/customer";

/**
 * Fetch the current user profile.
 * GET /Account/customer
 */
export async function getProfile() {
    return apiService.get(PROFILE_ENDPOINT);
}

/**
 * Update the user profile.
 * PUT /Account/customer
 * @param {Object} data - The profile fields to update.
 */
export async function updateProfile(data) {
    return apiService.put(PROFILE_ENDPOINT, data);
}

/**
 * Stub: Update user password.
 * PUT /Account/change-password (Replace with actual endpoint if different)
 * @param {Object} data - Contains currentPassword and newPassword, etc.
 */
export async function updatePassword(data) {
    return apiService.put("/Account/change-password", data);
}
