import { setupLanguage, getSummary } from "./strings";

// Webhook avatar and username, displayed on Discord
const WEBHOOK_USERNAME = "Crowdin Updates";
const WEBHOOK_AVATAR = "";

// Base webhook endpoint
const WEBHOOK_BASE_URL = "https://discordapp.com/api/webhooks%s"

addEventListener('fetch', (event) => {
    console.debug('EventListener');

    if (event.request.method !== "POST") {
        return event.respondWith(new Response(
            'This endpoint only accepts POST requests',
            {
                status: 400
            }
        ));
    }

    try {
        event.respondWith(handleFetch(event.request))
    } catch (error) {
        console.error('Internal server error: ' + error.message)
        event.respondWith(new Response(
            'Internal error',
            {
                status: 500
            }
        ))
    }
});

async function handleFetch(request) {
    await setupLanguage();

    const url = new URL(request.url)

    const preferRaw = url.searchParams.has('raw');
    const preferEmbed = !preferRaw && url.searchParams.has('embed');

    const data = await request.json();

    let events = [];

    if (data.event !== undefined)
        events = [ data ];
    else
        events = data.events;

    events.forEach((event) => {
        const summary = getSummary(event);
        console.debug('Summary: ' + summary)
    });

    return new Response();
}
