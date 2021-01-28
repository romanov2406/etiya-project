import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators, PatternValidator } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  signInForm: FormGroup;
  regExp = /^[a-zA-Z]+$/
  isLogin: boolean;
  minMaxLength = [Validators.minLength(3), Validators.maxLength(15)];
  subject = new Subject<number>();

  constructor(
    private modalService: BsModalService,
    private authServeice: AuthService
  ) { }

  ngOnInit() {
    this.checkUser();
  }


  // createForm():void{
  //   this.signInForm = new FormGroup({
  //     email: new FormControl({ value: '', disabled: false }, [...this.minMaxLength, Validators.pattern(this.regExp)]),
  //     password: new FormControl({ value: '', disabled: false }, [...this.minMaxLength, Validators.pattern(this.regExp)])
  //   })
  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  signIn(email: string, password: string): void {
    this.authServeice.signIn(email, password);
  }

  checkUser(): void {
    this.authServeice.userStatus.subscribe(
      () => {
        if (localStorage.getItem('user')) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    )
  }
}
