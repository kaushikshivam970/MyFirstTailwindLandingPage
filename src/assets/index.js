const images = import.meta.glob("./*.{png,jpg,svg,jpeg}", { eager: true });

const imageMap = Object.fromEntries(
  Object.entries(images).map(([path, module],index) => {
      const fileName = path.replace("./", ""); // Extract filename
    //   const fileName = index; // Extract filename
      return [fileName, module.default]; // Store image path in object
  })
);

export default imageMap;

