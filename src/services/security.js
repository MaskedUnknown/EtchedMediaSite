/**
 * Low-Level Client-Side Security & Validation Service
 */

// 1. Sanitize text to block basic HTML injection / Cross-Site Scripting (XSS)
export const sanitizeInput = (text) => {
    if (typeof text !== 'string') return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
};

// 2. Origin Check (Ensures payment/critical widgets only proceed on your allowed domain)
export const isSecureOrigin = () => {
    const allowedOrigins = ['localhost', 'yourdomain.com']; // Update with your actual domain later
    const currentHostname = window.location.hostname;

    return allowedOrigins.includes(currentHostname);
};

// 3. Simple Integrity Logger
export const logSecurityAudit = (actionName) => {
    const timestamp = new Date().toISOString();
    // In production, you could pipe this to a light telemetry service
    console.log(`[Security Audit] Action: ${actionName} verified at ${timestamp}`);
};
