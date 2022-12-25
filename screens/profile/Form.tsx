import React, { ReactElement } from "react";
import { FormikValues } from "formik";
import { Block, Button, Input } from "galio-framework";
import { materialTheme } from "../../constants";
import { styles } from "../dossiers/styles";

const ProfileForm = ({
  handleChange,
  handleBlur,
  values,
  handleSubmit,
  touched,
  status,
  errors,
  isSubmitting,
  state,
  toggleActive,
}: FormikValues): ReactElement => {
  return (
    <Block flex={1} center space="between">
      <Block center>
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          placeholder="First name"
          autoCapitalize="none"
          style={[
            styles.input,
            state.active.firstName ? styles.inputActive : null,
          ]}
          onBlur={() => {
            toggleActive("firstName");
            handleBlur("firstName");
          }}
          onFocus={() => toggleActive("firstName")}
          onChangeText={handleChange("firstName")}
          value={values.firstName}
          bottomHelp
          help={
            touched.firstName && (status?.errors.firstName || errors.firstName)
          }
        />
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          placeholder="Last name"
          autoCapitalize="none"
          style={[
            styles.input,
            state.active.lastName ? styles.inputActive : null,
          ]}
          onBlur={() => {
            toggleActive("lastName");
            handleBlur("lastName");
          }}
          onFocus={() => toggleActive("lastName")}
          onChangeText={handleChange("lastName")}
          value={values.lastName}
          bottomHelp
          help={
            touched.lastName && (status?.errors.lastName || errors.lastName)
          }
        />
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          type="phone-pad"
          placeholder="Phone"
          autoCapitalize="none"
          style={[styles.input, state.active.phone ? styles.inputActive : null]}
          onBlur={() => {
            toggleActive("phone");
            handleBlur("phone");
          }}
          onFocus={() => toggleActive("phone")}
          onChangeText={handleChange("phone")}
          value={values.phone}
          bottomHelp
          help={touched.phone && (status?.errors.phone || errors.phone)}
        />
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          type="email-address"
          placeholder="Email"
          autoCapitalize="none"
          style={[styles.input, state.active.email ? styles.inputActive : null]}
          onBlur={() => {
            toggleActive("email");
            handleBlur("email");
          }}
          onFocus={() => toggleActive("email")}
          onChangeText={handleChange("email")}
          value={values.email}
          bottomHelp
          help={touched.email && (status?.errors.email || errors.email)}
        />
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          password
          viewPass
          placeholder="New password"
          iconColor="white"
          style={[
            styles.input,
            state.active.password ? styles.inputActive : null,
          ]}
          onBlur={() => {
            toggleActive("password");
            handleBlur("password");
          }}
          onFocus={() => toggleActive("password")}
          onChangeText={handleChange("password")}
          value={values.password}
          bottomHelp
          help={
            touched.password && (status?.errors.password || errors.password)
          }
        />
        <Input
          bgColor="transparent"
          placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
          borderless
          color="white"
          password
          viewPass
          placeholder="Repeat new password"
          iconColor="white"
          style={[
            styles.input,
            state.active.passwordConfirm ? styles.inputActive : null,
          ]}
          onBlur={() => {
            toggleActive("passwordConfirm");
            handleBlur("passwordConfirm");
          }}
          onFocus={() => toggleActive("passwordConfirm")}
          onChangeText={handleChange("passwordConfirm")}
          value={values.passwordConfirm}
          bottomHelp
          help={
            touched.passwordConfirm &&
            (status?.errors.passwordConfirm || errors.passwordConfirm)
          }
        />
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
