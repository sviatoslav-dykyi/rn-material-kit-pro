import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

const useOnFocus = (callback: () => void): void => {
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && callback();
  }, [isFocused]);
};

export default useOnFocus;
