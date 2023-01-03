import { FormikValues } from "formik";
import { removeEmptyString } from "../form/utils";
import * as FileSystem from "expo-file-system";
import { Dossier } from "../types";
import {
  FileSystemUploadOptions,
  FileSystemUploadType,
} from "expo-file-system";
import { getToken } from "../../../utils/common";
import { getDossierById } from "../../../api/dossier";

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
    if (!dossier._id) return;
    setSubmitting(true);
    //console.log("dossier2222", dossier);
    // const auxDossier = await prepareDossierBeforeSubmit(dossier);
    // const gifDir = FileSystem.cacheDirectory + "giphy/";
    // const gifFileUri = (gifId: string) => gifDir + `gif_${gifId}_200.gif`;
    // const resp1 = await FileSystem.downloadAsync(imageUrl2, gifFileUri("1"));
    // console.log("resp1", resp1);

    const firstImageObj = dossier.images[0];
    console.log("firstImageObj", firstImageObj);
    //return;

    const url = imageRx;
    const outputDir = `${FileSystem.documentDirectory}${"some-title22222"}.jpg`;

    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      outputDir,
      {}
    );
    console.log("wwww2");
    try {
      const directoryInfo = await FileSystem.getInfoAsync(outputDir);
      if (!directoryInfo.exists) {
        await FileSystem.makeDirectoryAsync(outputDir, { intermediates: true });
      }
      // @ts-ignore
      const rr = await downloadResumable.downloadAsync();
      console.log("");
      console.log(
        "Finished downloading to ",
        "file://Users/svatoslav_dykyi/Library/Developer/CoreSimulator/Devices/498DC804-6C82-4F7A-8527-CCB85A85A539/data/Containers/Data/Application/BF22C133-E58C-4088-A097-4244E1D8284C/Documents/ExponentExperienceData/%2540sviatoslad%252Frn-material-kit-pro/some-title.mp4"
      );
      upload(
        `http://192.168.31.44:5001/api/v1/dossiers/${dossier._id}`,
        rr?.uri!
      );

      // Something went wrong:
      // .catch((errorMessage: any, statusCode: any) => {
      //   // error handling
      // });
    } catch (e) {
      console.error(e);
    }

    // fetch(
    //   "https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg",
    //   {
    //     headers: {
    //       "Content-Type": "application/octet-stream",
    //     },
    //     credentials: "include",
    //   }
    // )
    //   .then((res) => res.blob()) // Gets the response and returns it as a blob
    //   .then((blob) => {
    //     // Here's where you get access to the blob
    //     // And you can use it for whatever you want
    //     // Like calling ref().put(blob)

    //     // Here, I use it to make an image appear on the page
    //     //console.log("blob123", blob);
    //     previewFile(blob);
    //   });

    // function previewFile(file: any) {
    //   var reader = new FileReader();

    //   reader.onloadend = function () {
    //     console.log("reader.result1111", reader.result); //this is an ArrayBuffer
    //   };
    //   reader.readAsDataURL(file);
    // }

    //console.log("auxDossier", auxDossier);
    //const response = await editDossier(auxDossier, dossier._id);

    // const response = await editDossier(auxDossier, dossier._id);
    // const json = await response.json();
    // console.log("json", json);
    // if ([200, 201].includes(response.status)) {
    //   console.log("json445", json);
    // }

    // setSubmitting(false);
  };
};

const prepareDossierBeforeSubmit = async (
  dossier: Dossier
): Promise<FormData> => {
  const formData = new FormData();
  console.log("dossier.images", dossier);
  formData.append("title", dossier.title || "");
  dossier.description && formData.append("description", dossier.description);

  const urlToBlob = async () => {
    console.log("dossier.images", dossier.images);
    dossier.images.forEach(async ({ filename, url }) => {
      //formData.append("images", ["gog"] as any);
      console.log("url", url);
      //const response = await fetch(url);
      // const blob = await response.blob();
      // const file = new File([blob], filename || "image.jpg", {
      //   type: blob.type,
      // });
      formData.append("images", {
        uri: url,
        name: "media",
        type: `image/jpeg`,
      } as any);
      // formData.append("images", [file] as any);
      console.log("url23", url);
    });
    //formData.append("images", "gog3333");
  };
  await urlToBlob();

  dossier.dealType && formData.append("dealType", dossier.dealType);
  formData.append(
    "property[location][address][postCode]",
    dossier.property.location.address.postCode
  );
  formData.append(
    "property[location][address][city]",
    dossier.property.location.address.city
  );
  formData.append(
    "property[location][address][street]",
    dossier.property.location.address.street
  );
  formData.append(
    "property[location][address][houseNumber]",
    dossier.property.location.address.houseNumber
  );
  formData.append(
    "property[location][coordinates][latitude]",
    dossier.property.location.coordinates.latitude.toString()
  );
  formData.append(
    "property[location][coordinates][longitude]",
    dossier.property.location.coordinates.longitude.toString()
  );
  dossier.property.propertyType.code &&
    formData.append(
      "property[propertyType][code]",
      dossier.property.propertyType.code
    );
  dossier.property.propertyType.subcode &&
    formData.append(
      "property[propertyType][subcode]",
      dossier.property.propertyType.subcode
    );
  dossier.property.buildingYear &&
    formData.append(
      "property[buildingYear]",
      dossier.property.buildingYear.toString()
    );
  dossier.property.renovationYear &&
    formData.append(
      "property[renovationYear]",
      dossier.property.renovationYear.toString()
    );
  dossier.property.livingArea &&
    formData.append(
      "property[livingArea]",
      dossier.property.livingArea?.toString()
    );
  dossier.property.landArea &&
    formData.append(
      "property[landArea]",
      dossier.property.landArea?.toString()
    );
  dossier.property.volume &&
    formData.append(
      "property[volume]",
      dossier.property.volume?.toString() || ""
    );
  dossier.property.balconyArea &&
    formData.append(
      "property[balconyArea]",
      dossier.property.balconyArea?.toString()
    );
  dossier.property.hasLift !== "" &&
    dossier.property.hasLift !== undefined &&
    formData.append("property[hasLift]", String(dossier.property.hasLift));
  dossier.property.isNew !== "" &&
    dossier.property.isNew !== undefined &&
    formData.append("property[isNew]", String(dossier.property.isNew));
  dossier.property.hasSauna !== "" &&
    dossier.property.hasSauna !== undefined &&
    formData.append("property[hasSauna]", String(dossier.property.hasSauna));
  dossier.property.hasPool !== "" &&
    dossier.property.hasPool !== undefined &&
    formData.append("property[hasPool]", String(dossier.property.hasPool));
  dossier.property.floorNumber &&
    formData.append(
      "property[floorNumber]",
      dossier.property.floorNumber?.toString()
    );
  dossier.property.numberOfUnits &&
    formData.append(
      "property[numberOfUnits]",
      dossier.property.numberOfUnits?.toString()
    );
  dossier.property.annualRentIncome &&
    formData.append(
      "property[annualRentIncome]",
      dossier.property.annualRentIncome?.toString()
    );
  dossier.property.numberOfFloorsInBuilding &&
    formData.append(
      "property[numberOfFloorsInBuilding]",
      dossier.property.numberOfFloorsInBuilding?.toString()
    );
  dossier.property.annualRentIncome &&
    formData.append(
      "property[annualRentIncome]",
      dossier.property.annualRentIncome?.toString()
    );

  dossier.property.numberOfRooms &&
    formData.append(
      "property[numberOfRooms]",
      dossier.property.numberOfRooms?.toString()
    );
  dossier.property.numberOfBathrooms &&
    formData.append(
      "property[numberOfBathrooms]",
      dossier.property.numberOfBathrooms?.toString()
    );
  dossier.property.numberOfIndoorParkingSpaces &&
    formData.append(
      "property[numberOfIndoorParkingSpaces]",
      dossier.property.numberOfIndoorParkingSpaces?.toString()
    );
  dossier.property.numberOfOutdoorParkingSpaces &&
    formData.append(
      "property[numberOfOutdoorParkingSpaces]",
      dossier.property.numberOfOutdoorParkingSpaces?.toString()
    );
  dossier.property.condition?.bathrooms &&
    formData.append(
      "property[condition][bathrooms]",
      dossier.property.condition?.bathrooms
    );
  dossier.property.condition?.kitchen &&
    formData.append(
      "property[condition][kitchen]",
      dossier.property.condition?.kitchen
    );
  dossier.property.condition?.flooring &&
    formData.append(
      "property[condition][flooring]",
      dossier.property.condition?.flooring
    );
  dossier.property.condition?.windows &&
    formData.append(
      "property[condition][windows]",
      dossier.property.condition?.windows
    );
  dossier.property.condition?.overall &&
    formData.append(
      "property[condition][overall]",
      dossier.property.condition?.overall
    );
  dossier.property.quality?.bathrooms &&
    formData.append(
      "property[quality][bathrooms]",
      dossier.property.quality?.bathrooms || ""
    );
  dossier.property.quality?.kitchen &&
    formData.append(
      "property[quality][kitchen]",
      dossier.property.quality?.kitchen || ""
    );
  dossier.property.quality?.flooring &&
    formData.append(
      "property[quality][flooring]",
      dossier.property.quality?.flooring || ""
    );
  dossier.property.quality?.windows &&
    formData.append(
      "property[quality][windows]",
      dossier.property.quality?.windows || ""
    );
  dossier.property.quality?.overall &&
    formData.append(
      "property[quality][overall]",
      dossier.property.quality?.overall
    );
  dossier.property.gardenArea &&
    formData.append(
      "property[gardenArea]",
      dossier.property.gardenArea.toString()
    );
  dossier.property.energyLabel &&
    formData.append(
      "property[energyLabel]",
      dossier.property.energyLabel.toString()
    );
  dossier.property.garage_spaces &&
    formData.append(
      "property[garage_spaces]",
      dossier.property.garage_spaces.toString()
    );
  dossier.property?.numberOfUnits &&
    formData.append(
      "property[numberOfUnits]",
      dossier.property?.numberOfUnits.toString()
    );

  await fetch(
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg",
    {
      headers: {
        "Content-Type": "application/octet-stream",
      },
      credentials: "include",
    }
  )
    .then((res) => res.blob()) // Gets the response and returns it as a blob
    .then((blob) => {
      // Here's where you get access to the blob
      // And you can use it for whatever you want
      // Like calling ref().put(blob)
      // Here, I use it to make an image appear on the page
      //console.log("blob123", blob);
      //previewFile(blob);
      formData.append("images[]", blob as any);
    });

  // function previewFile(file: any) {
  //   var reader = new FileReader();

  //   reader.onloadend = function () {
  //     console.log("reader.result1111", reader.result); //this is an ArrayBuffer
  //   };
  //   reader.readAsDataURL(file);
  // }

  // formData.append("images", [
  //   { uri: imgU, name: "media", type: `image/jpeg` },
  // ] as any);

  // [
  //   {
  //     filename: "IMG_0002.jpg",
  //     height: 2848,
  //     url: "file:///Users/svatoslav_dykyi/Library/Developer/CoreSimulator/Devices/498DC804-6C82-4F7A-8527-CCB85A85A539/data/Containers/Data/Application/BF22C133-E58C-4088-A097-4244E1D8284C/Library/Caches/ExponentExperienceData/%2540anonymous%252Frn-material-kit-pro-d93fccf4-4f79-48c5-aec9-0ac23d29924e/ImagePicker/A4B3ACE2-0704-4AC2-BAD5-26B0406E5C4F.jpg",
  //     width: 4288,
  //   },
  //   {
  //     filename: "IMG_0001.jpg",
  //     height: 2848,
  //     url: "file:///Users/svatoslav_dykyi/Library/Developer/CoreSimulator/Devices/498DC804-6C82-4F7A-8527-CCB85A85A539/data/Containers/Data/Application/BF22C133-E58C-4088-A097-4244E1D8284C/Library/Caches/ExponentExperienceData/%2540anonymous%252Frn-material-kit-pro-d93fccf4-4f79-48c5-aec9-0ac23d29924e/ImagePicker/5E52D3C3-71A4-488F-989F-62B01E4972DC.jpg",
  //     width: 4288,
  //   },
  // ];

  // const urlToBlob = async () => {
  //   dossier.images.forEach(async ({ filename, url }) => {
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     const file = new File([blob], filename || "image.jpg", {
  //       type: blob.type,
  //     });
  //     formData.append("images[]", file as any);
  //   });
  // };
  //await urlToBlob();

  return formData;
};
//FileSystem.downloadAsync(gifUrl(id), gifFileUri(id))));

const upload = async (url: string, pathToImage: string) => {
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
      httpMethod: "PUT",
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: "images",
      parameters: dataToSend,
    };

    console.log("***** 'Fetch' section *****");
    const response = await FileSystem.uploadAsync(url, pathToImage, options);

    console.log("response after fetch", response);
    //setLoading(false);

    if (response.status >= 200 && response.status < 300) {
      const body = JSON.parse(response.body);
      console.log("body666666", body);
      //setMessage(body.msg);
    } else {
      //setErrMessage(`${response.status} Error: ${response.body}`);
    }
    console.log("response", response);
  }
};

const imageUrl =
  "data:image/png;base64,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";

const imageRx =
  "https://www.whitegroup.com.ua/landing-new/images/tild6631-3031-4636-b331-656565643763__strauman_img.jpg";
const imageUrl2 =
  "data:image/jpeg;base64,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";
