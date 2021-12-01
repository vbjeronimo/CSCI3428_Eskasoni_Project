import { useState } from "react";
import Category from "./Category";

const CategoryList = ({ categories, setCategoryValue }) => {

  const [categoriesValues, setCategoriesValues] = useState({});

  return (
    <section className="CategoryList">
      <div className="CategoriesContainer">
        {categories.map((category) => (
          <Category key={category.id} category={category} setCategoryValue={setCategoryValue}/>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
