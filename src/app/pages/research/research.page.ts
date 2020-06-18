import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Parcheggio} from '../../model/parcheggio.model';
import {ParcheggioService} from '../../services/parcheggio.service';
import {NavController} from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {NavigationExtras} from '@angular/router';



@Component({
  selector: 'app-research',
  templateUrl: './research.page.html',
  styleUrls: ['./research.page.scss'],
})
export class ResearchPage implements OnInit {
  private parcheggio$: Observable<Parcheggio[]>;
  private parcheggi: Parcheggio[] = [];
  public searchControl: FormControl;
  private ricerca = '';
  private cittaselezionata: string;




  constructor(private parcheggioService: ParcheggioService,
              private navController: NavController,) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.parcheggio$ = this.parcheggioService.list();
    // this.filterItems('');

    // this.searchControl.valueChanges
    //     .pipe(debounceTime(700))
    //     .subscribe(search => {
    //       this.filterItems(search);
    //     });
  }

  // initFilteredItems() {
  //   this.parcheggio$.subscribe(data => {
  //     this.parcheggi = data;
  //   });
  // }

  // filterItems(searchTerm) {
  //   // In case the `this.filteredItems` has been used before e.g.
  //   // containing a subset of `this.items`, we need to make it hold
  //   // a reference to the `this.items` again, which contains the
  //   // whole set of objects.
  //   this.initFilteredItems();
  //   // Get the new input-value
  //
  //   // Make sure it contains a value and remove trailing whitespaces
  //   this.parcheggi = this.parcheggi.filter(parcheggio => {
  //       return (parcheggio.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
  //           (parcheggio.provincia.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
  //           (parcheggio.latitude) || (parcheggio.longitude) || (parcheggio.costo);
  //     });
  // }
  maps(lat, long) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        lat,
        long
      }
    };
    this.navController.navigateForward('maps', navigationExtras);
  }

  resetCitta() {
    this.cittaselezionata = '';
  }

}
