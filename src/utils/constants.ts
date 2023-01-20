enum Tabs {
  bun = "Булки",
  sauce = "Соусы",
  main = "Начинки",
}

enum OrderStatus {
  pending = "отправлен",
  inProgress = "начали готовить",
  done = "готов",
}

const ApiUrl: string = "https://norma.nomoreparties.space/api/";

enum API {
  ingredients = "ingredients",
  orders = "orders",
}

export { Tabs, ApiUrl, OrderStatus, API };
