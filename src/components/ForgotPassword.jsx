import { useState } from "react";
import { getFormData } from "../app/utils";
import { buildRequestOptions } from "../app/api";
import { useAtom } from "jotai";
import { noticeAtom } from "../app/atoms";
import { Navigate } from "react-router-dom";

// Formulaire mot de passe oublié
export default function ForgotPassword() {
  const [notice, setNotice] = useAtom(noticeAtom);

  // soumission formulaire + requete singin
  const handleSubmit = async (event) => {
    event.preventDefault();

    // récupère les données du formulaire
    const userData = getFormData(event.target);
    // créer la requête
    const { url, options } = buildRequestOptions("users", "forgot_password", {
      body: { email: userData.email },
    });

    // Executer la requête
    try {
      const response = await fetch(url, options);
      if (response) {
        const { status } = await response.json();
        setNotice({
          type: status.code == 200 ? "success" : "error",
          message: status.message,
        });
      }
    } catch (error) {
      setNotice({
        type: "error",
        message: "Something gets wrong!",
      });
      console.log(error.message);
    }
  };
  if (notice.type == "success") {
    return <Navigate to="/login" />;
  }
  return (
    <section>
      <h1>Mot de passe oublié</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            id="email"
            name="email"
            autoComplete="email"
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </section>
  );
}
