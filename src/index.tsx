import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Message } from "./components/Message";
import { ChatView } from "./components/ChatView";
import { renderer } from "./renderer";
import { LandingView } from "./components/LandingView";
import { PrivacyView } from "./components/Privacy";
import { About } from "./components/About";
import { getNextMessage, getSuggestions } from "./llm";
import { Suggestions } from "./components/Suggestions";

const ENABLE_NON_KINDLE = true; // Set to true to test on non-Kindle devices

type Bindings = {
  API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("*", renderer);

app.get("/", async (c) => {
  const messages = [];
  if (isKindle(c.req.header("User-Agent"))) {
    return c.render(<ChatView />);
  } else {
    return c.render(<LandingView />);
  }
});

// Endpoint for getting the next message
app.post(
  "/chat",
  zValidator(
    "form",
    z.object({
      messages: z.string(),
      message: z.string(),
    })
  ),
  async (c) => {
    if (!isKindle(c.req.header("User-Agent"))) {
      return c.html(<div>Ooops, an unknown error occured</div>);
    }

    const { message, messages } = c.req.valid("form");
    const nextMessage = await getNextMessage(c.env.API_KEY, messages, message);

    return c.html(<Message message={nextMessage} />);
  }
);

// Endpoint for getting suggestions
app.post(
  "/suggestions",
  zValidator(
    "form",
    z.object({
      messages: z.string(),
    })
  ),
  async (c) => {
    if (!isKindle(c.req.header("User-Agent"))) {
      return c.html(<div>Ooops, an unknown error occured</div>);
    }

    const { messages } = c.req.valid("form");
    const suggestions = await getSuggestions(c.env.API_KEY, messages);

    return c.html(<Suggestions suggestions={suggestions.slice(0, 3)} />);
  }
);

app.get("/robots.txt", (c) => {
  return c.text(
    `
User-agent: ia_archiver
Disallow: /
    `
  );
});

app.get("/privacy", (c) => {
  return c.render(<PrivacyView />);
});

app.post("/about", (c) => {
  return c.render(<About />);
});

// Check the user agent to see if it's a Kindle device
function isKindle(userAgent: string | undefined) {
  return ENABLE_NON_KINDLE || userAgent?.includes("Kindle/3.0+");
}

export default app;
