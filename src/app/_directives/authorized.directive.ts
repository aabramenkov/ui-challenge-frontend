import {
  Directive,
  ViewContainerRef,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Directive({
  selector: '[appAuthorized]',
})
export class AuthorizedDirective implements OnInit {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  isVisible = false;

  ngOnInit(): void {
    this.authService.loginStatus$.subscribe((status) => {
      if (status) {
        if (!this.isVisible) {
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    });
  }
}
