import { Logo } from "./Logo";

export const LandingView = () => (
  <div style={{ width: "100%" }}>
    <div
      style={{
        padding: "1rem",
        maxWidth: "512px",
        margin: "2rem auto",
        lineHeight: "1.5rem",
      }}
    >
      <div
        style={{
          margin: "auto",
          display: "block",
        }}
      >
        <Logo />
      </div>

      <h1
        style={{
          margin: "0",
          textAlign: "center",
        }}
      >
        Kindllm
      </h1>
      <p
        style={{
          margin: "2rem 0",
          textAlign: "center",
        }}
      >
        A distraction-free LLM chat web app optimized for Kindle. The perfect companion for your book. Powered by
        Mixtral from Mistral AI. Mainly tested on Kindle Paperwhites.
      </p>
      <p
        style={{
          margin: "2rem 0",
          textAlign: "center",
        }}
      >
        <a
          style={{
            color: "black",
          }}
          href="https://github.com/andersrex/kindllm"
        >
          View on GitHub
          <svg
            style={{
              marginLeft: "0.5rem",
              verticalAlign: "middle",
            }}
            width="24"
            height="24"
            viewBox="0 0 98 98"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
              fill="#24292f"
            />
          </svg>
        </a>
      </p>

      <img
        src="https://andersrex.com/kindllm.jpg"
        style={{
          width: "100%",
          maxWidth: "512px",
          border: "1px solid #dedede",
          borderRadius: "0.5rem",
        }}
      />
      <h3>Demo</h3>
      <p
        style={{
          marginBottom: "1rem",
        }}
      >
        <video
          muted
          controls
          style={{
            width: "100%",
            maxWidth: "512px",
            border: "1px solid #dedede",
            borderRadius: "0.5rem",
          }}
        >
          <source src="https://andersrex.com/kindllm.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </p>
      <h3>Why?</h3>
      <p
        style={{
          marginBottom: "1rem",
        }}
      >
        I got annoyed constantly looking things up on my phone while reading and tried making this app a while back, but
        couldn't get it to work well on the old Kindle web browser.
      </p>
      <p>
        Surprisingly, Amazon recently updated the web browser on some Kindles and it now seems to be good enough to run
        simple interactive apps like this!
      </p>
      <p>Get in touch if you have any questions! kindllm@fastmail.com</p>
    </div>

    <footer
      style={{
        fontSize: "1rem",
        textAlign: "center",
        width: "100%",
        color: "#888",
        padding: "1rem",
        backgroundColor: "white",
        marginTop: "auto",
      }}
    >
      <a
        href="https://twitter.com/andersrex"
        style={{
          color: "#888",
        }}
      >
        Follow me on Twitter
      </a>{" "}
    </footer>
    <div id="about-container"></div>
  </div>
);
