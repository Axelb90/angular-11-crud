import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import {tap, catchError} from 'rxjs/operators';
import { of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
  };

  addTutorialForm = new FormGroup({
    tutorialTitle: new FormControl('', Validators.required),
    tutorialDescription: new FormControl('', Validators.required),
  });
  submitted = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data= {
      title: this.addTutorialForm.value.tutorialTitle,
      description: this.addTutorialForm.value.tutorialDescription
    }
    const createSub = this.tutorialService.create(data)
      .subscribe(
        response =>{
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error)
          createSub.unsubscribe();
        },
        () => {
          createSub.unsubscribe();
        }
      );
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false,
    };
  }

  saveTutorial2(): void {
    console.log(this.addTutorialForm.value)
    const {tutorialTitle,tutorialDescription} = this.addTutorialForm.value

    this.tutorialService.create({tutorialTitle, tutorialDescription}).pipe(
      tap(()=> {
        this.submitted = true;
      }),
      catchError(err => {
        console.log(err)
        return of();
      })
    )
  
  }

}
