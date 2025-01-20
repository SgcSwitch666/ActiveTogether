import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Registration } from '../../shared/Interfaces/Registration';

@Component({
    selector: 'app-data',
    imports: [SharedModule,
      MatProgressSpinnerModule
    ],
    templateUrl: './data.component.html',
    styleUrl: './data.component.css'
})
export class DataComponent {
  sortOrder: 'asc' | 'desc' = 'asc';
  sortedRegistrations: Registration[] = [];
  loadingMap: { [key: number]: boolean } = {};

  constructor(public http:HttpClient, public storeService: StoreService, private backendService: BackendService) {}

  public page: number = 0;
  registration: any;

  ngOnInit() {
    this.updateSortedRegistrations();
    
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.updateSortedRegistrations();
  }

  updateSortedRegistrations() {
    this.sortedRegistrations = [...this.storeService.registrations].sort((a, b) => {
      const dateA = new Date(a.registrationDate).getTime();
      const dateB = new Date(b.registrationDate).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  cancelRegistration(registrationId: any) {
    this.loadingMap[registrationId] = true;
    const id = +registrationId;
    if (confirm('Möchten Sie die Anmeldung wirklich stornieren?')) {
      this.http.delete(`http://localhost:5000/registrations/${registrationId}`).subscribe({
        next: () => {
          this.storeService.registrations = this.storeService.registrations.filter(
            (registration) => registration.id !== registrationId.toString()
          );
          delete this.loadingMap[registrationId];
          alert('Die Anmeldung wurde erfolgreich storniert.');
        },
        error: (err) => {
          delete this.loadingMap[registrationId];
          console.error('Fehler beim Löschen der Anmeldung:', err);
          alert('Beim Stornieren der Anmeldung ist ein Fehler aufgetreten.');
        },
      });
    }
  }

  sortRegistrations(sortDirection: string) {
    if (sortDirection === 'asc') {
      this.storeService.registrations.sort((a, b) => new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime());
    } else {
      this.storeService.registrations.sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime());
    }
  }

  selectPage(i: any) {
    let currentPage = i;
    this.storeService.currentPage = i;
    this.backendService.getRegistrations(currentPage);
  }

  public returnAllPages() {
    var pagesCount = Math.ceil(this.storeService.registrationTotalCount / 2);
    let res = [];
    for (let i = 0; i < pagesCount; i++) {
        res.push(i + 1);
      }
    return res;
  }

}

