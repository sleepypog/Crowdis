import i18next from 'i18next';
import strings from './strings.json';

function setupLanguage() {
    i18next.init({
            lng: 'en',
            fallbackLng: false,
            nsSeparator: false,
            resources: strings,
            initImmediate: true,
        });
}

function string(key, data) {
    return i18next.t(key, data);
}

function normalize(array) {
    return (array.join("\n")).trim();
}

export {
    setupLanguage,
    string,
    normalize
}
