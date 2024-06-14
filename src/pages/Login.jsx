import { buildRequestOptions, getTokenFromResponse } from "../app/api";
import { createCookie, getFormData, redirectTo } from "../app/utils";
import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, noticeAtom } from "../app/atoms";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Login() {
  if (useAtomValue(isAuthAtom)) {
    return <Navigate to="/" />;
  }
  const [notice, setNotice] = useAtom(noticeAtom);

  // soumission formulaire + requete
  const handleSubmit = async (event) => {
    event.preventDefault();

    // récupérer les données du formulaire
    const userData = getFormData(event.target);

    // créer la requête
    const { url, options } = buildRequestOptions("users", "sign_in", {
      body: { user: userData },
    });

    // Executer la requête
    try {
      const response = await fetch(url, options);
      if (response) {
        const { data, status } = await response.json();
        if (status.code == 200) {
          setNotice({ type: "success", message: status.message });
          
          // creéation du cookie
          const cookieData = {
            token: getTokenFromResponse(response),
            email: data.user.email,
            id: data.user.id,
          };
          createCookie(cookieData, userData.remember_me);
        } else {
          setNotice({
            type: "error",
            message: `Erreur ${status.code}: ${status.message}`,
          });
        }
      }
    } catch (error) {
      setNotice({ type: "error", message: "Invalid Email or Password" });
      console.log(error.message);
    }
  };

  if (notice.type == "success") {
    return <Navigate to="/" />;
  }
  return (
    <section>
      <h1>Connexion</h1>
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
          <input type="password" required name="password" id="password" />
        </div>
        <div className="form-group">
          <input type="checkbox" name="remember_me" id="remember_me" />
          <label htmlFor="remember_me">Se souvenir de moi</label>
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <Link to="/register">Créer un compte</Link>
      <br />
      <Link to="/password/forgot">Mot de passe oublié</Link>
    </section>
  );
}
