export const ChatBox = () => (
  <form
    hx-post="/chat"
    style={{
      width: "100%",
      display: "flex",
    }}
    hx-target="#nextMessage"
    hx-swap="beforebegin scroll:bottom"
    hx-indicator="#loader"
    hx-trigger="submit"
    hx-disable-element="self"
  >
    <div
      class="chat-box-container"
      style={{
        padding: "1rem",
        width: "100%",
      }}
    >
      <input type="hidden" name="messages" value="" />
      <input
        autofocus
        name="message"
        type="text"
        placeholder="Tap and write here to get started..."
        required
        style={{
          border: "1px solid black",
          padding: "1rem 2rem",
          "border-radius": "10rem",
          flex: 1,
          fontSize: "1rem",
        }}
      />
      <button
        style={{
          marginLeft: "0.5rem",
          border: "1px solid black",
          padding: "0 2rem",
          "border-radius": "10rem",
          textAlign: "center",
          width: "140px",
          fontSize: "1rem",
        }}
        type="submit"
      >
        <span id="loader" class="htmx-indicator">
          Loading...
        </span>
        <span>Send</span>
      </button>
    </div>
  </form>
);
