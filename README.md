# Bring Your Own Prompt (BYOP)

**Make your next prompt better.**

BYOP is a free weekly Zoom workshop where people share, test, and improve the prompts behind real work. It is a hands-on sister community to [AI Huddle](https://numerate64.github.io/aihuddle/).

## What the site includes

- A responsive launch page explaining the BYOP format
- Four practical prompt tracks: work, build, create, and learn
- A short prompt-preparation checklist
- An accessible on-site submission dialog that opens a prefilled GitHub issue
- Direct GitHub issue forms, a code of conduct, and contribution guidance
- No analytics, cookies, build step, or third-party runtime assets

## Run locally

```bash
python3 -m http.server 8080
```

Open <http://localhost:8080>.

## Before launch

Replace “Launching soon” and the schedule FAQ answer in `index.html` with the confirmed recurring day and time. When a Zoom registration or mailing-list URL is available, add it to the primary calls to action.

## Prompt submissions

The on-site form does not write directly to GitHub. It encodes the submitted fields into a prefilled public GitHub issue for the visitor to review and submit. Visitors can also use the repository’s issue form directly.

## License

Site code is available under the [MIT License](LICENSE). Community participation is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).
