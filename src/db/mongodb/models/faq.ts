import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface getFaqAttrs {
  id: mongoose.Types.ObjectId;
  question: String;
  answer: String;
  index: Number;
}

interface getFaqDoc extends mongoose.Document {
  id: mongoose.Types.ObjectId;
  question: String;
  answer: String;
  index: Number;
}

interface getFaqModel extends mongoose.Model<getFaqDoc> {
  build(attrs: getFaqAttrs, id:string): getFaqDoc;
}

const getFaqSchema = new Schema({
    id: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    question: {
      type: String,
      require: true,
    },
    answer: {
        type: String,
        require: true,
    },
    index: {
      type: Number,
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



getFaqSchema.set("versionKey", "version");
getFaqSchema.plugin(updateIfCurrentPlugin);

getFaqSchema.statics.build = (attrs: getFaqAttrs, id:string) => {
  var getfaq = new getFaq(attrs);
  if(id!==null || id !== undefined){
    getfaq._id = new mongoose.Types.ObjectId(id);
  }
  return getfaq;
};

export const getFaq = mongoose.model<getFaqDoc, getFaqModel>("faq", getFaqSchema);
