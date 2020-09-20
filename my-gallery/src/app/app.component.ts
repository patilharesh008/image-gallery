import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public imagePreview: string;
  form: FormGroup;
  fileData: any;
  ngOnInit(){
    this.form = new FormGroup({
      image: new FormControl()
       });

       this.dataService.getImage().subscribe(data =>{
        this.fileData = data;

       });
  }
  constructor(private dataService: DataService){}
  onImagePicker(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];

    // this.form.patchValue({image: file});

    this.onSubmit(file);
    // this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
    onSubmit(image) {
      this.dataService.addImage(image);
    }
    
   
}
