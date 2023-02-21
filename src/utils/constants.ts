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

const API_URL: string = "https://norma.nomoreparties.space/api/";

enum API {
  ingredients = "ingredients",
  orders = "orders",
}

export { Tabs, API_URL, OrderStatus, API };
