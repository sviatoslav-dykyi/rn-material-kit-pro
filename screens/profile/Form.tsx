import React, { ReactElement } from "react";
import { FormikValues } from "formik";
import { Block, Button, Input, Text } from "galio-framework";
import { materialTheme } from "../../constants";
import { styles } from "../dossiers/styles";
import { HelperText, TextInput } from "react-native-paper";

const ProfileForm = ({
  handleChange,
  handleBlur,
  values,
  handleSubmit,
  touched,
  status,
  errors,
  isSubmitting,
}: FormikValues): ReactElement => {
  return (
    <Block flex={1} center space="between">
      <Block center>
        <TextInput
          style={[styles.inputPaper]}
          textColor="white"
          autoCapitalize="none"
          label={<Text style={styles.inputPaperLabel}>First name</Text>}
          underlineStyle={styles.inputPaperUnderlineStyle}
          value={values.firstName}
          onChangeText={handleChange("firstName")}
        />
        <HelperText
          type="error"
          visible={
            touched.firstName && (status?.errors.firstName || errors.firstName)
          }
        >
          {touched.firstName && (status?.errors.firstName || errors.firstName)}
        </HelperText>
        <TextInput
          style={[styles.inputPaper]}
          textColor="white"
          autoCapitalize="none"
          label={<Text style={styles.inputPaperLabel}>Last name</Text>}
          underlineStyle={styles.inputPaperUnderlineStyle}
          value={values.lastName}
          onChangeText={handleChange("lastName")}
        />
        <HelperText
          type="error"
          visible={
            touched.lastName && (status?.errors.lastName || errors.lastName)
          }
        >
          {touched.lastName && (status?.errors.lastName || errors.lastName)}
        </HelperText>
        <TextInput
          keyboardType="phone-pad"
          style={[styles.inputPaper]}
          textColor="white"
          autoCapitalize="none"
          label={<Text style={styles.inputPaperLabel}>Phone</Text>}
          underlineStyle={styles.inputPaperUnderlineStyle}
          value={values.phone}
          onChangeText={handleChange("phone")}
        />
        <HelperText
          type="error"
          visible={touched.phone && (status?.errors.phone || errors.phone)}
        >
          {touched.phone && (status?.errors.phone || errors.phone)}
        </HelperText>
        <TextInput
          keyboardType="email-address"
          style={[styles.inputPaper]}
          textColor="white"
          autoCapitalize="none"
          label={<Text style={styles.inputPaperLabel}>Email</Text>}
          underlineStyle={styles.inputPaperUnderlineStyle}
          value={values.email}
          onChangeText={handleChange("email")}
        />
        <HelperText
          type="error"
          visible={touched.email && (status?.errors.email || errors.email)}
        >
          {touched.email && (status?.errors.email || errors.email)}
        </HelperText>
      </Block>
      <Block flex center style={{ marginTop: 20 }}>
        <Button
          size="large"
          shadowless
          style={{ height: 48 }}
          color={materialTheme.COLORS.BUTTON_COLOR}
          onPress={handleSubmit}
          loading={isSubmitting}
        >
          UPDATE
        </Button>
      </Block>
    </Block>
  );
};

export default ProfileForm;
