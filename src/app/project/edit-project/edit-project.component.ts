import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import * as _ from 'lodash';

import {NotificationService} from '../../core/services';
import {ApiService} from '../../core/services';
import {ResourceType} from '../../shared/entity/LabelsEntity';
import {
  EditProjectEntity,
  ProjectEntity,
} from '../../shared/entity/ProjectEntity';
import {AsyncValidators} from '../../shared/validators/async-label-form.validator';

@Component({
  selector: 'km-edit-project',
  templateUrl: './edit-project.component.html',
})
export class EditProjectComponent implements OnInit {
  @Input() project: ProjectEntity;
  labels: object;
  form: FormGroup;
  asyncLabelValidators = [
    AsyncValidators.RestrictedLabelKeyName(ResourceType.Project),
  ];

  constructor(
    private api: ApiService,
    private dialogRef: MatDialogRef<EditProjectComponent>,
    private readonly _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.labels = _.cloneDeep(this.project.labels);

    this.form = new FormGroup({
      name: new FormControl(this.project.name, [Validators.required]),
      labels: new FormControl(''),
    });
  }

  editProject(): void {
    const project: EditProjectEntity = {
      name: this.form.controls.name.value,
      labels: this.labels,
    };

    // Remove nullified labels as project uses PUT endpoint, not PATCH, and labels component returns patch object.
    // TODO: Make the labels component customizable so it can return patch (current implementation)
    //  or entity (without nullified labels).
    // TODO: Implement and use PATCH endpoint for project edits.
    for (const label in project.labels) {
      if (
        project.labels.hasOwnProperty(label) &&
        project.labels[label] === null
      ) {
        delete project.labels[label];
      }
    }

    this.api.editProject(this.project.id, project).subscribe(project => {
      this.dialogRef.close(project);
      this._notificationService.success(
        `The <strong>${this.project.name}</strong> project was updated`
      );
    });
  }
}
