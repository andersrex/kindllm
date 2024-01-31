import { ChatBox } from "./ChatBox";
import { Footer } from "./Footer";
import { Logo } from "./Logo";
import { Suggestions } from "./Suggestions";

export const ChatView = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <div
      class="messages-container"
      style={{
        overflowY: "auto",
        padding: "1rem",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          margin: "0 auto",
        }}
      >
        <Logo />
      </div>
      <h2
        style={{
          margin: "0 auto 2rem auto",
          textAlign: "center",
        }}
      >
        Kindllm
      </h2>
      <div id="messages">
        <div id="nextMessage"></div>
      </div>
    </div>

    <ChatBox />
    <Footer />
  </div>
);
