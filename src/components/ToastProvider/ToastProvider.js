import React, { createContext, useMemo } from "react";

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [messageInput, setMessageInput] = React.useState("");
  const [variantVal, setVariantVal] = React.useState("notice");
  const [messagesList, setMessagesList] = React.useState([]);

  const handleAdd = React.useCallback(() => {
    setMessagesList((cur) => [
      ...cur,
      { id: crypto.randomUUID(), message: messageInput, variant: variantVal },
    ]);
    setMessageInput("");
    setVariantVal("notice");
  }, [messageInput, variantVal]);

  const handleDelete = React.useCallback((deleteId) => {
    setMessagesList((cur) => cur.filter(({ id }) => id !== deleteId));
  }, []);

  const handleDeleteAll = React.useCallback(() => {
    setMessagesList([]);
  }, []);

  const cachedVal = useMemo(() => {
    return {
      messageInput,
      setMessageInput,
      variantVal,
      setVariantVal,
      messagesList,
      handleAdd,
      handleDelete,
      handleDeleteAll,
    };
  }, [
    messageInput,
    variantVal,
    messagesList,
    handleAdd,
    handleDelete,
    handleDeleteAll,
  ]);

  return <ToastContext value={cachedVal}>{children}</ToastContext>;
}

export default ToastProvider;
