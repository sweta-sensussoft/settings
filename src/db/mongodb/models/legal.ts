import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface legalAttrs {
  id: mongoose.Types.ObjectId;
  description: String;
  pageName: String;
  pageTitle: String;
}

interface legalDoc extends mongoose.Document {
  id: mongoose.Types.ObjectId;
  description: String;
  pageName: String;
  pageTitle: String;
}

interface legalModel extends mongoose.Model<legalDoc> {
  build(attrs: legalAttrs, id:string): legalDoc;
}

const legalSchema = new Schema({
    id: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    pageName: {
        type: String,
        require: true,
    },
    pageTitle: {
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

legalSchema.set("versionKey", "version");
legalSchema.plugin(updateIfCurrentPlugin);

legalSchema.statics.build = (attrs: legalAttrs, id:string) => {
  var legal = new Legal(attrs);
  if(id!==null || id !== undefined){
    legal._id = new mongoose.Types.ObjectId(id);
  }
  return legal;
};

export const Legal = mongoose.model<legalDoc, legalModel>("legal", legalSchema);
