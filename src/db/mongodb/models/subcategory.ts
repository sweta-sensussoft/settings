import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface subcategoryAttrs {
  id: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  subCategory: String;
  approval: String;
}

interface subcategoryDoc extends mongoose.Document {
  id: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  subCategory: String;
  approval: String;
}

interface subcategoryModel extends mongoose.Model<subcategoryDoc> {
  build(attrs: subcategoryAttrs, id:string): subcategoryDoc;
}

const subcategorySchema = new Schema({
    id: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    subCategory: {
      type: String,
      require: true,
    },
    approval: {
      type: String,
      require: true,
    },

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

subcategorySchema.set("versionKey", "version");
subcategorySchema.plugin(updateIfCurrentPlugin);

subcategorySchema.statics.build = (attrs: subcategoryAttrs, id:string) => {
  var subcategory = new SubCategory(attrs);
  if(id!==null || id !== undefined){
    subcategory._id = new mongoose.Types.ObjectId(id);
  }
  return subcategory;
};

export const SubCategory = mongoose.model<subcategoryDoc, subcategoryModel>("SubCategory", subcategorySchema);
