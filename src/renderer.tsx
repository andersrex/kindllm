import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";

// TODO: Clean this up and serve styles and js from static files
export const renderer = jsxRenderer(({ children }) => {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@1.9.3"></script>
        <title>Kindllm - LLM chat for Kindle</title>
        <meta name="description" content="The distraction-free LLM chat app for Kindle" />
        <meta property="og:title" content="Kindllm - LLM chat for Kindle" />
        <meta property="og:description" content="The distraction-free LLM chat app for Kindle" />
        <meta property="og:url" content="https://kindllm.app" />
        <meta name="twitter:title" content="Kindllm - LLM chat for Kindle" />
        <meta name="twitter:description" content="The distraction-free LLM chat app for Kindle" />
        ${style} ${script}
      </head>
      <body>
        ${children}
      </body>
    </html>
  `;
});

const style = html`
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap");

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      height: 100%;
    }

    body,
    button,
    input,
    select,
    textarea {
      font-family: "Open Sans", sans-serif;
    }

    *:focus {
      outline: none;
    }

    button:active {
      background-color: #aaa;
    }

    .htmx-indicator {
      display: none;
    }
    .htmx-request.htmx-indicator {
      display: block;
    }
    .htmx-request.htmx-indicator + span {
      display: none;
    }

    .toggle-button .up-caret {
      display: block;
    }

    .toggle-button .down-caret {
      display: none;
    }

    .hide-controls .toggle-button .up-caret {
      display: none;
    }

    .hide-controls .toggle-button .down-caret {
      display: block;
    }

    .hide-controls .suggestions-container {
      display: none;
    }

    .chat-box-container {
      display: flex;
    }

    .hide-controls .chat-box-container {
      display: none;
    }

    .messages-container {
      height: 48%;
    }

    .hide-controls .messages-container {
      height: calc(100vh - 87.5px);
    }
  </style>
`;

// Tried using hyperscript here but it didn't load on the Kindle so
// I reverted to plain frameworkless JS...
const script = html`
  <script>
    document.addEventListener("htmx:afterSwap", function (evt) {
      if (evt.detail.pathInfo.requestPath !== "/chat") {
        return;
      }

      evt.target.scrollIntoView({ behavior: "smooth" });

      let messages = [];
      const messageEls = document.querySelectorAll("#messages p");

      messageEls.forEach((el) => {
        messages.push(el.innerHTML);
      });

      const inputValue = messages.join("||||");
      const input = document.querySelector('input[name="messages"]');
      input.value = inputValue;

      getSuggestions();
    });

    document.addEventListener("htmx:beforeRequest", function (evt) {
      clearSuggestions();

      if (evt.detail.pathInfo.requestPath !== "/chat") {
        return;
      }

      const input = evt.target.querySelector('input[name="message"]');
      const message = input.value;
      input.value = "";

      const nextMessage = document.createElement("p");
      nextMessage.innerHTML = "<b>User</b>: " + message;
      document.getElementById("nextMessage").before(nextMessage);
      nextMessage.scrollIntoView({ behavior: "smooth" });
    });

    function clearChat() {
      const messagesContainer = document.getElementById("messages");
      const paragraphs = messagesContainer.getElementsByTagName("p");
      while (paragraphs.length > 0) {
        messagesContainer.removeChild(paragraphs[0]);
      }

      const input = document.querySelector('input[name="messages"]');
      input.value = "";

      clearSuggestions();
    }

    function setMessageAndSubmit(suggestion) {
      const input = document.querySelector('input[name="message"]');
      input.value = suggestion;
      clearSuggestions();

      submitForm();
    }

    function submitForm() {
      const form = document.querySelector("form");

      const event = new Event("submit", {
        bubbles: true, // Set bubbles to true for the event to bubble up through the DOM
        cancelable: true, // Set cancelable to true if you want the event to be cancelable
      });

      // Dispatch the event
      form.dispatchEvent(event);
    }

    function getSuggestions() {
      var myDiv = document.getElementById("suggestions-retry-button");
      var event = new Event("retry");
      myDiv.dispatchEvent(event);
    }

    function clearSuggestions() {
      const suggestionsRetry = document.getElementById("suggestions-retry");
      suggestionsRetry.style.opacity = 0;

      const suggestionsContainer = document.getElementById("suggestions");
      suggestionsContainer.innerHTML = "";
    }

    function hideAbout() {
      const aboutContainer = document.getElementById("about-container");
      aboutContainer.innerHTML = "";
    }

    function toggleShowControls() {
      document.body.classList.toggle("hide-controls");
    }
  </script>
`;
