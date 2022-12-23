import { FormikValues } from "formik";
import { createDossier, getDossierById } from "../../../api";
import { removeEmptyString } from "../form/utils";

import { Dossier } from "../types";

export const fetchDossier = async ({ setDossier, setIsLoading, id }: any) => {
  setIsLoading(true);
  const response = await getDossierById(id);
  const json = await response.json();

  if ([200, 201].includes(response.status)) {
    const { dossier } = json;
    setDossier(dossier);
    // const { dossiers } = json;
    // setDossiers(dossiers);
    setIsLoading(false);
  }
  setIsLoading(false);
};

export const handleEditDossierSubmit = () => {
  return async (
    dossier: Dossier,
    { setStatus, setSubmitting, setValues, setTouched }: FormikValues
  ): Promise<void> => {
    console.log("dossier.property.condition", dossier.property.condition);
    console.log("dossier", dossier);
    console.log("removed", removeEmptyString({ ...dossier }));
    const response = await createDossier(dossier);

    const json = await response.json();

    console.log("json", json);
    // signIn(values)
    //   .then((res) => {
    //     if ([200, 201].includes(res.status)) {
    //       setValues(initSignInValues);
    //       setTouched({});

    //       navigation.navigate("Home");
    //     } else {
    //       setSubmitting(false);
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     return data;
    //   })
    //   .catch((err) => console.error("Rejected", err));
  };
};
