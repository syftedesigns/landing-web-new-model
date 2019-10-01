/*
Clase que se encarga de crear al suscriptor de mailchimp
*/
export class MailChimpSuscriptorClass {
    constructor(
        // tslint:disable-next-line:variable-name
        public email_address: string,
        public status: string,
        public tags: string[],
        public language: string,
        // tslint:disable-next-line:variable-name
        public merge_filds: any
    ) {}
}
