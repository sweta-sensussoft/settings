import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface rejectionReasonAttrs {
  id: mongoose.Types.ObjectId;
  reason: String
}

interface rejectionReasonDoc extends mongoose.Document {
  id: mongoose.Types.ObjectId;
  reason: String;
}

interface rejectionReasonModel extends mongoose.Model<rejectionReasonDoc> {
  build(attrs: rejectionReasonAttrs, id:string): rejectionReasonDoc;
}

const rejectionReasonSchema = new Schema({
    id: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    reason: {
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

rejectionReasonSchema.set("versionKey", "version");
rejectionReasonSchema.plugin(updateIfCurrentPlugin);

rejectionReasonSchema.statics.build = (attrs: rejectionReasonAttrs, id:string) => {
  var rejectionReason = new RejectionReason(attrs);
  if(id!==null || id !== undefined){
    rejectionReason._id = new mongoose.Types.ObjectId(id);
  }
  return rejectionReason;
};

export const RejectionReason = mongoose.model<rejectionReasonDoc, rejectionReasonModel>("RejectionReason", rejectionReasonSchema);
