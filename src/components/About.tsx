export const About = () => (
  <div
    id="about"
    style={{
      position: "fixed",
      top: "60px",
      bottom: "300px",
      right: "100px",
      left: "100px",
      backgroundColor: "white",
      border: "1px solid #ddd",
      padding: "2rem",
      textAlign: "left",
    }}
  >
    <button
      style={{
        border: "1px solid #ddd",
        padding: "0.5rem 1rem",
        "border-radius": "10rem",
        flexBasis: "content",
        fontSize: "1rem",
        backgroundColor: "white",
        float: "right",
      }}
      onclick="hideAbout()"
    >
      Close
    </button>
    <h1
      style={{
        marginTop: "50px",
      }}
    >
      About Kindllm
    </h1>
    <p>Kindllm is an LLM chat web app prototype for Kindle devices powered by Mixtral from Mistral AI.</p>
    <p>Get in touch! kindllm@fastmail.com</p>
    <a href="/privacy">Privacy</a>
  </div>
);
