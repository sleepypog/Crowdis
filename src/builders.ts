import { EventPayload } from "./types/crowdin"
import { EventType } from "./types/EventType"
import { Embed } from "./types/discord"

function buildEmbed(event): Embed {
    return {
        title: '',
        color: '',
        image: {
            url: ''
        },
        thumbnail: {
            url: '',
        },
        author: {
            name: '',
            url: '',
            icon_url: '',
        },
        footer: {
            text: '',
            icon_url: ''
        }
    }
}

function buildPlain(): string {
    return ''
}

function buildRaw(data: EventPayload): string {
    return '```json\\n\n' + data + '\n```'
}

export {
    buildEmbed,
    buildPlain,
    buildRaw
}
