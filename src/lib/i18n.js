import { locale, register, init, getLocaleFromNavigator } from 'svelte-i18n';

let initialLocale = 'en';

register('ar', () => import('../stores/locales/ar.json'));
register('de', () => import('../stores/locales/de.json'));
register('en', () => import('../stores/locales/en.json'));
register('es', () => import('../stores/locales/es.json'));
register('fil', () => import('../stores/locales/fil.json'));
register('fr', () => import('../stores/locales/fr.json'));
register('id', () => import('../stores/locales/id.json'));
register('ru', () => import('../stores/locales/ru.json'));
register('zh', () => import('../stores/locales/zh.json'));

init({
    initialLocale: initialLocale,
    fallbackLocale: getLocaleFromNavigator()
});

locale.set('en');
