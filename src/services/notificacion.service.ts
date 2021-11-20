import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  EnviarNotificacionesPorSMS(telefono:string, body:string):void {

    const accountSid = 'AC5b00d29cf0f79ccfa8a1fe3599825a39'; // Your Account SID from www.twilio.com/console
    const authToken = 'eb6b8d5175b1cb1ef1de5c64892dc8b1'; // Your Auth Token from www.twilio.com/console

    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages
      .create({
        body: body,
        to: telefono, // Text this number
        from: '+14706194440', // From a valid Twilio number
      })
      .then((message:any) => console.log(message.sid));
  }

  EnviarNotificacionesPorCorreo(destino: string, subject: string, contenido: string):void {
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino, // Change to your recipient
      from: 'mauricio.roa@outlook.com', // Change to your verified sender
      subject: subject,
      text: 'and easy to do anywhere, even with Node.js',
      html: contenido,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error:any) => {
        console.error(error)
      })
  }
}
