/*-----------------------------------------------------------------------*/
// LOGIN SCREEN
/*-----------------------------------------------------------------------*/
export function API_LOGIN({ account, password }) {
  return `http://192.168.0.104:8080/login?account=${account}&password=${password}`;
}
// HOME SCREEN
/*----------------------------------------------------------------------- */
export const API_GET_ALL_RESTAURANT = "http://192.168.0.104:8080/restaurants";
export const API_GET_ALL_RESTAURANT_1 =
  "http://192.168.0.104:8080/restaurants/by-restaurantType?restaurantType=Bắc"; // Bắc
export const API_GET_ALL_RESTAURANT_2 =
  "http://192.168.0.104:8080/restaurants/by-restaurantType?restaurantType=Trung"; // Trung
export const API_GET_ALL_RESTAURANT_3 =
  "http://192.168.0.104:8080/restaurants/by-restaurantType?restaurantType=Nam"; // Nam
/*-----------------------------------------------------------------------*/
// RESTUARANT SCREEN
/*----------------------------------------------------------------------- */
export function API_GET_ALL_FOOD_BY_RESTAURANT(restaurantId) {
  return `http://192.168.0.104:8080/foods/by-restaurant?restaurantId=${restaurantId}`;
}
/*-----------------------------------------------------------------------*/
// CART SCREENs
/*----------------------------------------------------------------------- */
export const API_CREATE_ORDER = "http://192.168.0.104:8080/order";
/*-----------------------------------------------------------------------*/
// HISTORY SCREENs
/*----------------------------------------------------------------------- */
export function API_GET_ALL_ORDER_BY_USERID(userId) {
  return `http://192.168.0.104:8080/orders/by-user?userId=${userId}`;
}
export function API_GET_ALL_FOODORDERS_BY_ORDERID(orderId) {
  return `http://192.168.0.104:8080/foodOrders/by-order?orderId=${orderId}`;
}
/*-----------------------------------------------------------------------*/
// REGISTER SCREENs
/*----------------------------------------------------------------------- */
export const API_CREATE_USER = `http://192.168.0.104:8080/user`;
