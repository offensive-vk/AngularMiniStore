export enum categories {
  clothings = "Clothings",
  digital = "Digital",
  house = "House",
  gym = "Gym",
}

export const subCategory: { [key: string]: string[] } = {
  [categories.clothings]: ["Male", "Female", "Children", "Bags", "Shoes"],
  [categories.digital]: [
    "Mobile",
    "Laptop",
    "Headphones",
    "Smart-Wathes",
    "Printers",
  ],
  [categories.house]: ["Kitchen", "Bathroom", "Bedroom", "Lavatory", "Yard"],
  [categories.gym]: ["Shoes", "Shorts", "Pants", "Dumbbels", "T-shirts"],
};
