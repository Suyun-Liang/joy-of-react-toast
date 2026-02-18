import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider/ToastProvider";
import { useEscapeKey } from "../../hooks/hooks";

function ToastShelf() {
  const { messagesList: data, handleDeleteAll } =
    React.useContext(ToastContext);

  useEscapeKey(handleDeleteAll);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {data.map(({ id, variant, message }) => (
        <li className={styles.toastWrapper} key={id}>
          <Toast id={id} variant={variant}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default React.memo(ToastShelf);
