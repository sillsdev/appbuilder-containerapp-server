import { locale, register, init, getLocaleFromNavigator } from 'svelte-i18n';

let fallback = 'en';

register('ar', () => import('./locales/ar.json'));
register('de', () => import('./locales/de.json'));
register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));
register('fil', () => import('./locales/fil.json'));
register('fr', () => import('./locales/fr.json'));
register('id', () => import('./locales/id.json'));
register('ru', () => import('./locales/ru.json'));
register('zh', () => import('./locales/zh.json'));

init({
    initialLocale: getLocaleFromNavigator(),
    fallbackLocale: fallback
});

locale.set('en');
