import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  isEditMode: boolean = false; // متغير لتتبع وضع التعديل

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getAuthUser().subscribe(
      res => this.user = res
    );
  }

  // دالة لتبديل وضع التعديل
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
}
