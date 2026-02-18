import React from "react";

function useEscapeKey(cb) {
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(e) {
      if (e.code !== "Escape") return;

      cb();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [cb]);
}

export { useEscapeKey };
