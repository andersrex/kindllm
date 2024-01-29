import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";

// TODO: Clean this up and serve from static files
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

          .message {
            white-space: pre-wrap;
          }

          .suggestion {
            border: 1px solid black;
            padding: 1rem 2rem;
            border-radius: 10rem;
            text-align: left;
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
            overflow: hidden;
            width: 100%;
            height: 55px;
            display: table-cell;
            vertical-align: middle;
          }

          .toggle-button {
            border: 1px solid #ddd;
            border-radius: 20rem;
            flex-basis: content;
            font-size: 1rem;
            background-color: white;
            position: absolute;
            left: 1rem;
            width: 55px;
            height: 55px;
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

          #suggestions-retry {
            display: none;
            text-align: center;
          }
        </style>
        <script>
          document.addEventListener("htmx:afterSwap", function (evt) {
            evt.target.scrollIntoView({ behavior: "smooth" });

            let messages = [];

            const messageEls = document.querySelectorAll("#messages p");

            messageEls.forEach((el) => {
              messages.push(el.innerHTML);
            });

            const inputValue = messages.join("||||");
            const input = document.querySelector('input[name="messages"]');
            input.value = inputValue;

            retrySuggestions();
          });

          function parseJsonAndInsertSuggestions(response) {
            const suggestionsContainer = document.getElementById("suggestions");
            suggestionsContainer.innerHTML = "";

            try {
              const { suggestions } = JSON.parse(decodeHtmlEntities(response));

              if (!suggestions || suggestions.length === 0) {
                // Show #suggestions-retry
                const suggestionsRetry = document.getElementById("suggestions-retry");
                suggestionsRetry.style.display = "block";
                return;
              }

              // Hide #suggestions-retry
              const suggestionsRetry = document.getElementById("suggestions-retry");
              suggestionsRetry.style.display = "none";

              // Only show the first 3 suggestions
              suggestions.slice(0, 3).forEach((suggestion) => {
                const suggestionElement = document.createElement("button");
                suggestionElement.innerHTML =
                  suggestion.length > 150 ? suggestion.substring(0, 150) + "..." : suggestion;
                suggestionElement.classList.add("suggestion");
                suggestionsContainer.appendChild(suggestionElement);

                // When a suggestion is clicked, send it to the server
                suggestionElement.addEventListener("click", function (evt) {
                  const input = document.querySelector('input[name="message"]');
                  input.value = suggestion;
                  suggestionsContainer.innerHTML = "";

                  submitForm();
                });
              });
            } catch (e) {
              console.error(e);
              const suggestionsRetry = document.getElementById("suggestions-retry");
              suggestionsRetry.style.display = "block";
              return;
            }
          }

          const user = navigator.userAgent;
          function submitForm() {
            const form = document.querySelector("form");

            const event = new Event("submit", {
              bubbles: true, // Set bubbles to true for the event to bubble up through the DOM
              cancelable: true, // Set cancelable to true if you want the event to be cancelable
            });

            // Dispatch the event
            form.dispatchEvent(event);
          }

          function decodeHtmlEntities(jsonString) {
            const htmlEntities = {
              "&quot;": '"',
              "&apos;": "'",
              "&amp;": "&",
              "&lt;": "<",
              "&gt;": ">",
            };

            return jsonString.replace(/&quot;|&apos;|&amp;|&lt;|&gt;/g, (match) => htmlEntities[match]);
          }

          document.addEventListener("htmx:beforeRequest", function (evt) {
            if (evt.detail.pathInfo.requestPath !== "/chat") {
              return;
            }

            const input = evt.target.querySelector('input[name="message"]');
            const message = input.value;
            input.value = "";
            clearSuggestions();

            const nextMessage = document.createElement("p");
            nextMessage.innerHTML = "<b>User</b>: " + message;
            document.getElementById("nextMessage").before(nextMessage);
            nextMessage.scrollIntoView({ behavior: "smooth" });
          });

          // Call /suggestions using fetch API to try to get new suggestions
          function retrySuggestions() {
            const input = document.querySelector('input[name="messages"]');
            const messages = input.value;

            const url = "/suggestions";

            const data = new URLSearchParams();
            data.append("messages", messages);

            // Hide #suggestions-retry
            const suggestionsRetry = document.getElementById("suggestions-retry");
            suggestionsRetry.style.display = "none";

            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: data,
            })
              .then((response) => response.text())
              .then((response) => {
                // console.log("response", response);
                parseJsonAndInsertSuggestions(response);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }

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

          function clearSuggestions() {
            const suggestionsRetry = document.getElementById("suggestions-retry");
            suggestionsRetry.style.display = "none";

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
      </head>
      <body>
        ${children}
      </body>
    </html>
  `;
});
