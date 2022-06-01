export interface Todo {
  id:          number;
  category_id: number;
  title:       string;
  body:        string;
  state:       number;
  importance:  number;
  updated_at:  Date;
  created_at:  Date;
}
