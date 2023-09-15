import { Request } from "express";
import mongoose from "mongoose";
import { contactUs } from "../db/mongodb/models/contactus";
import { sendEmail } from './emailService';

/**
 * Finds Services by Providerid
 * Multiple category values can be provided with comma separated strings
 *
 * future operations.
 * @param {Request} req Request post by the call.
 **/
export const contactus = async function (req: Request): Promise<any> {
  var newData = {} as any;
  var providerId = new mongoose.Types.ObjectId(req.currentUser?.sub);

  var id = new mongoose.Types.ObjectId();
  var { firstName, lastName, email, phoneNo, address, subject, message } = req.body;

  newData.userId = providerId;
  newData.firstName = firstName;
  newData.lastName = lastName
  newData.email = email
  newData.phoneNo = phoneNo
  newData.address = address
  newData.subject = subject
  newData.message = message

  const updatedData = await contactUs.updateOne(
    {
      _id: id,
    },
    { $set: newData },
    { upsert: true }
  );

  const emailOptions = {
    from: `${process.env.APP_NAME} <${process.env.MAIL_FROM}>`,
    to: email,
    subject: 'Contact',
    template: 'contact-email.ejs',
    data: { name: 'Admin',message:message,email:email,phone:phoneNo }, // Pass dynamic data to the template
  };

  // Call the sendEmail function with the email options
  await sendEmail(emailOptions)
    .then(() => {
      console.log('Email sent successfully');
      // process.exit(0);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });

    return updatedData;

}





