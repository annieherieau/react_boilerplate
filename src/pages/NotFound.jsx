import { Link } from "react-router-dom";

export default function NotFound() {

  return(
    <section>
      <h1>Page NotFound</h1>
      <Link to="/">retour à l'accueil</Link>
    </section>
  )
}