import { Dispatch, SetStateAction } from "react";
import { Dossier } from "../types";

export interface PickImageProps {
  setImageIsLoading: Dispatch<SetStateAction<boolean>>;
  setImageErrors: Dispatch<SetStateAction<string[]>>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  values: Dossier;
}
