import { Button } from "galio-framework";
import React, { ReactElement, useEffect, useState } from "react";
import { View, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { DossierImage } from "../../screens/dossiers/types";
import { styles, width } from "./styles";
import { LoadingDict } from "./types";

const CarouselCustom = ({
  images,
  callback,
}: {
  images: any;
  callback: (index: number) => void;
}): ReactElement => {
  const [loadingDict, setLoadingDict] = useState<LoadingDict>({});

  useEffect(() => {
    if (!images) return;
    const auxLoadingDict: LoadingDict = {};
    images.forEach(({ url }: DossierImage) => {
      auxLoadingDict[url] = false;
    });
  }, [images]);

  const CarouselCardItem =
    (handleOnPress: (index: number) => void) =>
    ({ item, index }: any) => {
      return (
        <View style={[styles.container, { position: "relative" }]} key={index}>
          <Image source={{ uri: item.url }} style={styles.image} />
          <Button
            onlyIcon
            shadowColor={true}
            icon="delete"
            iconFamily="MaterialIcons"
            color="red"
            iconSize={30}
            onPress={() => {
              handleOnPress(index);
            }}
            style={{
              width: 40,
              height: 40,
              position: "absolute",
              top: 0,
              right: 15,
            }}
          ></Button>
        </View>
      );
    };

  return (
    <View>
      <Carousel
        loop={true}
        width={width}
        height={width / 2}
        autoPlay={false}
        data={images}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={CarouselCardItem(callback)}
        mode="horizontal-stack"
        enabled={images?.length > 1}
        modeConfig={{
          snapDirection: "left",
          moveSize: 400,
          stackInterval: 30,
          scaleInterval: 0.08,
          rotateZDeg: 135,
        }}
      />
    </View>
  );
};

export default CarouselCustom;
