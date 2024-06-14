import { useState } from "react";
import { checkPasswords, getFormData} from "../app/utils";
import { buildRequestOptions } from "../app/api";
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";

export default function UserForm({ user, onUpdate }) {
  const { id, token } = useAtomValue(userAtom);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({ ...user });
  console.log(token);

  const handleChange = (event) => {
    const updatedValues = { ...formValues };
    updatedValues[event.target.name] = event.target.value;
    setFormValues(updatedValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // // récupérer les données du formulaire
    const userData = getFormData(event.target);

    // créer la requête
    const { url, options } = buildRequestOptions("users", "update_user", {
      body: { ...userData },
      token: token,
    });

    // Executer la requête
    try {
      const response = await fetch(url, options);

      if (response) {
        const responseData = await response.json();
        if (response.status == 200) {
          const { data, status } = responseData;
          onUpdate();
        } else {
          console.log(response);
          setError(`Erreur ${response.status}: ${JSON.stringify(responseData.errors)}`);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section>
      {error && <p>{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="hidden" value={id} />
        <div className="form-group">
          <label htmlFor="first_name">First_name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formValues.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last_name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={formValues.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="current_password">Mot de passe actuel</label>
          <input
            type="password"
            required
            name="current_password"
            id="current_password"
          />
        </div>
        <br/>
        <div><strong>Changer le mot de passe</strong>
        <br />Laisser vide si vous ne souhaitez pas changer votre mot de passe</div>
        <div className="form-group">
          <label htmlFor="password">Nouveau Mot de passe</label>
          <input
            type="password"
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
            name="password_confirmation"
            id="password_confirmation"
            onChange={checkPasswords}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </section>
  );
}
