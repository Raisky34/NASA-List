import LocalizedStrings from 'react-localization';
import { en } from './en.jsx';
import { ru } from './ru.jsx';
import { ar } from './ar.jsx';

export function getDefaultLocale() {
    return 'en'
}

export function getUserLocale() {
    return (!navigator || !navigator.language) ? undefined : navigator.language.substr(0, 2)
}

export function setLocale(locale) {
    localStorage.locale = locale;
    location.reload()
}

export function getLocale() {
    return localStorage.locale || getUserLocale() || getDefaultLocale();
}

export function getLocaleList() {
    return ['ar', 'en', 'ru'];
}

export function setLocalization(){
  strings.setLanguage(localStorage.locale || getDefaultLocale())
}

export let strings = new LocalizedStrings({
  en,
  ru,
  ar
});
