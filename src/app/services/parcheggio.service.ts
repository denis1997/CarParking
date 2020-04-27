import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Parcheggio} from '../model/parcheggio.model';
import {URL} from '../constants';


@Injectable({
    providedIn: 'root'
})

export class ParcheggioService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<Parcheggio[]> {
        return this.http.get<Parcheggio[]>(URL.PARCHEGGIO);
    }

    findById(parcheggioid: number): Observable<Parcheggio> {
        const apiURL = `${URL.PARCHEGGIO}/${parcheggioid}`;
        return this.http.get<Parcheggio>(apiURL);
    }

}
