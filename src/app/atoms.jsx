import { atom } from "jotai";
import { useNavigate } from "react-router-dom";
// Atom utilisateur
export const unknownUser = {
  email: null,
  id: null,
  token: null,
};
export const userAtom = atom(unknownUser);
export const isAuthAtom = atom((get) =>
  get(userAtom).id && get(userAtom).token ? true : false
);

// atom Alertes et erreurs
export const emptyNotice = { message: null, type: null };
export const noticeAtom = atom(emptyNotice);

// Darktheme
export const themeAtom = atom("light");
