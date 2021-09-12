export interface PasswordResetFinish {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
}
