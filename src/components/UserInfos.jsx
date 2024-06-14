export default function UserInfos({ user }) {
  return (
    <div>
      <h2>infos de connexion</h2>
      <p>Email: {user.email}</p>
      <p>Mot de passe: *********</p>
      <h2>infos utilisateurs</h2>
      <p>Firstname: {user.first_name}</p>
      <p>Lastname: {user.last_name}</p>
    </div>
  );
}
