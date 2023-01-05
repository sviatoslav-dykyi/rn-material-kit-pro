import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

type UseOnFocus = { isFocused: boolean };

const useOnFocus = (callback: () => void): UseOnFocus => {
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && callback();
  }, [isFocused]);
  return { isFocused };
};

export default useOnFocus;
