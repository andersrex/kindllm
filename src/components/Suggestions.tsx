export const Suggestions = () => (
  <div
    class="suggestions-container"
    style={{
      padding: "0.5rem 1rem",
    }}
  >
    <div id="suggestions-retry">
      No good follow-up suggestions found
      <button
        style={{
          border: "1px solid #ddd",
          marginLeft: "1rem",
          padding: "1rem 2rem",
          "border-radius": "10rem",
          flexBasis: "content",
          fontSize: "1rem",
          backgroundColor: "white",
        }}
        onclick="retrySuggestions()"
      >
        Retry
      </button>
    </div>
    <div id="suggestions"></div>
  </div>
);
