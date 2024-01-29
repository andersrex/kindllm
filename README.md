<img src="kindllm.png" width="124">

# Kindllm

A distraction-free LLM chat web app optimized for Kindle. The perfect companion for your book. Powered by Mixtral from Mistral AI. Mainly tested on Kindle Paperwhites.

[https://kindllm.app](https://kindllm.app)

<img src="https://andersrex.com/kindllm.jpg" width="512">

Stack:

- htmx
- Hono
- Zod
- Cloudflare Workers
- Anyscale Endpoints

## Usage

Install:

```
npm install
```

Set your Anyscale Endpoints API key in wrangler.toml

Dev:

```
npm run dev
```

Deploy:

```
npm run deploy
```

## Why?

I got annoyed constantly looking things up on my phone while reading and tried making this app a while back, but couldn't get it to work well on the old Kindle web browser.

Surprisingly, Amazon recently updated the web browser on some Kindles and it now seems to be good enough to run simple interactive apps like this!

## License

MIT License

Copyright (c) 2024 Anders Rex
