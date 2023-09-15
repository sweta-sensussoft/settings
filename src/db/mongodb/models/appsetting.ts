import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface appsettingAttrs {
  pushNotifications: Boolean
  dataCrashCollectionode: Boolean
}

interface appsettingDoc extends mongoose.Document {
  pushNotifications: Boolean;
  dataCrashCollectionode: Boolean;
}

interface appsettingModel extends mongoose.Model<appsettingDoc> {
  build(attrs: appsettingAttrs, id:string): appsettingDoc;
}

const appsettingSchema = new Schema({
  pushNotifications: {
      type: Boolean,
      require: true,
    },
    dataCrashCollectionode: {
      type: Boolean,
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

appsettingSchema.set("versionKey", "version");
appsettingSchema.plugin(updateIfCurrentPlugin);

appsettingSchema.statics.build = (attrs: appsettingAttrs, id:string) => {
  var appsettings = new Appsetting(attrs);
  if(id!==null || id !== undefined){
    appsettings._id = new mongoose.Types.ObjectId(id);
  }
  return appsettings;
};

export const Appsetting = mongoose.model<appsettingDoc, appsettingModel>("appsetting", appsettingSchema);
