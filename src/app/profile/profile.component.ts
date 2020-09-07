import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  @ViewChild('editForm') editForm!: NgForm;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertify: AlertifyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data.user.user;
    });
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe(
      (next) => {
        this.alertify.success('Profile updated successfully');
        this.editForm.reset(this.user);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
  deleteUser() {
    if (!this.user.email){
      return;
    }
    this.userService.deleteUser(this.user.email).subscribe(
      () => {
        this.alertify.success('Profile deleted');
        this.router.navigate(['/home']);
      },
      (err) => {
        this.alertify.error('you cant delete yourself');
      }
    );
  }
}
