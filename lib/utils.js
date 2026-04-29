export const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return value.split(",").map((v) => v.trim()).filter(Boolean);
};
