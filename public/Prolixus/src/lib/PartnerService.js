import { apiService } from "@/lib/api";

const WALLET_ENDPOINT = "/Dashboard/customer-wallet";

/**
 * Fetch the customer wallet data including affiliate info and transaction history.
 * GET /api/Dashboard/customer-wallet
 */
export async function getWalletData() {
    return apiService.get(WALLET_ENDPOINT);
}
