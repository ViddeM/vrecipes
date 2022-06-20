import { useCallback, useEffect, useState } from "react";

export function useKeyPress(targetKey: string) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  const downHandler = useCallback(
    (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        document.activeElement.nodeName !== "INPUT"
      ) {
        if (e.key === targetKey) {
          setKeyPressed((keyPressed) => !keyPressed);
        }
      }
    },
    [targetKey]
  );

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [downHandler]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
