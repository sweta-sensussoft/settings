import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface certificateAttrs {
  id: mongoose.Types.ObjectId;
  subCategoryId: mongoose.Types.ObjectId;
  title: String;

}

interface certificateDoc extends mongoose.Document {
    id: mongoose.Types.ObjectId;
    subCategoryId: mongoose.Types.ObjectId;
    title: String;
}

interface certificateModel extends mongoose.Model<certificateDoc> {
  build(attrs: certificateAttrs, id:string): certificateDoc;
}

const certificateSchema = new Schema({
    id: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    subCategoryId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    title: {
      type: String,
      require: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

certificateSchema.set("versionKey", "version");
certificateSchema.plugin(updateIfCurrentPlugin);

certificateSchema.statics.build = (attrs: certificateAttrs, id:string) => {
  var category = new Certificate(attrs);
  if(id!==null || id !== undefined){
    category._id = new mongoose.Types.ObjectId(id);
  }
  return category;
};

export const Certificate = mongoose.model<certificateDoc, certificateModel>("certificates", certificateSchema);
