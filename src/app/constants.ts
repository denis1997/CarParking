export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost:8080/myunivaq/api';

export const URL = {
    LOGIN: URL_BASE + '/login',
    LOGOUT: URL_BASE + '/logout',
    NUOVO_UTENTE: URL_BASE + '/login/registrazione',
    UPDATE_PROFILO: URL_BASE + '/utente/updateprofilo',
    PARCHEGGIO: URL_BASE + '/parcheggio',
    RECENSIONI: URL_BASE + '/recensioni',
    UTENTE: URL_BASE + '/utente',
    UPDATE_POSITION: URL_BASE + '/utente/updateposition',
    PREFERITI: URL_BASE + '/preferiti',

};

export const X_AUTH = 'X-Auth';

export const AUTH_TOKEN = 'auth-token';

export const UTENTE_STORAGE = 'utente';

export const LINGUA = 'lingua';
