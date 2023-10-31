
import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface adminsettingAttrs {
  statittcomission: Number
}

interface adminsettingDoc extends mongoose.Document {
  statittcomission: Number;
}

interface adminsettingModel extends mongoose.Model<adminsettingDoc> {
  build(attrs: adminsettingAttrs, id:string): adminsettingDoc;
}

const adminsettingSchema = new Schema({
    statittcomission: {
      type: Number,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

adminsettingSchema.set("versionKey", "version");
adminsettingSchema.plugin(updateIfCurrentPlugin);

adminsettingSchema.statics.build = (attrs: adminsettingAttrs, id:string) => {
  var adminsettings = new Adminsetting(attrs);
  if(id!==null || id !== undefined){
    adminsettings._id = new mongoose.Types.ObjectId(id);
  }
  return adminsettings;
};

export const Adminsetting = mongoose.model<adminsettingDoc, adminsettingModel>("adminsetting", adminsettingSchema);






