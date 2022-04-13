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
              component.appliquerNotifications('courriel');
              let zone = component.problemeForm.get('courrielGroup.courriel');
              expect(zone.enabled).toBeTrue();
            });

            // TEST #21
            it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
              component.appliquerNotifications('courriel');
              let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
              expect(zone.enabled).toBeTrue();
            });

            // TEST #22
            it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
              component.appliquerNotifications('courriel');
              let zone = component.problemeForm.get('courrielGroup.courriel');
              let errors = zone.errors;
              expect(errors['required']).toBeTruthy();
            });

           // TEST #23
            it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
              component.appliquerNotifications('courriel');
              let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
              let errors = zone.errors;
            expect(errors['required']).toBeTruthy();
            });

            // TEST #24
            it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
              component.appliquerNotifications('courriel');
              let zone = component.problemeForm.get('courrielGroup.courriel');
              zone.setValue('abcd');
              expect(zone.valid).toBeFalse();
            });

            // TEST #25
            it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
              component.appliquerNotifications('courriel');
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
              component.appliquerNotifications('courriel');
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
              component.appliquerNotifications('courriel');
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
              component.appliquerNotifications('courriel');
              let courriel = component.problemeForm.get('courrielGroup.courriel');
              let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
              let groupe = component.problemeForm.get('courrielGroup');
              let errors = {};
              courriel.setValue('aaba@asd.com');
              courrielConfirmation.setValue('aaba@asd.com');
              errors = groupe.errors || null;
              expect(errors).toBeNull();
              });

              // TEST #29
            it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
              component.appliquerNotifications('messageTexte');
              let zone = component.problemeForm.get('telephone');
              expect(zone.enabled).toBeTrue();
            });

            // TEST #30
            it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
              component.appliquerNotifications('messageTexte');
              let zone = component.problemeForm.get('courrielGroup.courriel');
              expect(zone.enabled).toBeFalsy();
            });

            // TEST #31
            it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
              component.appliquerNotifications('messageTexte');
              let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
              expect(zone.enabled).toBeFalsy();
            });

            // TEST #32
            it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
              component.appliquerNotifications('messageTexte');
              let zone = component.problemeForm.get('telephone');
              zone.setValue('')
              expect(zone.valid).toBeFalsy();
            });

            // TEST #33
            it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
              component.appliquerNotifications('messageTexte');
              let zone = component.problemeForm.get('telephone');
              zone.setValue('abc');
              expect(zone.valid).toBeFalsy();
            });

            // TEST #34
            it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
              component.appliquerNotifications('messageTexte');
              let zone = component.problemeForm.get('telephone');
              zone.setValue('999999999');
              expect(zone.valid).toBeFalsy();
            });

            // TEST #35
            it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
            component.appliquerNotifications('messageTexte');
            let zone = component.problemeForm.get('telephone');
            zone.setValue('99999999999');
            expect(zone.valid).toBeFalsy();
          });
            // TEST #36
            it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
              component.appliquerNotifications('messageTexte');
              let zone = component.problemeForm.get('telephone');
              zone.setValue('9999999999');
              expect(zone.valid).toBeTruthy();
            });
});
