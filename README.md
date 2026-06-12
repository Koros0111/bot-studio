# Bot Studio

Bot Studio is a browser-based Telegram Bot API workspace for exploring methods, building request payloads, and sending test calls directly to Telegram. It ships with a generated Bot API schema, a searchable method browser, synced parameter forms, editable request JSON, and GitHub Pages-ready static output.

The app runs entirely in the browser. Bot tokens are only used client-side for requests to `https://api.telegram.org` and are not stored by the app.

## Features

- Search and browse generated Telegram Bot API methods.
- Generate parameter forms from the local Bot API schema.
- Edit either form fields or the request JSON and keep both in sync.
- Preserve custom request JSON keys that are not part of the selected method form.
- Send requests directly to Telegram from the browser.
- View and copy request/response JSON.
- Build static output into `docs/` for GitHub Pages.
- Update the Telegram Bot API schema manually or on an hourly GitHub Action.

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Lucide icons

## Project Structure

```text
public/schema/bot-api.json     Canonical Telegram Bot API schema
docs/                          GitHub Pages build output
scripts/                       Schema update, normalize, and validation scripts
src/                           Vue application source
.github/workflows/             Hourly schema update workflow
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production site:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Scripts

| Command                    | Description                                                            |
| -------------------------- | ---------------------------------------------------------------------- |
| `npm run dev`              | Start Vite dev server.                                                 |
| `npm run build`            | Validate scripts/schema, type-check Vue, and build into `docs/`.       |
| `npm run preview`          | Preview the built site locally.                                        |
| `npm run validate`         | Validate the canonical schema in `public/schema/bot-api.json`.         |
| `npm run validate:pages`   | Validate that `docs/schema/bot-api.json` matches the canonical schema. |
| `npm run schema:update`    | Fetch and regenerate the Telegram Bot API schema.                      |
| `npm run schema:check`     | Check whether the local schema is current.                             |
| `npm run schema:normalize` | Normalize schema text and remove unsupported legacy fields.            |

## Schema Workflow

`public/schema/bot-api.json` is the source of truth. Vite copies it into `docs/schema/bot-api.json` during build so GitHub Pages can serve the same schema used by the app.

To update manually:

```bash
npm run schema:update
npm run schema:normalize
npm run build
npm run validate:pages
```

The workflow at `.github/workflows/update-bot-api-schema.yml` runs every hour. It updates the schema, rebuilds `docs/`, validates the Pages output, and commits only when something actually changed.
