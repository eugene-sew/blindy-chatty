import { auth } from "../firebase";

function ChatMessage(props) {
  const { text, uid, displayName, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "recieved";

  return (
    <div className="grid mt-5">
      <div className={`message ${messageClass}`}>
        <div className="flex gap-2 items-center w-full">
          <div className="w-12  h-12 grid place-content-center justify-self-start">
            <img
              src={photoURL}
              alt="user-ig"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="w-fit pr-5">
            <p className="flex-wrap w-full">{text}</p>
          </div>
        </div>
        <span class={`text-xs text-sky-800 absolute left-1 -bottom-4`}>
          {displayName}
        </span>
      </div>
    </div>
  );
}

export default ChatMessage;

//absolute right-5 bottom-2
