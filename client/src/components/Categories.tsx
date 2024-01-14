import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectCategories, setCutegoriesId } from "../redux/slices/categoriesSlice";

const Categories: React.FC = () => {
  const dispatch = useDispatch();

  const { categories, categoriesId } = useSelector(selectCategories);

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index: number) => (
          <li
            key={index}
            onClick={() => dispatch(setCutegoriesId(index))}
            className={categoriesId === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
