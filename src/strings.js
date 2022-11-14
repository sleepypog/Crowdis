import strings from "./strings.json";
import { init } from 'i18next';

/**
 * @type {import('i18next').TFunction}
 */
let i18n;

async function setupLanguage() {
    i18n = await init({
        lng: 'en',
        resources: strings
    }, (err, t) => {
        if (err) 
            console.error(err);
        i18n = t;
    });
}

function getSummary(event) {
    return i18n(event.event, { event });
}

export {
    setupLanguage,
    getSummary
}
