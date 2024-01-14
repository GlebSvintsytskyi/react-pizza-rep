import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";

import { setSearch } from "../../redux/slices/pizzaSlice";

import styles from "./Search.module.scss";

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearch(str));
    }, 500),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <input
      value={value}
      onChange={onChangeInput}
      className={styles.root}
      placeholder="Пошук піци"
    />
  );
};

export default Search;
