import React, { createContext, useMemo } from "react";
import { useEscapeKey } from "../../hooks/hooks";

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [messagesList, setMessagesList] = React.useState([]);

  const handleAdd = React.useCallback((message, variant) => {
    setMessagesList((cur) => [
      ...cur,
      { id: crypto.randomUUID(), message, variant },
    ]);
  }, []);

  const handleDelete = React.useCallback((deleteId) => {
    setMessagesList((cur) => cur.filter(({ id }) => id !== deleteId));
  }, []);

  const handleDeleteAll = React.useCallback(() => {
    setMessagesList([]);
  }, []);

  useEscapeKey(handleDeleteAll);

  const cachedVal = useMemo(() => {
    return {
      messagesList,
      handleAdd,
      handleDelete,
      handleDeleteAll,
    };
  }, [messagesList, handleAdd, handleDelete, handleDeleteAll]);

  return <ToastContext value={cachedVal}>{children}</ToastContext>;
}

export default ToastProvider;
