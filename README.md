# Crowdis
Crowdis facilitates an bridge between Crowdin webhooks and Discord channels. 

## Getting started
⚠️ **Make sure you have the default payload in Crowdin!** If not, you will have to manually restructure the entire `strings.json` file as it's made with the default structure in mind! (see https://github.com/GNosii/crowdis/issues/1)

### Hosted worker
I have an worker at `https://crowdis.amarox.workers.dev/` in your **Webhook Details** menu you can use for testing Crowdis. Be aware this worker has an limit of 100.000 daily requests.

### Deploy your own worker
You can deploy your own Cloudflare Worker by clicking the button below.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/GNosii/crowdis)

### Using Crowdis
You can start using Crowdis by replacing `https://discord.com/api/webhooks/` with your worker's URL (or the hosted worker's URL: `https://crowdis.amarox.workers.dev/`) in your **Webhook Details** menu.

## Background
Crowdis is an complete rewrite of **[c2d](https://github.com/GNosii/c2d)**, which is an fork of **[crowdin-discord-webhooks by the Switchblade team](https://github.com/SwitchbladeBot/crowdin-discord-webhooks)**. The goal of c2d was to fix the countless issues with crowdin-discord-webhooks, like:
- **⌨️ Hard to deploy to CF Workers:** Crowdis allows quick self deployment with its [deploy button](https://developers.cloudflare.com/workers/platform/deploy-button), with one click you can have your own instance running in Cloudflare Workers.
- **🤨 Missing event types:** Crowdis added the missing event types, reported in https://github.com/SwitchbladeBot/crowdin-discord-webhooks/issues/1.
- **📷 Missing profile picture:** Crowdis now uses Crowdin own brand assets instead of an Twitter image [as seen here](https://github.com/SwitchbladeBot/crowdin-discord-webhooks/blob/4e86d3ac0351f12510d3f36cbcb9744d3d4bc58b/index.js#L70).
- **🗂️ Didn't support bundled events:** Crowdis is made from the ground up to support and operate with bundled events.

While it solved these issues, it had issues of its own:
- **🍜 Spaghetti code:** It was pretty hard to understand c2d's code, which made bug fixing ~~hard~~ impossible.
- **🗄️ Hard to keep updated:** New event types had to be hard-coded in, and there was no consistency for event handling.
- **🔨 Hard-coded values:** Because I didn't know the patterns in the Crowdin webhook payloads, it had a lot of redundant and unnecessary variables, like project URLs, language names and more, this was fixed by using the payload over hard-coded values!
- **🩹 A mess overall:** I abandoned the project and left it to its own luck for quite a long time, sorry! Crowdis is made to be as robust as possible, adjusting to Crowdin updates should be as easy as changing `strings.json`


