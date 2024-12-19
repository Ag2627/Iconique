export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title", // Assuming it's a simple string for now
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Size",
    name: "size",
    componentType: "select",
    options: [
      { id: "small", label: "S (small)" },
      { id: "medium", label: "M (Medium)" },
      { id: "large", label: "L (Large)" },
      { id: "extralarge", label: "XL (extra large)" },
    ],
  },
  {
    label: "Sustainable",
    name: "sustainable",
    componentType: "select",
    options: [
      { id: "YES", label: "Yes" },  // Updated to boolean true/false to match schema
      { id: "NO", label: "No" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  
  {
    label: "Total Stock",
    name: "quantity",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
  {
    label: "Discount",
    name: "discount",
    componentType: "input",
    type: "text",
    placeholder: "Enter discount (optional)",
  },
  {
    label: "Tagline",
    name: "tagline",
    componentType: "input",
    type: "text",
    placeholder: "Enter product tagline",
  },
 
];
