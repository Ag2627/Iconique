export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
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
        name: "Size",
        componentType: "select",
        options: [
            { id: "small", label: "S (small)" },
            { id: "medium", label: "M (Medium)" },
            { id: "large", label: "L (Large)" },
            { id: "extralarge", label: "XL (extra large)" }
          ],
    },
    {
      label: "Sustainable",
      name: "Sustainable",
      componentType: "select",
      options: [
        { id: "yes", label: "YES" },
        { id: "no", label: "NO" },
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
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];
  
  