export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://mern-3-digitalpathshala.onrender.com";

export const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_BASE_URL}/${image}`;
};
