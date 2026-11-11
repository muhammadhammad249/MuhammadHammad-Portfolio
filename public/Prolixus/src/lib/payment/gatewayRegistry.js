/**
 * Gateway Adapter Registry
 *
 * Each adapter must implement:
 *   - name: string                        — must match the API `name` field (case-insensitive)
 *   - ProviderComponent: React component  — wraps children with the payment SDK context
 *   - CheckoutComponent: React component  — renders the payment form UI
 *
 * ProviderComponent receives: { publishableKey, amount, currency, children }
 * CheckoutComponent receives:   { formData, updateFormData, buildGuestOrderPayload, cartItems,
 *                                  currency, onSuccess, onError, loading, setLoading }
 */

import stripeGateway from "./stripeGateway";
import paypalGateway from "./paypalGateway";
import unsupportedGateway from "./unsupportedGateway";

const adapters = new Map();

function registerAdapter(adapter) {
    adapters.set(adapter.name.toLowerCase(), adapter);
}

/**
 * Look up the gateway adapter by name.
 * Returns the unsupported gateway fallback if no adapter is registered.
 */
export function getAdapter(name) {
    if (!name) return unsupportedGateway;
    return adapters.get(name.toLowerCase()) || unsupportedGateway;
}

// Register built-in adapters
registerAdapter(stripeGateway);
registerAdapter(paypalGateway);

/**
 * Allows consumers to register additional adapters at runtime.
 * Example:  registerGateway(moyasarGateway);
 */
export { registerAdapter as registerGateway };
