import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Parcheggio} from '../model/parcheggio.model';
import {URL} from '../constants';
import {Recensione} from '../model/recensione.model';
import {Preferiti} from '../model/preferiti.model';


@Injectable({
    providedIn: 'root'
})

export class ParcheggioService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<Parcheggio[]> {
        return this.http.get<Parcheggio[]>(URL.PARCHEGGIO);
    }

    findById(parcheggioId: number): Observable<Parcheggio> {
        const apiURL = `${URL.PARCHEGGIO}/${parcheggioId}`;
        return this.http.get<Parcheggio>(apiURL);
    }


    listRecensioni(idParcheggio): Observable<Recensione[]> {
        const recensioniUrl = `${URL.PARCHEGGIO}/${idParcheggio}/recensioni`;
        return this.http.get<Recensione[]>(recensioniUrl);
    }

    createRecensione(recensione: Recensione) {
        return this.http.post<Recensione>(URL.RECENSIONI, recensione);
    }

    listPreferiti(idUtente): Observable<Preferiti[]> {
        const preferitiUrl = `${URL.PREFERITI}/${idUtente}`;
        return this.http.get<Preferiti[]>(preferitiUrl);
    }

    listPreferitiByIdUtente(utenteId: number) {
        const apiUrl = `${URL.PREFERITI}/${utenteId}`;
        return this.http.get<Preferiti[]>(apiUrl);
    }

    createPreferito(preferito: Preferiti) {
        return this.http.post<Preferiti>(URL.PREFERITI, preferito);
    }

    deletePreferito(preferito: Preferiti) {
        const deleteUrl = `${URL.PREFERITI}/${preferito.id}`;
        return this.http.delete<Preferiti>(deleteUrl);
    }

}
