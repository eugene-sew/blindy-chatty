import { useState, useRef } from "react";
import { auth, db, firebase } from "../firebase";
import Signout from "./Signout";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";

function Chat() {
  //   const [messages, setMessages] = useState([]);

  const messagesRef = db.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(40);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const [show, setShow] = useState(false);
  const fieldRef = useRef();
  console.log(messages);
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL, displayName } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });

    setFormValue("");
    fieldRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  console.log(messages);

  return (
    <div className="bg-sky-500 w-screen h-screen grid grid-rows-6">
      <div className="row-span-1 bg-sky-500 w-full h-full flex items-center justify-between">
        <div className="flex gap-5">
          <div className="relative">
            <img
              src={auth.currentUser.photoURL}
              className="rounded-full ring-2 ring-white w-12 h-12 shadow mx-5"
              alt="user-ig"
            />
          </div>
          <div className="text-left cursor-pointer">
            <h2 className="font-bold text-xl text-white">
              {auth.currentUser.displayName}
            </h2>
            <h3 className="text-white text-xs">{auth.currentUser.email}</h3>
            {auth.currentUser.phoneNumber && (
              <h3 className="text-white text-xs">
                {" "}
                {auth.currentUser.phoneNumber}
              </h3>
            )}
          </div>
        </div>

        <div className="relative h-full flex items-center w-[200px] justify-end mr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5 text-white mr-5 cursor-pointer"
            onClick={() => setShow(!show)}
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
          {show && (
            <div className="bg-white w-fit h-fit px-5 py-3 text-rose-600 font-extrabold text-xl rounded-xl shadow absolute cursor-pointer">
              <Signout />
            </div>
          )}
        </div>
      </div>
      <div className="row-span-5 bg-white rounded-t-xl relative grid grid-rows-6 h-full px-3">
        <main className="row-span-5 overflow-hidden overflow-y-scroll">
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          <div ref={fieldRef}></div>
        </main>

        <form onSubmit={sendMessage} className="row-span-1 flex flex-col px-3">
          <div className="flex flex-row justify-between px-5 py-2 text-sky-500 gap-5 mt-2">
            <div className="hover:text-white hover:bg-sky-500 rounded-lg bg-gray-200 bg-opacity-25 w-full place-content-center grid py-2 transition ease-in-out duration-500 cursor-pointer">
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
            </div>
            <div className="hover:text-white hover:bg-sky-500 rounded-lg bg-gray-200 bg-opacity-25 w-full place-content-center grid py-2 transition ease-in-out duration-500 cursor-pointer">
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
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </div>
            <div className="hover:text-white hover:bg-sky-500 rounded-lg bg-gray-200 bg-opacity-25 w-full place-content-center grid py-2 transition ease-in-out duration-500 cursor-pointer">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="hover:text-white hover:bg-sky-500 rounded-lg bg-gray-200 bg-opacity-25 w-full place-content-center grid py-2 transition ease-in-out duration-500 cursor-pointer">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
          </div>
          <div className="self-end w-full h-[60%]  flex flex-row items-center justify-between rounded-3xl pl-5 shadow border-2 border-sky-400 pr-5 bg-white py-5 mt-2">
            <input
              type="text"
              onChange={(e) => setFormValue(e.target.value)}
              value={formValue}
              className="w-full text-gray-600 font-light px-5 py-2 text-xl h-10 outline-0"
              placeholder="message here ..."
            />

            <button type="submit" disabled={!formValue ? true : false}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="rotate-90 h-8 w-12 text-sky-500 cursor-pointer hover:text-sky-600 outline-none "
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
