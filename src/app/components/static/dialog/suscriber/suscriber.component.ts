import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { MailchimpService } from 'src/app/services/ads/mailchimp.service';
import { CampaignService } from 'src/app/services/ads/campaign.service';
import { MailChimpSuscriptorClass } from 'src/app/classes/campaign/suscriptor.model';
import { CampaignObject } from 'src/app/classes/campaign/campaign.model';
import { AuthService } from '../../../../services/auth/auth.service';
// Track fb
declare function LeadContact();

@Component({
  selector: 'app-suscriber',
  templateUrl: './suscriber.component.html',
  styles: []
})
export class SuscriberComponent implements OnInit {
  isLoading: boolean = false;
  constructor(public dialogRef: MatDialogRef<SuscriberComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              // tslint:disable-next-line:variable-name
              private snackBar: MatSnackBar, private _service: CampaignService,
              private mailchimp: MailchimpService, private auth: AuthService) { }

  ngOnInit() {
  }

  async SendForm(form: NgForm) {
    if (form.invalid) {
      throw new Error('Form invalid');
    }
    // Mailchimp promise
    this.isLoading = true;
    const MailChimpAffiliation = await this.SuscribeToMailchimp(form.value.name, form.value.email);
    if (MailChimpAffiliation) {
      // Se afilio al sistema de mailchimp ahora hacemos lo registramos en la db de Syfte
      const newsletter = new CampaignObject(form.value.name, form.value.email,
        'suscription', 'Branding', null, 'spanish');
      this.auth.RegisterNewAffiliation(newsletter, 'affiliation_track')
        .subscribe((data) => {
          if (data.status) {
            // Disparamos el track de fb, de que es un lead captado
            LeadContact();
            // Lo registro o afilio
            setTimeout(() => {
              this._service.subscribeToCampaign(newsletter, 'subscription') // Enviamos el mensaje
                .subscribe((msg) => {
                  if (msg.status) {
                    // Envio el mensaje, lo notificamos
                    this.isLoading = false;
                    form.reset();
                    this.dialogRef.close(null);
                    // tslint:disable-next-line:max-line-length
                    const Snack = this.snackBar.open('Gracias por suscribirte a Syfte, es hora de darle a tu negocio la potencia que necesitas!',
                    'Visita nuestra página principal', {
                      duration: 10000,
                    });
                    Snack.afterDismissed().subscribe(
                      (e) => {
                        if (e.dismissedByAction) {
                          location.href = 'https://www.syftedesigns.com/es';
                        }
                        console.log(e);
                      }
                    );
                  }
                });
            }, 500);
          } else {
            this.isLoading = false;
            form.reset();
            return;
          }
        });
    } else {
      // El correo es inválido o ya existe
      this.snackBar.open('El correo ya existe, o no es un email válido', null, {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
      form.reset();
      return;
    }
  }
    // Función que se encarga de hacer la suscripción en el mailchimp
  SuscribeToMailchimp(CustomerName: string, email: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        let name = '';
        let lastname = '';
        const customerSplit = CustomerName.split(' ');
        // Verificamos si la persona puso el apellido
        if (customerSplit.length >= 2) {
          name = customerSplit[0];
          for (let i = 1; i < customerSplit.length; i++) {
            lastname += ' ' + customerSplit[i];
          }
        } else {
          // No coloco el apellido
          name = customerSplit[0];
        }
        // Una vez que tengamos el nombre hacemos la suscripción al mailchimp
        const ObjectSuscription = new MailChimpSuscriptorClass(email, 'subscribed', ['Suscriptores'], 'es_ES',
        {
          FNAME: name,
          LNAME: lastname
        });
        // Ya configuramos el objeto de suscripción de mailchimp, ahora lo afiliamos
        this.mailchimp.SubscribeToMailChimpJSONP(ObjectSuscription)
          .subscribe((affiliation) => {
            if (affiliation.result === 'success') {
              resolve(true);
            } else {
              console.error(affiliation);
              resolve(false);
            }
          });
      });
    }
}
