import React from 'react';

import { Link } from "react-router-dom";

const EmptyCart: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пуста <span>😕</span>
      </h2>
      <p>
       Ви, ще не заказували піцу.
        <br />
        Для того, щоб заказать піцу, перейдіть на головну сторінку.
      </p>
      <img src="/img/empty-cart.png" alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Повернутись назад</span>
      </Link>
    </div>
  );
};

export default EmptyCart;
