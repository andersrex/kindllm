export const Suggestions = ({ suggestions }: { suggestions?: string[] }) => (
  <div
    id="suggestions-container"
    class="suggestions-container"
    style={{
      padding: "0.5rem 1rem",
    }}
  >
    <div id="suggestions">
      {(suggestions || []).map((suggestion) => (
        <Suggestion suggestion={suggestion} />
      ))}
    </div>
    <div
      id="suggestions-retry"
      style={{
        opacity: suggestions?.length == 0 ? 1 : 0,
        textAlign: "center",
      }}
    >
      No good follow-up suggestions found
      <button
        id="suggestions-retry-button"
        style={{
          border: "1px solid #ddd",
          marginLeft: "1rem",
          padding: "1rem 2rem",
          "border-radius": "10rem",
          flexBasis: "content",
          fontSize: "1rem",
          backgroundColor: "white",
        }}
        hx-post="/suggestions"
        hx-trigger="click,retry"
        hx-target="#suggestions-container"
        hx-swap="outerHTML"
      >
        Retry
      </button>
    </div>
  </div>
);

const Suggestion = ({ suggestion }: { suggestion: string }) => (
  <button
    onclick={`setMessageAndSubmit("${suggestion}")`}
    style={{
      border: "1px solid black",
      padding: "1rem 2rem",
      borderRadius: "10rem",
      textAlign: "left",
      fontSize: "0.8rem",
      marginBottom: "0.5rem",
      overflow: "hidden",
      width: "100%",
      height: "55px",
      display: "table-cell",
      verticalAlign: "middle",
    }}
  >
    {suggestion}
  </button>
);
