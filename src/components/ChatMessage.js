import { auth } from "../firebase";

function ChatMessage(props) {
  const { text, uid } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "recieved";
  return (
    <div className="grid mt-5">
      <div className={`message ${messageClass}`}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
