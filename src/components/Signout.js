import { auth } from "../firebase";

function Signout() {
  return (
    <div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}

export default Signout;
