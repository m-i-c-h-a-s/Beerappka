export interface ArticleCreateErrors {
  title: Array<string> | null;
  content: Array<string> | null;
  is_published: Array<string> | null;
  non_field_errors: Array<string> | null;
}
