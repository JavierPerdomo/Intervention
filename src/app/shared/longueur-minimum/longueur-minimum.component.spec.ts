import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";

describe('Zone Validator', () => {
    // 7
    it('Une chaîne avec 10 espaces est valide', () => {
        let control = { value: ' '.repeat(10) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
        // 8
    });
    it('Une phrase avec un mots est valide', () => {
        let control = { value: ' '.repeat(3) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
        // 9
    });
    it('Une phrase avec 3 espace , des mots et ensuites 3 est valide', () => {
        let control = { value: ' '.repeat(9) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
        // 10
    });
    it('Une phrase avec 1 espace ,et 2 caractères est invalide', () => {
        let control = { value: ' '.repeat(1) + 'x'.repeat(2) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);

    });
    //11
    it('Une phrase avec 1 espace ,et 2 caractères est invalide', () => {
        let control = { value: ' '.repeat(2) + 'x'.repeat(1) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);

    });
    //12 //+ 'x'.repeat(3)
    it('Une phrase avec 3 espace ,et 3 caractères est valide', () => {
        let control = { value: ' '.repeat(2) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);

    });
    //13
    it('Une phrase avec 5 espace ,et 5 caractères et 5 espace est valide', () => {
        let control = { value: ' '.repeat(15) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);

    });
    //14
    it('Une chaîne null est invalide', () => {
        let control = { value: ' '.repeat(15) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);

    });
});