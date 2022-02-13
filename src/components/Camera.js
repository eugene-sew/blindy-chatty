import { useState } from "react";
import { storage, db, auth, firebase } from "../firebase";
const messagesRef = db.collection("messages");

export default function Camera({ showCam }) {
  const [source, setSource] = useState("");
  const [photo, setPhoto] = useState([]);
  //   const [imageUrl, setImageUrl] = useState("");
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        console.log(file);
        setPhoto(file);
        console.log(photo);
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };

  const upload = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;

    if (photo == null) return;
    storage
      .ref(`/images/${photo.name}`)
      .put(photo)
      .on("state_changed", alert("success"), alert);

    // await storage
    //   .ref()
    //   .child(`/images/${photo.name}`)
    //   .getDownloadURL()
    //   .then((url) => {
    //     setImageUrl(url);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    await messagesRef.add({
      image: `https://firebasestorage.googleapis.com/v0/b/blindychatty.appspot.com/o/images%2F${photo.name}?alt=media&token=8abd0d45-8be5-442a-8351-5ea05183fe5d`,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });

    // window.location.reload(false);
    showCam = false;
  };

  return (
    <div className="h-screen text-center w-screen bg-black z-10 text-white grid grid-rows-6 relative">
      <div className="flex justify-center items-center row-span-5 flex-col gap-6">
        {source && (
          <>
            <img src={source} alt={"snap"} className="h-fit w-fit  " />
            <button
              onClick={upload}
              className="bg-green-400 text-lg font-bold text-white px-5 py-3 rounded-lg "
            >
              Upload
            </button>
          </>
        )}
      </div>
      <label className="hover:text-white hover:bg-sky-500 rounded-lg bg-gray-200 bg-opacity-25 w-full place-content-center grid py-2 transition ease-in-out duration-500 cursor-pointer row-span-1">
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => handleCapture(e.target)}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          className="w-6 h-6 font-bold cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </label>
    </div>
  );
}
