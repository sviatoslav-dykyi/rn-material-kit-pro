import React, { ReactElement } from "react";
import { Text } from "react-native";
import { Block } from "galio-framework";
import { styles } from "../styles";
import { materialTheme } from "../../../constants";
import { dossierTypes, energyLabels } from "../utils";
import { Icon } from "../../../components";
import Rating from "../form/Rating";

const Overview = ({ dossier }: any): ReactElement => {
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
        <Rating
          values={dossier}
          handleQualityRate={() => {}}
          handleConditionRate={() => {}}
          type={dossier.property.propertyType.code}
        />
      </Block>
    </>
  );
};

export default Overview;
