// Email validation (basic — backend will enforce real rules)
export const validateEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};


// Password validation (enforce minimum rules)
export const validatePassword = (password) => {
  if (!password) return false;

  // At least 8 chars, must contain:
  // → one letter
  // → one number
  // → one special character (non-alphanumeric)
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  return re.test(password);
};


// Sanitize ONLY text fields — NOT passwords
export const sanitize = (value) => {
  if (typeof value !== "string") return "";
  return value.trim();
};