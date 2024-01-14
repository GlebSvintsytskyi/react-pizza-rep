import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { fetchPizzas, selectPizza } from "../redux/slices/pizzaSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pizza from "../components/Pizza/Pizza";
import Pagination from "../components/Pagination";
import Skeleton from "../components/Pizza/Skeleton";

import { selectCategoriesId } from "../redux/slices/categoriesSlice";
import { selectSort } from "../redux/slices/filtersSplice";
import { selectPaginationPage } from "../redux/slices/paginationSplice";
import { selectPizzaSearch } from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";
import Header from "../components/Header";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const categoriesId = useSelector(selectCategoriesId);
  const sortId = useSelector(selectSort);
  const currentPage = useSelector(selectPaginationPage);
  const { items, status } = useSelector(selectPizza);
  const search = useSelector(selectPizzaSearch);

  // eslint-disable-next-line array-callback-return
  items.map((el) => {
    console.log(el)
  })

  const getPizzas = () => {
    dispatch(
      fetchPizzas({
        categoriesId,
        sortId,
        currentPage,
      })
    );
  };

  useEffect(() => {
    getPizzas();
  }, [categoriesId, sortId, currentPage]);

  const pizza = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((item) => <Pizza key={item.id} {...item} />);

  const sceletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Всі піци</h2>
          <div className="content__items">
            {status === "error" ? (
              <div className="content__error-info">
                <h1>
                  Виникла помилка <span>😕</span>
                </h1>
                <p>Будь ласка спробуйте, через деякий час</p>
              </div>
            ) : status === "loading" ? (
              sceletons
            ) : (
              pizza
            )}
            {/* <Pizza title="Чизбургер-піца" price="195"/>
            <Pizza title="Сицилійська" price="220"/>
            <Pizza title="Пепероні" price="250"/>
            <Pizza title="Чотири сири" price="200"/>
            <Pizza title="Баварська" price="160"/>
            <Pizza title="Гостра Мексикано" price="230"/>
            <Pizza title="Грибна" price="160"/>
            <Pizza title="М’ясна" price="240"/>
            <Pizza title="Чотири пори року" price="250"/>
            <Pizza title="Гавайська" price="170"/>
            <Pizza title="Маргарита" price="210"/> */}
          </div>
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default Home;
