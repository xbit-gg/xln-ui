import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {Observable, Observer} from "rxjs";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class BrowserClientService {

  modeControl = new FormControl(false);

  constructor(private cookieService: CookieService) {
    this.modeControl.setValue(this.isDarkmode());
  }

  public isSmallScreen(): boolean {
    return window.innerWidth < 1281;
  }

  public isDarkmode(): boolean {
    return !localStorage.getItem('light_mode');
  }

  public toggleDarkmode(): void {
    if (this.isDarkmode()) {
      localStorage.setItem('light_mode', 'true');
    } else {
      localStorage.removeItem('light_mode');
    }
    this.modeControl.setValue(this.isDarkmode());
  }

  public subscribeDarkmode(): Observable<boolean> {
    return this.modeControl.valueChanges;
  }
}
