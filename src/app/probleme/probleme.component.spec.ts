import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ProblemeComponent } from './probleme.component';
import { ProblemeService } from './probleme.service';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,HttpClientModule], 
      declarations: [ ProblemeComponent ],
      providers:[ProblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("#1 | Zone PRÉNOM invalide avec 2 caractèress", () =>{
  //   let zone = component.problemeForm.controls['prenom'];
  //   zone.setValue("a".repeat(2));
  //   let errors = zone.errors || {};
  //   expect(errors['minlength']).toBeFalsy();
  //   });
  //   it("#2 | Zone PRÉNOM invalide avec 3 caractères", () =>{
  //     let zone = component.problemeForm.controls['prenom'];
  //     zone.setValue("a".repeat(3));
  //     let errors = zone.errors || {};
  //     expect(errors['minlength']).toBeFalsy();
  //     });
  //     it("#3 | Zone PRÉNOM invalide avec 200 caractères", () =>{
  //       let zone = component.problemeForm.controls['prenom'];
  //       zone.setValue("a".repeat(200));
  //       let errors = zone.errors || {};
  //       expect(errors['minlength']).toBeFalsy();
  //       });
  //       it("#4 | Zone PRÉNOM invalide avec aucun caractères", () =>{
  //         let zone = component.problemeForm.controls['prenom'];
  //         zone.setValue("a".repeat(0));
  //         let errors = zone.errors || {};
  //         expect(errors['required']).toBeTruthy();
  //         });
  //         it("#5 | Zone PRÉNOM invalide avec 10 espaces", () =>{
  //           let zone = component.problemeForm.controls['prenom'];
  //           zone.setValue(" ".repeat(10));
  //           let errors = zone.errors || {};
  //           expect(errors['minlength']).toBeFalsy();
  //           });
  //           it("#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractères", () =>{
  //             let zone = component.problemeForm.controls['prenom'];
  //             zone.setValue(" ".repeat(3));
  //             let errors = zone.errors || {};
  //             expect(errors['minlength']).toBeFalsy();
  //             });


              // TEST #15
            it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
              component.appliquerNotifications('typeNotification');
              let zone = component.problemeForm.get('telephone');
              expect(zone.status).toEqual('DISABLED');
            });

            // TEST #16
            it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
              component.appliquerNotifications('typeNotification');
              let zone = component.problemeForm.get('telephone');
              expect(zone.value).toBeNull();

            });
            // TEST #17
            it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
              component.appliquerNotifications('typeNotification');
              let zone = component.problemeForm.get('courrielGroup.courriel');
              expect(zone.status).toEqual('DISABLED');
            });
            // TEST #18
            it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
              component.appliquerNotifications('typeNotification');
              let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
              expect(zone.status).toEqual('DISABLED');
            });

            it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
              component.appliquerNotifications('pasnotification');
              let zone = component.problemeForm.get('telephone');
              expect(zone.status).toEqual('DISABLED'); 
            });
            // TEST #20
            it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
              component.appliquerNotifications('parCourriel');
              let zone = component.problemeForm.get('courrielGroup.courriel');
              expect(zone.enabled).toBeTrue();
            });

            // TEST #21
            it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
              component.appliquerNotifications('parCourriel');
              let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
              expect(zone.enabled).toBeTrue();
            });

            // TEST #22
            it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
              component.appliquerNotifications('parCourriel');
              let zone = component.problemeForm.get('courrielGroup.courriel');
              let errors = zone.errors;
              expect(errors['required']).toBeTruthy();
            });

           // TEST #23
            it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
              component.appliquerNotifications('parCourriel');
              let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
              let errors = zone.errors;
            expect(errors['required']).toBeTruthy();
            });

            // TEST #24
            it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
              component.appliquerNotifications('parCourriel');
              let zone = component.problemeForm.get('courrielGroup.courriel');
              zone.setValue('abcd');
              expect(zone.valid).toBeFalse();
            });

            // TEST #25
            it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
              component.appliquerNotifications('parCourriel');
              let courriel = component.problemeForm.get('courrielGroup.courriel');
              let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
              let groupe = component.problemeForm.get('courrielGroup');
              let errors = {};
              courriel.setValue('');
              courrielConfirmation.setValue('aaa@asd.com');
              errors = groupe.errors || null;
              expect(errors).toBeNull();
              });
              
            // TEST #26
            it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
              component.appliquerNotifications('parCourriel');
              let courriel = component.problemeForm.get('courrielGroup.courriel');
              let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
              let groupe = component.problemeForm.get('courrielGroup');
              let errors = {};
              courrielConfirmation.setValue('');
              courriel.setValue('aaa@asd.com');
              errors = groupe.errors || null;
              expect(errors).toBeNull();
              });


            // TEST #27
            it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
              component.appliquerNotifications('parCourriel');
              let courriel = component.problemeForm.get('courrielGroup.courriel');
              let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
              let groupe = component.problemeForm.get('courrielGroup');
              let errors = {};
              courriel.setValue('aaa@asd.com'); 
              courrielConfirmation.setValue('aba@asd.com');
              errors = groupe.errors || null;
              expect(errors["match"]).toBeTruthy();
            
              
              });  
            // TEST #28
            it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
              component.appliquerNotifications('parCourriel');
              let courriel = component.problemeForm.get('courrielGroup.courriel');
              let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
              let groupe = component.problemeForm.get('courrielGroup');
              let errors = {};
              courriel.setValue('aaba@asd.com');
              courrielConfirmation.setValue('aaba@asd.com');
              errors = groupe.errors || null;
              expect(errors).toBeNull();
              });

              
});
