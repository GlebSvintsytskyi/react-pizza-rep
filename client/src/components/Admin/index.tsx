import React, { useState } from "react";

import styles from "./Admin.module.scss";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../redux/slices/userSlice";
import { Link } from "react-router-dom";

const Admin: React.FC = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles.root}>
      <div className={styles.admin}>
        <h1>Admin</h1>
      </div>
      <div className={styles.input}>
        <h2>Введіть email</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Введіть email"
        />
      </div>
      <div className={styles.input}>
        <h2>Введіть password</h2>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Введіть password"
        />
      </div>
      <div>
        <Link to='/admin'>
        <button className="button button--cart" onClick={userLogin}>Admin</button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
