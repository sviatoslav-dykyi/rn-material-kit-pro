import React, { ReactElement } from "react";
import { Block, Text, Icon } from "galio-framework";
import { materialTheme } from "../../../constants";
import {
  defaultRating,
  qualityRates,
  conditionRates,
  RATING_REVIEW_SIZE,
  RATING_SIZE,
} from "../utils";
import { getConditionRatingIndex, getQualityRatingIndex } from "./utils";
import { FormikValues } from "formik";
import { AirbnbRating } from "react-native-ratings";
import { styles } from "../styles";
import { DossierTypes } from "../../../utils/constants";

const Rating = ({
  values,
  handleQualityRate,
  handleConditionRate,
  type,
}: FormikValues): ReactElement => {
  return (
    <>
      {[DossierTypes.APARTMENT, DossierTypes.HOUSE].includes(type) && (
        <>
          <Block style={styles.checkboxBlock} row>
            <Icon
              name="countertops"
              color="#fff"
              family="MaterialIcons"
              size={20}
              style={styles.pickerLabelIcon}
            />
            <Text style={styles.ratingBlockTitle}>Kitchen: </Text>
          </Block>
          <Block center style={[styles.ratingBlock]}>
            <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>
            <AirbnbRating
              count={qualityRates.length}
              ratingContainerStyle={styles.ratingContainerStyle}
              onFinishRating={handleQualityRate("property.quality.kitchen")}
              reviews={qualityRates.map(
                ({ label, description }) => `${label}: ${description}`
              )}
              defaultRating={getQualityRatingIndex(
                values.property.quality?.kitchen
              )}
              reviewSize={RATING_REVIEW_SIZE}
              size={RATING_SIZE}
            />
            <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
            <AirbnbRating
              count={conditionRates.length}
              ratingContainerStyle={styles.ratingContainerStyle}
              onFinishRating={handleConditionRate("property.condition.kitchen")}
              reviews={conditionRates.map(({ label }) => label)}
              defaultRating={getConditionRatingIndex(
                values.property.condition?.kitchen
              )}
              reviewSize={RATING_REVIEW_SIZE}
              size={RATING_SIZE}
            />
          </Block>
          <Block style={styles.checkboxBlock} row>
            <Icon
              name="hot-tub"
              color="#fff"
              family="MaterialIcons"
              size={20}
              style={styles.pickerLabelIcon}
            />
            <Text style={styles.ratingBlockTitle}>Bathrooms: </Text>
          </Block>

          <Block center style={[styles.ratingBlock]}>
            <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>

            <AirbnbRating
              count={qualityRates.length}
              ratingContainerStyle={styles.ratingContainerStyle}
              onFinishRating={handleQualityRate("property.quality.bathrooms")}
              reviews={qualityRates.map(({ label, description }) => label)}
              defaultRating={getQualityRatingIndex(
                values.property.quality?.bathrooms
              )}
              reviewSize={RATING_REVIEW_SIZE}
              size={RATING_SIZE}
            />
            <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
            <AirbnbRating
              count={conditionRates.length}
              ratingContainerStyle={styles.ratingContainerStyle}
              onFinishRating={handleConditionRate(
                "property.condition.bathrooms"
              )}
              reviews={conditionRates.map(({ label }) => label)}
              defaultRating={getConditionRatingIndex(
                values.property.condition?.bathrooms
              )}
              reviewSize={RATING_REVIEW_SIZE}
              size={RATING_SIZE}
            />
          </Block>
          <Block style={styles.checkboxBlock} row>
            <Icon
              name="view-day"
              color="#fff"
              family="MaterialIcons"
              size={20}
              style={styles.pickerLabelIcon}
            />
            <Text style={styles.ratingBlockTitle}>Floor: </Text>
          </Block>
          <Block center style={[styles.ratingBlock]}>
            <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>
            <AirbnbRating
              count={qualityRates.length}
              ratingContainerStyle={styles.ratingContainerStyle}
              onFinishRating={handleQualityRate("property.quality.flooring")}
              reviews={qualityRates.map(({ label }) => label)}
              defaultRating={getQualityRatingIndex(
                values.property.quality?.flooring
              )}
              reviewSize={RATING_REVIEW_SIZE}
              size={RATING_SIZE}
            />
            <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
            <AirbnbRating
              count={conditionRates.length}
              ratingContainerStyle={styles.ratingContainerStyle}
              onFinishRating={handleConditionRate(
                "property.condition.flooring"
              )}
              reviews={conditionRates.map(({ label }) => label)}
              defaultRating={getConditionRatingIndex(
                values.property.condition?.flooring
              )}
              reviewSize={RATING_REVIEW_SIZE}
              size={RATING_SIZE}
            />
          </Block>
          <Block style={styles.checkboxBlock} row>
            <Icon
              name="web-asset"
              color="#fff"
              family="MaterialIcons"
              size={20}
              style={styles.pickerLabelIcon}
            />
            <Text style={styles.ratingBlockTitle}>Windows: </Text>
          </Block>

          <Block center style={[styles.ratingBlock]}>
            <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>
            <AirbnbRating
              count={qualityRates.length}
              ratingContainerStyle={styles.ratingContainerStyle}
              onFinishRating={handleQualityRate("property.quality.windows")}
              reviews={qualityRates.map(({ label }) => label)}
              defaultRating={getQualityRatingIndex(
                values.property.quality?.windows
              )}
              reviewSize={RATING_REVIEW_SIZE}
              size={RATING_SIZE}
            />
            <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
            <AirbnbRating
              count={conditionRates.length}
              ratingContainerStyle={styles.ratingContainerStyle}
              onFinishRating={handleConditionRate("property.condition.windows")}
              reviews={conditionRates.map(({ label }) => label)}
              defaultRating={getConditionRatingIndex(
                values.property.condition?.windows
              )}
              reviewSize={RATING_REVIEW_SIZE}
              size={RATING_SIZE}
            />
          </Block>
        </>
      )}
      {type === DossierTypes.HOUSE && (
        <>
          <Block style={styles.checkboxBlock} row>
            <Icon
              name="wb-shade"
              color="#fff"
              family="MaterialIcons"
              size={20}
              style={styles.pickerLabelIcon}
            />
            <Text style={styles.ratingBlockTitle}>Masonry: </Text>
          </Block>

          <Block center style={[styles.ratingBlock]}>
            <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>
            <AirbnbRating
              count={qualityRates.length}
              ratingContainerStyle={styles.ratingContainerStyle}
              onFinishRating={handleQualityRate("property.quality.masonry")}
              reviews={qualityRates.map(({ label, description }) => label)}
              defaultRating={defaultRating}
              reviewSize={RATING_REVIEW_SIZE}
              size={RATING_SIZE}
            />
            <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
            <AirbnbRating
              count={conditionRates.length}
              ratingContainerStyle={styles.ratingContainerStyle}
              onFinishRating={handleConditionRate("property.condition.masonry")}
              reviews={conditionRates.map(({ label }) => label)}
              defaultRating={defaultRating}
              reviewSize={RATING_REVIEW_SIZE}
              size={RATING_SIZE}
            />
          </Block>
        </>
      )}
      {type === DossierTypes.MULTI_FAMILY_HOUSE && (
        <>
          <Block style={styles.checkboxBlock} row>
            <Icon
              name="hot-tub"
              color="#fff"
              family="MaterialIcons"
              size={20}
              style={styles.pickerLabelIcon}
            />
            <Text style={styles.ratingBlockTitle}>Building: </Text>
          </Block>

          <Block center style={[styles.ratingBlock]}>
            <Text style={styles.ratingBlockSubTitle}>Rate the quality</Text>
            <AirbnbRating
              count={qualityRates.length}
              ratingContainerStyle={styles.ratingContainerStyle}
              onFinishRating={handleQualityRate("property.quality.overall")}
              reviews={qualityRates.map(({ label, description }) => label)}
              defaultRating={getQualityRatingIndex(
                values.property.quality?.overall
              )}
              reviewSize={RATING_REVIEW_SIZE}
              size={RATING_SIZE}
            />
            <Text style={styles.ratingBlockSubTitle}>Rate the Condition</Text>
            <AirbnbRating
              count={conditionRates.length}
              ratingContainerStyle={styles.ratingContainerStyle}
              onFinishRating={handleConditionRate("property.condition.overall")}
              reviews={conditionRates.map(({ label }) => label)}
              defaultRating={getConditionRatingIndex(
                values.property.condition?.overall
              )}
              reviewSize={RATING_REVIEW_SIZE}
              size={RATING_SIZE}
            />
          </Block>
        </>
      )}
    </>
  );
};

export default Rating;
