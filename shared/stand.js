export class Stand {
  row;
  col;
  direction;
  categoryId;
  categoryIcon;

  constructor(row, col, direction, categoryId, categoryIcon) {
    this.row = row;
    this.col = col;
    this.direction = direction;
    this.categoryId = categoryId;
    this.categoryIcon = categoryIcon;
  }
}
