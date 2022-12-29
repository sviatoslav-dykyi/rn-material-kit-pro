export interface ForgotPassword {
  email: string;
}

export interface ResetPassword {
  password: string;
  passwordConfirm: string;
}
