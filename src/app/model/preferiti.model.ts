import {Utente} from './utente.model';
import {Parcheggio} from './parcheggio.model';

export class Preferiti {
    id: number;
    utente: Utente;
    parcheggio: Parcheggio;
    aggiunto: boolean;
}
