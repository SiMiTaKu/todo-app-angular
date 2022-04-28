export interface Todo {
  id:          number;
  category_id: number;
  title:       string;
  body:        string;
  state:       number;
  //updatedAt:   LocalDateTime;  実装方法が現時点ではわからずコメントアウト
  //createdAt:   LocalDateTime;　実装方法が現時点ではわからずコメントアウト
}
