import React from "react";

import styles from "../NotFoundBlock/NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Нічого не знайденно
      </h1>
      <p className={styles.description}>
        Данна сторінка не існує у нашому інтеренет-иагазині
      </p>
    </div>
  );
};

export default NotFoundBlock;
