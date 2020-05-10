import {Utente} from './utente.model';
import {Parcheggio} from './parcheggio.model';

export class Recensione {
    id: number;
    nome: string;
    descrizione: string;
    utente: Utente;
    parcheggio: Parcheggio;
    rating: number;
    date: Date;
}
