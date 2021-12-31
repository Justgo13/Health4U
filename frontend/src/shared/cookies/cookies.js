import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

export const CART_COUNT = "cartItemCount";
export const CART_ITEMS = "cartItems"

export const createCookie = (cookieName, cookieValue) => {
    bake_cookie(cookieName, cookieValue);
}   

export const getCookie = (cookieName) => {
    const cookie = read_cookie(cookieName)
    if (cookie.length === 0) {
        return null
    }
    return read_cookie(cookieName)
}