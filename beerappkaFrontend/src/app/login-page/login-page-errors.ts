export interface LoginPageErrors {
  username: Array<string> | null;
  password: Array<string> | null;
  non_field_errors: Array<string> | null;
}
