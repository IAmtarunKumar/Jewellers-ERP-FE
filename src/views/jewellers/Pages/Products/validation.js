// Validate individual fields
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "type":
      return !value ? "Type is required" : "";
    case "purity":
      return !value ? "Purity is required" : "";
    case "weight":
      return !value || value <= 0 ? "Weight is required" : "";
    case "design":
      return !value ? "Design is required" : "";
    case "gemStones":
      return !value ? "Gemstone is required" : "";
    case "material":
      return !value ? "Material is required" : "";
    case "productName":
      return !value ? "Product Name is required" : "";
    case "sku":
      return !value ? "SKU is required" : "";
    // case "imageURL":
    //   return !value ? "Image Url is required" : "";
    case "price":
      return !value || value <= 0 ? "Price is required" : "";
    case "size":
      return !value ? "Size is required" : "";
    case "initialStock":
      return !value || value <= 0 ? "Stock is required" : "";
    case "description":
      return !value ? "Description is required" : "";

    default:
      return "";
  }
};

export const validateProduct = (product) => {
  const errors = {};

  if (!product) {
    return {
      type: "Type is required",
      purity: "Purity is required",
      weight: "Weight is required",
      design: "Design is required",
      gemStones: "Gemstone is required",
      material: "Material is required",
      productName: "Product Name is required",
      sku: "Sku is required",
      //   imageURL: "Image is required",
      price: "Price is required",
      size: "Size is required",
      initialStock: "Stock is required",
      description: "Description is required",
    };
  }

  if (!product.type) errors.type = "Type is required";
  if (!product.purity) errors.purity = "Purity is required";
  if (!product.weight || product.weight <= 0)
    errors.weight = "Weight is required";
  if (!product.design) errors.design = "Design is required";
  if (!product.gemStones) errors.gemStones = "Gemstone is required";
  if (!product.material) errors.material = "Material is required";
  if (!product.productName) errors.productName = "Product Name is required";
  if (!product.sku) errors.sku = "SKU is required";
  //   if (!product.imageURL) errors.imageURL = "Image URl is required";
  if (!product.price || product.price <= 0) errors.price = "Price is required";
  if (!product.size) errors.size = "Size is required";
  if (!product.initialStock || product.initialStock <= 0)
    errors.initialStock = "Stock is required";
  if (!product.description) errors.description = "Description is required";

  return errors;
};
export const validateEditField = (fieldName, value) => {
  switch (fieldName) {
    case "type":
      return !value ? "Type is required" : "";
    case "purity":
      return !value ? "Purity is required" : "";
    case "weight":
      return !value || value <= 0 ? "Weight is required" : "";
    case "design":
      return !value ? "Design is required" : "";
    case "gemStones":
      return !value ? "Gemstone is required" : "";
    case "material":
      return !value ? "Material is required" : "";
    case "productName":
      return !value ? "Product Name is required" : "";
    case "sku":
      return !value ? "SKU is required" : "";
    // case "imageURL":
    //   return !value ? "Image Url is required" : "";
    case "price":
      return !value || value <= 0 ? "Price is required" : "";
    case "size":
      return !value ? "Size is required" : "";
    case "currentStock":
      return !value || value <= 0 ? "Stock is required" : "";
    case "description":
      return !value ? "Description is required" : "";

    default:
      return "";
  }
};

export const validateEditProduct = (product) => {
  const errors = {};

  if (!product) {
    return {
      type: "Type is required",
      purity: "Purity is required",
      weight: "Weight is required",
      design: "Design is required",
      gemStones: "Gemstone is required",
      material: "Material is required",
      productName: "Product Name is required",
      sku: "Sku is required",
      //   imageURL: "Image is required",
      price: "Price is required",
      size: "Size is required",
      currentStock: "Stock is required",
      description: "Description is required",
    };
  }

  if (!product.type) errors.type = "Type is required";
  if (!product.purity) errors.purity = "Purity is required";
  if (!product.weight || product.weight <= 0)
    errors.weight = "Weight is required";
  if (!product.design) errors.design = "Design is required";
  if (!product.gemStones) errors.gemStones = "Gemstone is required";
  if (!product.material) errors.material = "Material is required";
  if (!product.productName) errors.productName = "Product Name is required";
  if (!product.sku) errors.sku = "SKU is required";
  //   if (!product.imageURL) errors.imageURL = "Image URl is required";
  if (!product.price || product.price <= 0) errors.price = "Price is required";
  if (!product.size) errors.size = "Size is required";
  if (!product.currentStock || product.currentStock <= 0)
    errors.currentStock = "Stock is required";
  if (!product.description) errors.description = "Description is required";

  return errors;
};
