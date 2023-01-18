import React, { ReactElement } from "react";
import { Text, View } from "react-native";
import { Block } from "galio-framework";
import { styles } from "../styles";
import { materialTheme } from "../../../constants";
import {
  conditionRates,
  dossierTypes,
  energyLabels,
  qualityRates,
} from "../utils";
import { Icon } from "../../../components";
import Rating from "../form/Rating";
import { AirbnbRating } from "react-native-ratings";
import { getConditionRatingIndex, getQualityRatingIndex } from "../form/utils";
import { SHOW_RATING_SIZE, SWOW_RATING_REVIEW_SIZE } from "./utils";
import { Dossier } from "../types";

const Overview = ({ dossier }: { dossier: Dossier }): ReactElement => {
  const quality = dossier.property?.quality;
  const condition = dossier.property?.condition;
  return (
    <>
      <Text style={styles.showSubtitle}>
        {
          dossierTypes.find(
            (el) => el.value === dossier.property.propertyType.code
          )?.label
        }{" "}
        details
      </Text>
      <Block>
        <Block row style={styles.showFieldInfoBlock}>
          <Icon
            name={
              dossierTypes.find(
                (el) => el.value === dossier.property.propertyType.code
              )?.icon
            }
            color={materialTheme.COLORS.PLACEHOLDER}
            family="MaterialIcons"
            iconSize={18}
            size={22}
            style={[]}
          />

          <Text style={styles.showFieldInfoText}>
            {
              dossierTypes.find(
                (el) => el.value === dossier.property.propertyType.code
              )?.label
            }
          </Text>
        </Block>
        {dossier.property.floorNumber && (
          <Block row style={styles.showFieldInfoBlock}>
            <Icon
              name="stairs"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              iconSize={18}
              size={22}
              style={[]}
            />

            <Text style={styles.showFieldInfoText}>
              Floor number: {dossier.property.floorNumber}
            </Text>
          </Block>
        )}
        {dossier.property.livingArea && (
          <Block row style={styles.showFieldInfoBlock}>
            <Icon
              name="roofing"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              iconSize={18}
              size={22}
              style={[]}
            />

            <Text style={styles.showFieldInfoText}>
              Net living area: {dossier.property.livingArea} m²
            </Text>
          </Block>
        )}
        <Block row style={styles.showFieldInfoBlock}>
          <Icon
            name="build"
            color={materialTheme.COLORS.PLACEHOLDER}
            family="MaterialIcons"
            iconSize={18}
            size={22}
            style={[]}
          />

          <Text style={styles.showFieldInfoText}>
            Building year: {dossier.property.buildingYear}
          </Text>
        </Block>
        {dossier.property.numberOfRooms && (
          <Block row style={styles.showFieldInfoBlock}>
            <Icon
              name="meeting-room"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              iconSize={18}
              size={22}
              style={[]}
            />

            <Text style={styles.showFieldInfoText}>
              {dossier.property.numberOfRooms} rooms
            </Text>
          </Block>
        )}
        {dossier.property.numberOfFloorsInBuilding && (
          <Block row style={styles.showFieldInfoBlock}>
            <Icon
              name="escalator"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              iconSize={18}
              size={22}
              style={[]}
            />

            <Text style={styles.showFieldInfoText}>
              Number of floors: {dossier.property.numberOfFloorsInBuilding}
            </Text>
          </Block>
        )}
        {dossier.property.energyLabel && (
          <Block row style={styles.showFieldInfoBlock}>
            <Icon
              name="battery-charging-full"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              iconSize={18}
              size={22}
              style={[]}
            />

            <Text style={styles.showFieldInfoText}>
              Energy label:{" "}
              {
                energyLabels.find(
                  (el) => el.value === dossier.property.energyLabel
                )?.label
              }
            </Text>
          </Block>
        )}
        {dossier.property.renovationYear && (
          <Block row style={styles.showFieldInfoBlock}>
            <Icon
              name="handyman"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              iconSize={18}
              size={22}
              style={[]}
            />

            <Text style={styles.showFieldInfoText}>
              Renovation year: {dossier.property.renovationYear}
            </Text>
          </Block>
        )}
        {dossier.property.numberOfBathrooms && (
          <Block row style={styles.showFieldInfoBlock}>
            <Icon
              name="bathtub"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              iconSize={18}
              size={22}
              style={[]}
            />

            <Text style={styles.showFieldInfoText}>
              Bathrooms: {dossier.property.numberOfBathrooms}
            </Text>
          </Block>
        )}
        {dossier.property.hasLift && (
          <Block row style={styles.showFieldInfoBlock}>
            <Icon
              name="unfold-more"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              iconSize={18}
              size={22}
              style={[]}
            />

            <Text style={styles.showFieldInfoText}>Lift</Text>
          </Block>
        )}
        {dossier.property.hasSauna && (
          <Block row style={styles.showFieldInfoBlock}>
            <Icon
              name="add-circle"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              iconSize={18}
              size={22}
              style={[]}
            />

            <Text style={styles.showFieldInfoText}>Sauna</Text>
          </Block>
        )}
        {dossier.property.hasPool && (
          <Block row style={styles.showFieldInfoBlock}>
            <Icon
              name="pool"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              iconSize={18}
              size={22}
              style={[]}
            />

            <Text style={styles.showFieldInfoText}>Pool</Text>
          </Block>
        )}
        {dossier.property.isNew && (
          <Block row style={styles.showFieldInfoBlock}>
            <Icon
              name="add-business"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              iconSize={18}
              size={22}
              style={[]}
            />

            <Text style={styles.showFieldInfoText}>New building</Text>
          </Block>
        )}
        {dossier.property.balconyArea && (
          <Block row style={styles.showFieldInfoBlock}>
            <Icon
              name="deck"
              color={materialTheme.COLORS.PLACEHOLDER}
              family="MaterialIcons"
              iconSize={18}
              size={22}
              style={[]}
            />

            <Text style={styles.showFieldInfoText}>
              Balcony / Terrace: {dossier.property.balconyArea} m²
            </Text>
          </Block>
        )}
      </Block>
      <Text style={[styles.showSubtitle]}>Quality and Condition</Text>
      <Block>
        {
          <>
            <Block row style={[styles.showFieldInfoBlock]}>
              <Icon
                name="kitchen"
                color={materialTheme.COLORS.PLACEHOLDER}
                family="MaterialIcons"
                iconSize={18}
                size={22}
              />

              <Text style={styles.showFieldInfoText}>Kitchen</Text>
            </Block>
            <View style={styles.showRatingBlock}>
              {
                <AirbnbRating
                  count={qualityRates.length}
                  ratingContainerStyle={[styles.showRatingContainerStyle]}
                  reviews={qualityRates.map(({ label }) => label)}
                  defaultRating={getQualityRatingIndex(
                    dossier.property?.quality?.kitchen
                  )}
                  reviewSize={SWOW_RATING_REVIEW_SIZE}
                  size={SHOW_RATING_SIZE}
                  reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                />
              }
              {
                <AirbnbRating
                  count={conditionRates.length}
                  ratingContainerStyle={styles.showRatingContainerStyle}
                  reviews={conditionRates.map(({ label }) => label)}
                  defaultRating={getConditionRatingIndex(
                    dossier.property?.condition?.kitchen
                  )}
                  reviewSize={SWOW_RATING_REVIEW_SIZE}
                  size={SHOW_RATING_SIZE}
                  reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                />
              }
            </View>
          </>
        }
        {
          <>
            <Block row style={[styles.showFieldInfoBlock]}>
              <Icon
                name="bathtub"
                color={materialTheme.COLORS.PLACEHOLDER}
                family="FontAwesome5"
                iconSize={18}
                size={22}
              />

              <Text style={styles.showFieldInfoText}>Bathrooms</Text>
            </Block>
            <View style={styles.showRatingBlock}>
              {
                <AirbnbRating
                  count={qualityRates.length}
                  ratingContainerStyle={styles.showRatingContainerStyle}
                  reviews={qualityRates.map(({ label }) => label)}
                  defaultRating={getQualityRatingIndex(
                    dossier.property?.quality?.bathrooms
                  )}
                  reviewSize={SWOW_RATING_REVIEW_SIZE}
                  size={SHOW_RATING_SIZE}
                  reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                />
              }
              {
                <AirbnbRating
                  count={conditionRates.length}
                  ratingContainerStyle={styles.showRatingContainerStyle}
                  reviews={conditionRates.map(({ label }) => label)}
                  defaultRating={getConditionRatingIndex(
                    dossier.property.condition?.bathrooms
                  )}
                  reviewSize={SWOW_RATING_REVIEW_SIZE}
                  size={SHOW_RATING_SIZE}
                  reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                />
              }
            </View>
          </>
        }
        {
          <>
            <Block row style={[styles.showFieldInfoBlock]}>
              <Icon
                name="view-day"
                color={materialTheme.COLORS.PLACEHOLDER}
                family="MaterialIcons"
                iconSize={18}
                size={22}
              />

              <Text style={styles.showFieldInfoText}>Floor</Text>
            </Block>
            <View style={styles.showRatingBlock}>
              {
                <AirbnbRating
                  count={qualityRates.length}
                  ratingContainerStyle={styles.showRatingContainerStyle}
                  reviews={qualityRates.map(({ label }) => label)}
                  defaultRating={getQualityRatingIndex(
                    dossier.property.quality?.flooring
                  )}
                  reviewSize={SWOW_RATING_REVIEW_SIZE}
                  size={SHOW_RATING_SIZE}
                  reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                />
              }
              {
                <AirbnbRating
                  count={conditionRates.length}
                  ratingContainerStyle={styles.showRatingContainerStyle}
                  reviews={conditionRates.map(({ label }) => label)}
                  defaultRating={getConditionRatingIndex(
                    dossier.property.condition?.flooring
                  )}
                  reviewSize={SWOW_RATING_REVIEW_SIZE}
                  size={SHOW_RATING_SIZE}
                  reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                />
              }
            </View>
          </>
        }
        {
          <>
            <Block row style={[styles.showFieldInfoBlock]}>
              <Icon
                name="web-asset"
                color={materialTheme.COLORS.PLACEHOLDER}
                family="MaterialIcons"
                iconSize={18}
                size={22}
              />

              <Text style={styles.showFieldInfoText}>Windows</Text>
            </Block>
            <View style={styles.showRatingBlock}>
              {
                <AirbnbRating
                  count={qualityRates.length}
                  ratingContainerStyle={styles.showRatingContainerStyle}
                  reviews={qualityRates.map(({ label }) => label)}
                  defaultRating={getQualityRatingIndex(
                    dossier.property.quality?.windows
                  )}
                  reviewSize={SWOW_RATING_REVIEW_SIZE}
                  size={SHOW_RATING_SIZE}
                  reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                />
              }
              {
                <AirbnbRating
                  count={conditionRates.length}
                  ratingContainerStyle={styles.showRatingContainerStyle}
                  reviews={conditionRates.map(({ label }) => label)}
                  defaultRating={getConditionRatingIndex(
                    dossier.property.condition?.windows
                  )}
                  reviewSize={SWOW_RATING_REVIEW_SIZE}
                  size={SHOW_RATING_SIZE}
                  reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                />
              }
            </View>
          </>
        }
        {
          <>
            <Block row style={[styles.showFieldInfoBlock]}>
              <Icon
                name="web-asset"
                color={materialTheme.COLORS.PLACEHOLDER}
                family="MaterialIcons"
                iconSize={18}
                size={22}
              />

              <Text style={styles.showFieldInfoText}>Masonry</Text>
            </Block>
            <View style={styles.showRatingBlock}>
              {
                <AirbnbRating
                  count={qualityRates.length}
                  ratingContainerStyle={styles.showRatingContainerStyle}
                  reviews={qualityRates.map(({ label }) => label)}
                  defaultRating={getQualityRatingIndex(
                    dossier.property.quality?.masonry
                  )}
                  reviewSize={SWOW_RATING_REVIEW_SIZE}
                  size={SHOW_RATING_SIZE}
                  reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                />
              }
              {
                <AirbnbRating
                  count={conditionRates.length}
                  ratingContainerStyle={styles.showRatingContainerStyle}
                  reviews={conditionRates.map(({ label }) => label)}
                  defaultRating={getConditionRatingIndex(
                    dossier.property.condition?.masonry
                  )}
                  reviewSize={SWOW_RATING_REVIEW_SIZE}
                  size={SHOW_RATING_SIZE}
                  reviewColor={materialTheme.COLORS.BUTTON_COLOR}
                />
              }
            </View>
          </>
        }
        {/* <Rating
          values={dossier}
          handleQualityRate={() => {}}
          handleConditionRate={() => {}}
          type={dossier.property.propertyType.code}
        /> */}
      </Block>
    </>
  );
};

export default Overview;
