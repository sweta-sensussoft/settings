import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface reportReasonAttrs {
  id: mongoose.Types.ObjectId;
  reason: String
}

interface reportReasonDoc extends mongoose.Document {
  id: mongoose.Types.ObjectId;
  reason: String;
}

interface reportReasonModel extends mongoose.Model<reportReasonDoc> {
  build(attrs: reportReasonAttrs, id:string): reportReasonDoc;
}

const reportReasonSchema = new Schema({
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

reportReasonSchema.set("versionKey", "version");
reportReasonSchema.plugin(updateIfCurrentPlugin);

reportReasonSchema.statics.build = (attrs: reportReasonAttrs, id:string) => {
  var reportReason = new ReportReason(attrs);
  if(id!==null || id !== undefined){
    reportReason._id = new mongoose.Types.ObjectId(id);
  }
  return reportReason;
};

export const ReportReason = mongoose.model<reportReasonDoc, reportReasonModel>("ReportReason", reportReasonSchema);
