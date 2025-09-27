import React from "react";

const BASE_URL = "http://localhost:8000";
const IMAGE_PATH = "/modals";

const ApiImage = ({ src, alt = "", className = "", onClick }) => {
  if (!src) return null;

  // Extract folder prefix before "_"
  const folder = src.split("_")[0]; // e.g., "P16"

  const fullUrl = `${BASE_URL}${IMAGE_PATH}/${folder}/${src}`;

  return <img src={fullUrl} alt={alt} className={className} onClick={onClick} />;
};

export default ApiImage;
