import Cookies from "js-cookie";

// ****** REDIRECTION ******* //
export function redirectTo(location = "/") {
  const basename = import.meta.env.VITE_BASENAME;
  window.location.replace(`${basename}${location}`);
}

// ***** FORMULAIRE *****/
// récupérer les données d'un formulaire
export function getFormData(form) {
  const data = {};
  for (const [key, value] of new FormData(form).entries()) {
    if (value !== "") {
      data[key] = value;
    }
  }
  return data;
}

// validation confirmation de password
export function checkPasswords() {
  const password = document.querySelector(`input[name=password]`);
  const confirm = document.querySelector(`input[name=password_confirmation]`);
  if (confirm.value === password.value) {
    confirm.setCustomValidity("");
  } else {
    confirm.setCustomValidity("Les mots de passe ne correspondent pas");
  }
}

// ****** COOKIES ******* //
export const cookie_name = import.meta.env.VITE_COOKIE_NAME;

export function createCookie(data, remember_me = false) {
  Cookies.set(cookie_name, JSON.stringify(data), {
    expires: remember_me ? 30 : 1 / 12, // 30 jours ou 2h
  });
}

export function loadCookie() {
  return Cookies.get(cookie_name) ? JSON.parse(Cookies.get(cookie_name)) : null;
}

export function updateCookie(email) {
  const data = { ...loadCookie(), email };
  Cookies.set(cookie_name, JSON.stringify(data));
}

export function removeCookie() {
  Cookies.remove(cookie_name);
}
