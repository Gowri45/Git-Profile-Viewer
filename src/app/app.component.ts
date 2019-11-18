import { Component } from '@angular/core';
import { GitServiceService } from '../app/git-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'git-profile-viewer';
  name: any;
  data: any;
  showSpinner: boolean;
  errormsg = false;
  constructor(private gitService: GitServiceService, private snackBar: MatSnackBar) {
  }
  search() {
    this.showSpinner = true;
    console.log(this.name);
    if (this.name) {
      const localData = localStorage.getItem(this.name);
      if (localData) {
        this.data = JSON.parse(localData);
        this.showSpinner = false;
      } else {
      this.gitService.getProfile(this.name).subscribe(Response => {
      this.data = Response;
      console.log(Response);
      this.showSpinner = false;
      this.errormsg = false;
      localStorage.setItem(this.name, JSON.stringify(this.data));
    },
    err => {
      this.errormsg = true;
      this.showSpinner = false;
      this.data = false;
      this.snackBar.open(err.error.message, 'close', {
          duration: 2000,
        });
    });
  } } else {
    this.errormsg = true;
    this.showSpinner = false;
    this.snackBar.open('No Input', 'close', {
      duration: 2000,
    });
  }
  }
}
