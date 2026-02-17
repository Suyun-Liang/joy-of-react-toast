import React from "react";

import Button from "../Button";

import Toast from "../Toast/Toast";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [messageInput, setMessageInput] = React.useState("");
  const [variantVal, setVariantVal] = React.useState("notice");
  const [messagesList, setMessagesList] = React.useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    setMessagesList([
      ...messagesList,
      { id: crypto.randomUUID(), message: messageInput, variant: variantVal },
    ]);
    setMessageInput("");
    setVariantVal("notice");
  }

  const handleDelete = React.useCallback((deleteId) => {
    setMessagesList((cur) => cur.filter(({ id }) => id !== deleteId));
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {messagesList.length > 0 && (
        <ToastShelf data={messagesList} handleDelete={handleDelete} />
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((option, i) => (
                <label htmlFor={`variant-${option}`} key={i}>
                  <input
                    id={`variant-${option}`}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={variantVal === option}
                    onChange={(e) => {
                      setVariantVal(e.target.value);
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
