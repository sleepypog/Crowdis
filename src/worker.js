import { normalize, setupLanguage, string } from "./strings";

// Webhook avatar and username, displayed on Discord
const WEBHOOK_USERNAME = "Crowdis";
const WEBHOOK_AVATAR = "https://support.crowdin.com/assets/logos/symbol/png/crowdin-symbol-cWhite.png";

// Base webhook endpoint
const WEBHOOK_BASE_URL = "https://discordapp.com/api/webhooks"

addEventListener('fetch', (event) => {
    if (event.request.method !== "POST") {
        return event.respondWith(new Response(
            'This endpoint only accepts POST requests',
            {
                status: 400,
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
    setupLanguage();

    const { pathname, searchParams } = new URL(request.url)

    if (pathname === "/") {
        return new Response(
            'Invalid endpoint.',
            {
                status: 400,
            }
        );
    }

    const preferEmbed = searchParams.has('embed');
    const testWebhook = searchParams.has('test');

    const data = await request.json();

    let events = [];

    if (data.event !== undefined)
        events = [data];
    else
        events = data.events;

    const summaries = [];
    events.forEach((event) => {
        console.log(event);
        summaries.push('- ' + string(event.event, event));
    });

    let body;
    
    if (preferEmbed) {
        body = {
            embeds: [
                {
                    title: string('webhook.header', { project: events[0].project }),
                    description: normalize(summaries),
                    url: null,
                    timestamp: new Date(Date.now()).toISOString(),
                    color: null,
                    footer: {
                        text: null,
                        icon_url: null
                    },
                    image: {
                        url: null
                    },
                    thumbnail: {
                        url: null
                    },
                    author: {
                        name: null,
                        url: null,
                        icon_url: null
                    },
                    fields: []
                }
            ]
        }
    } else {
        body = {
            "content": normalize([
                string('webhook.header', {}),
            ].concat(summaries))
        }
    }

    try {
        await sendWebhook(pathname, body);
    } catch (err) {
        console.error('Error while sending webhook: ' + err.toString())
        return new Response(
            'Internal error',
            {
                status: 500
            }
        )
    }

    return new Response('Processed successfully', {
        status: 200
    });
}

async function sendWebhook(path, content) {
    const auth = {
        username: WEBHOOK_USERNAME,
        avatar_url: WEBHOOK_AVATAR,
    }
    
    return fetch(WEBHOOK_BASE_URL + path, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.assign(content, auth))
    })
}
