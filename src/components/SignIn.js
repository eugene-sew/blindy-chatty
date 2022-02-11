import firebase from "firebase/compat/app";
import { auth } from "../firebase";
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="w-screen h-screen bg-sky-400 flex justify-center items-center flex-col">
      <div className="text-center mb-3">
        <h1 className="text-3xl font-bold text-gray-700">Blindy Chatty</h1>
        <small>by Eugene.Dev</small>
      </div>

      <button
        onClick={signInWithGoogle}
        className="bg-white w-fit h-fit px-10 py-6 rounded-lg shadow-lg text-2xl font-fold text-gray-700"
      >
        Sign In With Google
      </button>
    </div>
  );
}

export default SignIn;
