import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface categoryAttrs {
  id: mongoose.Types.ObjectId;
  category: String;
  iconUrl: String;
}

interface categoryDoc extends mongoose.Document {
  id: mongoose.Types.ObjectId;
  category: String;
  iconUrl: String;
}

interface categoryModel extends mongoose.Model<categoryDoc> {
  build(attrs: categoryAttrs, id:string): categoryDoc;
}

const categorySchema = new Schema({
    id: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    iconUrl: {
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

categorySchema.set("versionKey", "version");
categorySchema.plugin(updateIfCurrentPlugin);

categorySchema.statics.build = (attrs: categoryAttrs, id:string) => {
  var category = new Category(attrs);
  if(id!==null || id !== undefined){
    category._id = new mongoose.Types.ObjectId(id);
  }
  return category;
};

export const Category = mongoose.model<categoryDoc, categoryModel>("Category", categorySchema);
