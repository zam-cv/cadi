import './Login.css';
export default function Login() {
  return(
    <form className = "DisplayCMenu">
      <h1>Login</h1>
      <label>Username</label>
      <input type="text"/>

      <label>Password</label>
      <input type="password"/>

      <button>Login</button>
    </form>
  );
}