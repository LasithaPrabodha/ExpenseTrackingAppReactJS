import React, { useEffect, useState } from "react";

import { CategoryRow } from "../components/CategoryRow";
import { Category } from "../models/category";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";

import "./CategoriesScreen.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addCategoryAction, fetchCategoriesAction } from "../redux/actions/categoryActions";
import { allCategoriesSelector } from "../redux/selectors";

export const CategoriesScreen = (): JSX.Element => {
  const categories: Category[] = useSelector(allCategoriesSelector);
  const dispatch = useDispatch<AppDispatch>();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#0a84ff");
  const [newName, setNewName] = useState("");

  const onSelectColor = (hex: string) => {
    setSelectedColor(hex);
  };

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const createCategory = () => {
    if (newName.length === 0) {
      return;
    }

    const category = new Category({
      name: newName,
      color: selectedColor,
    });
    dispatch(addCategoryAction(category));
    setNewName("");
    setSelectedColor("#0a84ff");
  };

  return (
    <div className="page categories">
      <div className="scroll-view">
        <div className="categories-wrapper">
          {categories.map(({ id, color, name }) => (
            <CategoryRow key={id} color={color} name={name} />
          ))}
        </div>
      </div>
      <div className="new-category-wrapper">
        <a onClick={() => setShowColorPicker(!showColorPicker)}>
          <div className="category-color" style={{ backgroundColor: selectedColor }} />
        </a>
        <input
          placeholder="Category name"
          onChange={(event) => setNewName(event.target.value)}
          value={newName}
          className="new-category-input"
        />
        <a onClick={createCategory} className="btn-add">
          <FontAwesomeIcon icon={faPlus} />
        </a>
      </div>
    </div>
  );
};
