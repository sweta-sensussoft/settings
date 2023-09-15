import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface contactusAttrs {
  id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  firstName: String;
  lastName: String;
  email: String;
  phoneNo: Number;
  address: Number;
  subject: Number;
  message: Number;
}

interface contactusDoc extends mongoose.Document {
  id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  firstName: String;
  lastName: String;
  email: String;
  phoneNo: Number;
  address: Number;
  subject: Number;
  message: Number;
}

interface contactusModel extends mongoose.Model<contactusDoc> {
  build(attrs: contactusAttrs, id:string): contactusDoc;
}

const contactusSchema = new Schema({
    id: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phoneNo: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    subject: {
      type: String,
      require: true,
    },
    message: {
        type: String,
        require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);



contactusSchema.set("versionKey", "version");
contactusSchema.plugin(updateIfCurrentPlugin);

contactusSchema.statics.build = (attrs: contactusAttrs, id:string) => {
  var getContactUs = new contactUs(attrs);
  if(id!==null || id !== undefined){
    getContactUs._id = new mongoose.Types.ObjectId(id);
  }
  return getContactUs;
};

export const contactUs = mongoose.model<contactusDoc, contactusModel>("contactus", contactusSchema);
