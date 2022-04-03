import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './probleme';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  categoriesProbleme: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder,private problemes: ProblemeService) { }

  ngOnInit(): void {
    
    
    this.problemeForm=this.fb.group({
      prenom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]], 
    nom:['', Validators.required ],noTypeProbleme: ['', Validators.required], 
    courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
  });
      this.problemes.obtenirProbleme()
      .subscribe(cat => this.categoriesProbleme = cat,
              error => this.errorMessage = <any>error);  
              
    
  }
  appliquerNotifications(typesNotification: string): void{
    const courriel = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmation = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephone = this.problemeForm.get('telephone');
    
    courriel.clearValidators();
    courriel.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courriel.disable();  

    courrielConfirmation.clearValidators();
    courrielConfirmation.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielConfirmation.disable();  
    
    telephone.clearValidators();
    telephone.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    telephone.disable();  

    if (typesNotification=='courriel'){
      courriel.setValidators([Validators.required]);   
      courriel.enable();
      courriel.updateValueAndValidity();
      courrielConfirmation.enable();

    }else{

    }
      if (typesNotification=='telephone'){
      telephone.setValidators([Validators.required]);   
      telephone.enable();
    }else{
      
    }
    courrielConfirmation.updateValueAndValidity();

    telephone.updateValueAndValidity();

  }
  save(): void {
  }
 


}
