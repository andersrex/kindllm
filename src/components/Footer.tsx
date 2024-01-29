export const Footer = () => (
  <div
    style={{
      position: "fixed",
      bottom: 0,
      right: 0,
      left: 0,
      textAlign: "right",
      padding: "1rem",
    }}
  >
    <button class="toggle-button" onclick="toggleShowControls()">
      <span class="up-caret">∧</span>
      <span class="down-caret">∨</span>
    </button>

    <button
      style={{
        marginLeft: "0.5rem",
        border: "1px solid #ddd",
        padding: "1rem 2rem",
        "border-radius": "10rem",
        flexBasis: "content",
        fontSize: "1rem",
        backgroundColor: "white",
      }}
      hx-post="/about"
      hx-target="#about-container"
    >
      About
    </button>

    <button
      style={{
        marginLeft: "0.5rem",
        border: "1px solid #ddd",
        padding: "1rem 2rem",
        "border-radius": "10rem",
        flexBasis: "content",
        fontSize: "1rem",
        backgroundColor: "white",
      }}
      onclick="clearChat()"
    >
      Clear chat
    </button>
    <div id="about-container"></div>
  </div>
);
