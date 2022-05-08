import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { forkJoin } from 'rxjs';
import { IChalet } from 'src/app/model/chalet.model';
import { SharedObjectService } from 'src/app/shared/shared-object.service';
import { environment } from 'src/environments/environment';
import { ChaletService } from '../services/chalet.service';

@Component({
  selector: 'app-add-chalet-modal',
  templateUrl: './add-chalet-modal.component.html',
  styleUrls: ['./add-chalet-modal.component.scss']
})
export class AddChaletModalComponent implements OnInit {
  isEditMode: boolean;
  chlaetForUpdate: IChalet;
  configDz: DropzoneConfigInterface = {
    url: `${environment.serverUrl}/uploadOnlyFile`,
    thumbnailWidth: 160,
    clickable: true,
    // tslint:disable-next-line: max-line-length
    previewTemplate: '<div class="dz-preview dz-file-preview mb-3"><div class="d-flex flex-row "><div class="p-0 w-30 position-relative"><div class="dz-error-mark"><span><i></i></span></div><div class="dz-success-mark"><span><i></i></span></div><div class="preview-container"><img data-dz-thumbnail class="img-thumbnail border-0" /><i class="simple-icon-doc preview-icon" ></i></div></div><div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative"><div><span data-dz-name></span></div><div class="text-primary text-extra-small" data-dz-size /><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div><a href="#/" class="remove" data-dz-remove><i class="glyph-icon simple-icon-trash"></i></a></div>'

  };
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-center'
  };
  categories = [
    { label: 'Cakes', value: 'chocolate' },
    { label: 'Cupcakes', value: 'vanilla' },
    { label: 'Desserts', value: 'strawberry' }
  ];
  chalet: IChalet = {
    images: []
  };
  imgs: any[] = []
  isLoading = false;
  @ViewChild('template', { static: true }) template: TemplateRef<any>;
  chaletForm: FormGroup;
  numberRegEx = /\-?\d*\.?\d{1,2}/;

  @Output() savedChalet: EventEmitter<IChalet> = new EventEmitter<IChalet>();
  @Output() updatedChalet: EventEmitter<IChalet> = new EventEmitter<IChalet>();


  constructor(private modalService: BsModalService, private chaletService: ChaletService, private sharedObjectService: SharedObjectService) { 
   
  }

  ngOnInit(): void {
  

    this.sharedObjectService.currenIsChaletInEditMode.subscribe(res=>{
        this.isEditMode = res;
        
    })
    this.sharedObjectService.currentChaletForUpdate.subscribe(res=>{
      this.chlaetForUpdate = res;
      if (!this.chlaetForUpdate) {
        this.chaletForm = new FormGroup({
          description: new FormControl(null, [Validators.required]),
          adresse: new FormControl(null, [Validators.required]),
          prix: new FormControl(null, [Validators.required]),
          etat: new FormControl(null, [Validators.required]),
          ville: new FormControl(null, [Validators.required]),
          codeZip: new FormControl(null, [Validators.required]),
          maxAdulte: new FormControl(null, [Validators.required]),
          maxEnfant: new FormControl(null, [Validators.required]),
          maxBebe: new FormControl(null, [Validators.required]),
          maxAnimal: new FormControl(null, [Validators.required]),
        });
      }
      else {
        this.chaletForm = new FormGroup({
          description: new FormControl(this.chlaetForUpdate.description, [Validators.required]),
          adresse: new FormControl(this.chlaetForUpdate.adresse, [Validators.required]),
          prix: new FormControl(this.chlaetForUpdate.prix, [Validators.required]),
          etat: new FormControl(this.chlaetForUpdate.etat, [Validators.required]),
          ville: new FormControl(this.chlaetForUpdate.ville, [Validators.required]),
          codeZip: new FormControl(this.chlaetForUpdate.codeZip, [Validators.required]),
          maxAdulte: new FormControl(this.chlaetForUpdate.maxAdulte, [Validators.required]),
          maxEnfant: new FormControl(this.chlaetForUpdate.maxEnfant, [Validators.required]),
          maxBebe: new FormControl(this.chlaetForUpdate.maxBebe, [Validators.required]),
          maxAnimal: new FormControl(this.chlaetForUpdate.maxAnimal, [Validators.required]),
        });
      }    })
    
  }

  show() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  onSubmit() {
    this.chalet = {
      description: this.chaletForm.controls.description.value,
      adresse: this.chaletForm.controls.adresse.value,
      etat: this.chaletForm.controls.etat.value,
      ville: this.chaletForm.controls.ville.value,
      codeZip: this.chaletForm.controls.codeZip.value,
      prix: this.chaletForm.controls.prix.value,
      maxAdulte: this.chaletForm.controls.maxAdulte.value,
      maxEnfant: this.chaletForm.controls.maxEnfant.value,
      maxBebe: this.chaletForm.controls.maxBebe.value,
      maxAnimal: this.chaletForm.controls.maxAnimal.value,
      images: this.imgs,
    }
    this.isLoading = true;
    if(this.isEditMode){
      console.log('chalet:', this.chalet);
      this.chaletService.patch(this.chlaetForUpdate.id, this.chalet).subscribe(res=>{
        this.isLoading = false;
        this.updatedChalet.emit(res);
        this.modalRef.hide();
      });
    }else{
      console.log('chalet:', this.chalet);
      this.chaletService.save(this.chalet).subscribe(res => {
        this.isLoading = false;
        this.savedChalet.emit(res);
        this.modalRef.hide();
      })
    }
  }
  onUploadError($event): void {
  }
  onUploadSuccess($event): void {
    this.imgs.push({ id: $event[1].id })
  }
}
