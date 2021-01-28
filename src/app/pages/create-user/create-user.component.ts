import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm, PatternValidator } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { countries } from 'src/app/shared/services/countries';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  isNext: boolean;
  userForm: FormGroup;
  upload: any;
  userImage: string;
  userf: FormGroup;
  file: any;
  inputFileValue: string;
  isEmail: boolean;
  listOfCountries = countries;
  addressType: string
  country: string
  regExp = /^[a-zA-Z]+$/
  minMaxLength = [Validators.minLength(3), Validators.maxLength(15)]
  constructor(private fb: FormBuilder, private authService: AuthService, private afStorage: AngularFireStorage) {
    this.createForm()
  }

  ngOnInit(): void { }

  validator(value): any {
    return this.regExp.exec(value);
  }

  valueOfSelect(value, status): void {
    status ? this.addressType = value : this.country = value;

  }

  createForm(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl({ value: '', disabled: false }, [...this.minMaxLength, Validators.pattern(this.regExp)]),
      lastName: new FormControl({ value: '', disabled: false }, [...this.minMaxLength, Validators.pattern(this.regExp)]),
      userName: new FormControl({ value: '', disabled: false }, [...this.minMaxLength, Validators.pattern(this.regExp)]),
      phone: new FormControl({ value: '', disabled: false }, [...this.minMaxLength]),
      email: new FormControl({ value: '', disabled: false }),
      password: new FormControl({ value: '', disabled: false }),
      addressType: new FormControl('home'),
      address: new FormControl({ value: '', disabled: false }, [Validators.maxLength(15), Validators.pattern(this.regExp)]),
      city: new FormControl({ value: '', disabled: false }, [Validators.maxLength(15), Validators.pattern(this.regExp)]),
      country: new FormControl('ukraine'),
      postalCode: new FormControl({ value: '', disabled: false }),
    }); 
  }


  registration(): void {
    this.authService.signUp(
      this.userImage,
      this.userForm.controls.firstName.value,
      this.userForm.controls.lastName.value,
      this.userForm.controls.userName.value,
      this.userForm.controls.phone.value,
      this.userForm.controls.email.value,
      this.userForm.controls.password.value,
      this.addressType,
      this.userForm.controls.address.value,
      this.userForm.controls.city.value,
      this.country,
      this.userForm.controls.postalCode.value
    )
    this.userForm.reset();
    // this.deleteImage();
  }

  uploadFile(event): void {
    this.file = event.target.files[0];
    const filePath = `images/${this.file.name}`;
    this.upload = this.afStorage.upload(filePath, this.file);
    this.upload.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.userImage = url;
        event.target.files = null;
      });
    });
  }

  deleteImage(): void {
    this.afStorage.storage.refFromURL(this.userImage).delete()
      .then(() => {
        this.userImage = '';
        this.inputFileValue = '';
      })
      .catch(err => console.log(err));
  }


}
