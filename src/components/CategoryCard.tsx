import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonDress,
  faTShirt,
  faHatCowboy,
  faShoePrints,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Define motion variants as constants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 10,
      staggerChildren: 0.3,
    },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Define categories with icons and labels
const categoriesMap = {
  Women: [
    { icon: faPersonDress, label: "Dresses" },
    { icon: faTShirt, label: "Tops" },
    { icon: faPerson, label: "Bottoms" },
    { icon: faHatCowboy, label: "Accessories" },
    { icon: faShoePrints, label: "Footwear" },
  ],
  Men: [
    { icon: faTShirt, label: "Shirts" },
    { icon: faPerson, label: "Pants" },
    { icon: faHatCowboy, label: "Hats" },
    { icon: faShoePrints, label: "Shoes" },
  ],
  Kids: [
    { icon: faTShirt, label: "T-Shirts" },
    { icon: faPerson, label: "Pants" },
    { icon: faHatCowboy, label: "Hats" },
    { icon: faShoePrints, label: "Shoes" },
  ],
};

// Reusable Button component
const CategoryButton = ({ icon, label }) => (
  <Button variant="link" className="text-white text-sm">
    <FontAwesomeIcon
      icon={icon}
      className="mr-2"
      style={{ fontSize: "1.5rem" }}
    />
    {label}
  </Button>
);

// Reusable ProductCategoryCard component
const CategoryCard = ({ title, imageUrl }) => {
  const categories = categoriesMap[title] || [];

  return (
    <motion.div
      className="main relative border rounded-xl w-72 h-[14em] bg-cover p-3"
      style={{ backgroundImage: `url(${imageUrl})` }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-[95%] box-border bottom-0 left-2 right-2 bg-stone-950 rounded-xl backdrop-blur-md bg-opacity-30 overflow-hidden"
        initial={{ position: "absolute", height: "4em", bottom: "5%" }}
        whileHover={{
          position: "absolute",
          height: "12.5em",
          top: "5%",
          bottom: "0%",
        }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
      >
        <motion.div
          className="w-full h-[fit-content] p-4"
          variants={buttonContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-3">{title}</h1>
            <motion.div className="grid grid-cols-2 gap-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              >
              {categories.map((category, index) => (
                <CategoryButton
                  key={index}
                  icon={category.icon}
                  label={category.label}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CategoryCard;
