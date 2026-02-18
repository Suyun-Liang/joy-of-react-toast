import React from "react";

function useKeyDown(key, cb) {
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(e) {
      if (e.code !== key) return;

      cb(e);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, cb]);
}

export { useKeyDown };
