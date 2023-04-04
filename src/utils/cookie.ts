import { TOKEN_LIVETIME } from './constants';

function getCookie(name: string) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


interface ICookieProps {
  expires: number | Date;
  [key: string]: any; // TODO: тут надо типизировать?
}

function setCookie(name: string, value: string | null, props?: ICookieProps) {
  props = props || { expires : 1 };

  let exp = props.expires;
  
  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * TOKEN_LIVETIME);
    exp = props.expires = d;
  } else if (exp && typeof exp !== 'number' && exp.toUTCString) {
    props.expires = +exp.toUTCString();
  }

  const cookieValue = value ? encodeURIComponent(value) : null;
  
  let updatedCookie = name + '=' + cookieValue;
  
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}


export { getCookie, setCookie, deleteCookie };