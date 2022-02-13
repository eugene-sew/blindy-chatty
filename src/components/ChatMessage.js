import { auth } from "../firebase";

function ChatMessage(props) {
  const { text, uid, displayName, photoURL, image } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "recieved";
  const imgClass = uid === auth.currentUser.uid ? "sentMI" : "recievedMI";

  return (
    <div className="grid mt-5">
      {text && (
        <div className={`message ${messageClass}`}>
          <div className="flex gap-2 w-full">
            <div className="w-12  h-12 grid items-start">
              <img
                src={photoURL}
                alt="user-ig"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="w-fit pr-5 flex items-center">
              <p className="flex-wrap w-full">{text}</p>
            </div>
          </div>

          {uid !== auth.currentUser.uid && (
            <span className={`text-xs text-sky-800 absolute left-1 -bottom-4`}>
              {displayName}
            </span>
          )}
        </div>
      )}

      {image && (
        <div className={`messageImage ${imgClass}`}>
          <a href={image}>
            <img
              src={image}
              alt="sendimage"
              className="w-[50%] h-32 rounded-lg shadow-lg mr-5 object-cover "
            />
          </a>

          {uid !== auth.currentUser.uid && (
            <span className={`text-xs text-sky-800 absolute left-1 -bottom-4`}>
              {displayName}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatMessage;

//absolute right-5 bottom-2
