import { Component } from '@angular/core';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
constructor(private _toastrService:ToastrService){}
}
