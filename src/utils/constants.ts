enum Tabs {
  bun = 'Булки',
  sauce = 'Соусы',
  main = 'Начинки',
}

enum OrderStatus {
  pending = 'отправлен',
  inProgress = 'начали готовить',
  done = 'готов',
}

const API_URL: string = 'https://norma.nomoreparties.space/api/';
const WS_URL: string = 'wss://norma.nomoreparties.space';

enum WS_ROUTES {
  all = '/orders/all',
  orders = '/orders',
}

const WS_API =  {
  orders: `${WS_URL}${WS_ROUTES.orders}`,
  all: `${WS_URL}${WS_ROUTES.all}`,
}

enum API {
  ingredients = 'ingredients',
  orders = 'orders',
  login = 'auth/login',
  register = 'auth/register',
  logout = 'auth/logout',
  token = 'auth/token',
  user = 'auth/user',
  forgot = 'password-reset',
  reset = 'password-reset/reset',
}

enum Pages {
  main = '/',
  login = '/login',
  register = '/register',
  forgotPassword = '/forgot-password',
  resetPassword = '/reset-password',
  profile = '/profile',
  orders = '/profile/orders',
  ordersId = '/profile/orders/:id',
  ingredients = '/ingredients/:id',
  feed = '/feed',
  feedId = '/feed/:id',
  page404 = '/404',
}

const TOKEN_LIVETIME: number = 60 * 20 * 1000;

export { Tabs, API, API_URL, OrderStatus, Pages, TOKEN_LIVETIME, WS_URL, WS_API };