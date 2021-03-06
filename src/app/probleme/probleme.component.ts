import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './probleme';
import { ProblemeService } from './probleme.service';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

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
      notification: ['pasnotification'],
      descriptionProbleme:["",[Validators.required, Validators.minLength(5)]],
      noUnite:"",
      dateProbleme:{value:Date(),disabled:true}

  });
  this.problemeForm.get('notification').valueChanges
      .subscribe(value => this.appliquerNotifications(value));
    this.problemes.obtenirProbleme()
      .subscribe(cat => this.categoriesProbleme = cat,
        error => this.errorMessage = <any>error);
             
      
    
  }
  appliquerNotifications(typesNotification: string): void{
    const courriel = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmation = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroupControl = this.problemeForm.get('courrielGroup');      

    const telephone = this.problemeForm.get('telephone');

    courriel.clearValidators();
    courriel.reset();  // Pour enlever les messages d'erreur si le controle contenait des donn??es invaldides
    courriel.disable();  

    courrielConfirmation.clearValidators();
    courrielConfirmation.reset();  // Pour enlever les messages d'erreur si le controle contenait des donn??es invaldides
    courrielConfirmation.disable();  
    
    telephone.clearValidators();
    telephone.reset();  // Pour enlever les messages d'erreur si le controle contenait des donn??es invaldides
    telephone.disable();  

    if (typesNotification === 'courriel') {   
      courriel.setValidators([Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
      courriel.enable();  
      courrielConfirmation.setValidators([Validators.required]);              
      courrielConfirmation.enable();  
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);                       
}
    if(typesNotification === 'telephone' || typesNotification === 'messageTexte' )
    {
      telephone.setValidators([Validators.required,Validators.pattern('[0-9]+'),Validators.minLength(10),Validators.maxLength(10)]); 
      telephone.enable();               
    }
    else if(typesNotification === 'inconnu'){

      telephone.setValidators([Validators.required,Validators.pattern('[0-9]+')]);  
      telephone.setValidators([Validators.required]);   
      telephone.disable(); 


      courriel.setValidators([Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
      courriel.disable();  
      courrielConfirmation.setValidators([Validators.required]);              
      courrielConfirmation.disable();  
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);     
    }
    
  courriel.updateValueAndValidity();   
  courrielConfirmation.updateValueAndValidity();     
  
  telephone.updateValueAndValidity();

  }
  save(): void {
  }
 


}
