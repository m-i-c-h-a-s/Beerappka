export interface RegisterPageErrors {
  username: Array<string> | null;
  email: Array<string> | null;
  password1: Array<string> | null;
  password2: Array<string> | null;
  non_field_errors: Array<string> | null;
}
