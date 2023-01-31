import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Content } from './content';
import  {ContentService } from './content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit{
  
 title(title: any) {
   throw new Error('Method not implemented.');
 }
 public contents: Content[];
 public editContent: Content;
 public deleteContent: Content;
 
 constructor(private contentService: ContentService){}

 ngOnInit() {
     this.getContents();  
 }

 public getContents(): void {
  this.contentService.getContents().subscribe(
    (response: Content[]) => {
      this.contents = response;
      console.log(this.contents);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onAddContent(addForm: NgForm): void {
  document.getElementById('add-content-form').click();
  this.contentService.addContent(addForm.value).subscribe(
    (response: Content) => {
      console.log(response);
      this.getContents();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  );
}
public onUpdateContent(content: Content): void {
  this.contentService.updateContent(content).subscribe(
    (response: Content) => {
      console.log(response);
      this.getContents();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public onDeleteContent(contentId: number): void {
  this.contentService.deleteContent(contentId).subscribe(
    (response: void) => {
      console.log(response);
      this.getContents();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
// public searchContents(key: string): void {
//   console.log(key);
//   const results: Content[] = [];
//   for (const content of this.contents) {
//     if (content.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
//     || content.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
//     || content.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
//     || content.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
//       results.push(content);
//     }
//   }
//   this.contents = results;
//   if (results.length === 0 || !key) {
//     this.getContents();
//   }
// }


public onOpenModal(content: Content, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addContentModal');
  }
  if (mode === 'edit') {
    this.editContent = content;
    button.setAttribute('data-target', '#updateContentModal');
  }
  if (mode === 'delete') {
    this.deleteContent = content;
    button.setAttribute('data-target', '#deleteContentModal');
  }
  container.appendChild(button);
  button.click();
}


}
