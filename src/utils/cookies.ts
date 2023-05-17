import Cookies from 'js-cookie';

export function getCookie(key: string) {
    return Cookies.get(key);
}

export function setCookie(key: string, value: string, expires = 1) {
    return Cookies.set(key, value, { expires });
}

export function removeCookie(key: string) {
    return Cookies.remove(key);
}
