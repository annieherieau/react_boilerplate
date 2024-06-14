import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, noticeAtom } from "../app/atoms";
import { buildRequestOptions, getTokenFromResponse } from "../app/api";
import { checkPasswords, createCookie, getFormData } from "../app/utils";
import { Navigate } from "react-router-dom";

export default function Register() {
  if (useAtomValue(isAuthAtom)) {
    return <Navigate to="/" />;
  }
  const [notice, setNotice] = useAtom(noticeAtom);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // récupérer les données du formulaire
    const userData = getFormData(event.target);

    // créer la requête
    const { url, options } = buildRequestOptions("users", "sign_up", {
      body: { user: userData },
    });

    // Executer la requête
    try {
      const response = await fetch(url, options);
      if (response) {
        const responseData = await response.json();
        if (response.status == 201) {
          console.log(response);
          setNotice({ type: "success", message: "New user created" });

          // creéation du cookie
          const cookieData = {
            token: getTokenFromResponse(response),
            email: responseData.email,
            id: responseData.id,
          };
          createCookie(cookieData, userData.remember_me);
        } else {
          setNotice({
            type: "error",
            message: `Erreur ${response.status}: ${JSON.stringify(
              responseData.errors
            )}`,
          });
        }
      }
    } catch (error) {
      setNotice({ type: "error", message: error.message });
      console.log(error.message);
    }
  };

  if (notice.type == "success") {
    return <Navigate to="/" />;
  }
  return (
    <section>
      <h1>Créer un compte</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            name="email"
            id="email"
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            required
            name="password"
            id="password"
            onChange={checkPasswords}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">
            Confirmer le Mot de passe
          </label>
          <input
            type="password"
            required
            name="password_confirmation"
            id="password_confirmation"
            onChange={checkPasswords}
          />
        </div>
        <div className="form-group">
          <input type="checkbox" name="remember_me" />
          <label htmlFor="remember_me">Se souvenir de moi</label>
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </section>
  );
}
