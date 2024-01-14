import React, { ChangeEvent, useState, useEffect } from "react";

import styles from "./AdminPonel.module.scss";

import { useAppDispatch } from "../../redux/store";
import Header from "../../components/Header";
import {
  createPizza,
  fetchAllPizzas,
} from "../../redux/slices/pizzaSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [category, setCategory] = useState<number>(0);
  const [sizes, setSize] = useState<string>("");
  const [types, setType] = useState<string>("");
  const [file, setFile] = useState<any>(null);

  const [menu, setMenu] = useState<number>(0);

  const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      return setFile(files);
    }

    return null;
  };

  const adminMenu: string[] = ["Створити піцу", "Редагувати всі піци"];

  useEffect(() => {
    dispatch(fetchAllPizzas());
  }, []);

  return (
    <>
      <Header />
      <div className={styles.root}>
        <div className="categories">
          <ul>
              <li
                className="active"
              >
                Створити піцу
              </li>
          </ul>
        </div>
          <div>
            <div className={styles.element}>
              <h2>Введіть назву піци</h2>
              <input
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </div>
            <div className={styles.element}>
              <h2>Виберіть картинку піци</h2>
              <input
                
                name="file"
                type="file"
                onChange={(e) => handleSetImage(e)}
              />
            </div>
            <div className={styles.element}>
              <h2>Виберіть тип коржу</h2>
              <select onChange={(e) => setType(e.target.value)}>
                <option value="0">Тонке</option>
                <option value="1">Традиційне</option>
                <option value="0 1">Обидва</option>
              </select>
            </div>
            <div className={styles.element}>
              <h2>Виберіть розміри піци</h2>
              <select  onChange={(e) => setSize(e.target.value)}>
                <option value="26">26</option>
                <option value="26 30">26 30</option>
                <option value="26 30 40">26 30 40</option>
              </select>
            </div>
            <div className={styles.element}>
              <h2>Введіть ціну піци</h2>
              <input
                className={styles.input}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                type="text"
              />
            </div>
            <div className={styles.element}>
              <h2>Виберіть категорію піци</h2>
              <select  onChange={(e) => setCategory(Number(e.target.value))}>
                <option value="0">Всі</option>
                <option value="1">М'ясні</option>
                <option value="2">Вегатеріанські</option>
                <option value="3">Гриль</option>
                <option value="4">Гострі</option>
                <option value="5">Закриті</option>
              </select>
            </div>
            <div className={styles.element}>
              <h2>Введіть рейтинг піци</h2>
              <input
              className={styles.input}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                type="text"
              />
            </div>
            <div>
              <button
                className="button button--cart"
                style={{ width: "100px" }}
                onClick={() =>
                  dispatch(
                    createPizza({
                      title,
                      price,
                      rating,
                      category,
                      sizes,
                      types,
                      file,
                    })
                  )
                }
              >
                Create
              </button>
            </div>
          </div>
      </div>
    </>
  );
};

export default Home;
