import { FormikValues } from "formik";
import { removeEmptyString } from "../form/utils";
import * as FileSystem from "expo-file-system";
import { Dossier } from "../types";
import {
  FileSystemUploadOptions,
  FileSystemUploadType,
} from "expo-file-system";
import { getToken } from "../../../utils/common";
import { editDossier, getDossierById } from "../../../api/dossier";
import { prepareBeforeFormJsonDara } from "../create/utils";

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

export const handleEditDossierSubmit = ({ navigation }: any) => {
  return async (
    dossier: Dossier,
    { setStatus, setSubmitting, setValues, setTouched }: FormikValues
  ): Promise<void> => {
    if (!dossier._id) return;
    setSubmitting(true);
    const clone = JSON.parse(JSON.stringify(dossier));
    const result = prepareBeforeFormJsonDara(clone);
    //console.log()
    console.log("finally before submission edit", result);
    console.log("result.property", result.property);
    //console.log("condition", result.property.condition);
    const response = await editDossier(result);
    const json = await response.json();
    console.log("json on edit", json);
    if ([200, 201].includes(response.status)) {
      setSubmitting(false);
      navigation.navigate("Home");
      //setValues(initCreateDossier);
    } else {
      setSubmitting(false);
    }
  };
};

export const upload = async (url: string, pathToImage: string) => {
  console.log("\n***** Upload Image *****");

  if (pathToImage) {
    const token = await getToken();
    console.log("***** get other fields section *****");
    const dataToSend: Record<string, string> = {};
    dataToSend["action"] = "Image Upload";

    console.log("***** Options section *****");
    const options: FileSystemUploadOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "image/jpeg, image/png",
        Authorization: `Bearer ${token}`,
      },
      httpMethod: "POST",
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: "image",
      parameters: dataToSend,
    };

    console.log("***** 'Fetch' section *****");
    const response = await FileSystem.uploadAsync(url, pathToImage, options);

    if (response.status >= 200 && response.status < 300) {
      return JSON.parse(response.body);
    } else {
      return JSON.parse(response.body);
      //throw JSON.parse(response.body);
    }
    console.log("response", response);
  }
};

export const uploadDocument = async (url: string, pathToDocument: string) => {
  console.log("\n***** Upload Document *****");

  if (pathToDocument) {
    const token = await getToken();
    console.log("token in uploadDocument", token);
    console.log("***** get other fields section *****");
    const dataToSend: Record<string, string> = {};
    dataToSend["action"] = "Document Upload";

    console.log("***** Options section *****");
    const options: FileSystemUploadOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept:
          "image/jpeg, image/png, application/pdf, image/heic, image/heif, image/tiff, image/tif ",
        Authorization: `Bearer ${token}`,
      },
      httpMethod: "POST",
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: "attachment",
      parameters: dataToSend,
    };

    console.log("***** 'Fetch' section *****");
    const response = await FileSystem.uploadAsync(url, pathToDocument, options);

    if (response.status >= 200 && response.status < 300) {
      return JSON.parse(response.body);
    } else {
      return JSON.parse(response.body);
    }
  }
};
