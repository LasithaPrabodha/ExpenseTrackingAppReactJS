import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import { CategoryRow } from "../components/CategoryRow";
import { Category } from "../models/category";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addCategory } from "../redux/categoriesSlice";

import "./CategoriesScreen.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const CategoriesScreen = (): JSX.Element => {
  const categories: Category[] = useSelector((state: RootState) => state.categories.categories);
  const dispatch = useDispatch();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#0a84ff");
  const [newName, setNewName] = useState("");

  const onSelectColor = (hex: string) => {
    setSelectedColor(hex);
  };

  const createCategory = () => {
    if (newName.length === 0) {
      return;
    }

    const category = new Category({
      id: uuid(),
      name: newName,
      color: selectedColor,
    });
    dispatch(addCategory(category));
    setNewName("");
    setSelectedColor("#0a84ff");
  };

  const deleteCategory = () => {};

  return (
    <div className="categories">
      <div className="scrollView">
        <div className="categoriesWrapper">
          {categories.map(({ id, color, name }) => (
            <CategoryRow color={color} name={name} />
          ))}
        </div>
      </div>
      <div className="newCategoryWrapper">
        <a onClick={() => setShowColorPicker(!showColorPicker)}>
          <div className="categoryColor" style={{ backgroundColor: selectedColor }} />
        </a>
        <input
          placeholder="Category name"
          onChange={(event) => setNewName(event.target.value)}
          value={newName}
          className="newCategoryInput"
        />
        <a onClick={createCategory} className="sendButton">
          <FontAwesomeIcon icon={faPlus}  />
        </a>
      </div>

      {/* <Modal
        transparent
        visible={showColorPicker}
        animationType="fade"
        onRequestClose={() => setShowColorPicker(false)}
      >
        <div style={styles.colorPickerModal}>
          <div style={styles.colorPickerWrapper}>
            <ColorPicker
              hideSliders
              color={selectedColor}
              onColorChange={(color) => onSelectColor(fromHsv(color))}
              style={styles.colorPicker}
            />
            <Button onPress={() => setShowColorPicker(false)} title="Select" />
          </div>
        </div>
      </Modal> */}
    </div>
  );
};
