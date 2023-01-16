enum Tabs {
  bun = 'Булки',
  sauce = 'Соусы',
  main = 'Начинки',
}

enum OrderStatus {
  pending = 'принят',
  inProgress = 'начали готовить',
  done = 'готов',
}

enum Nutrients {
  calories = 'Калории,ккал',
  proteins = 'Белки, г',
  fat = 'Жиры, г',
  carbohydrates = 'Углеводы, г',
}

const DataUrl: string = 'https://norma.nomoreparties.space/api/ingredients';

export { Tabs, DataUrl, OrderStatus, Nutrients };