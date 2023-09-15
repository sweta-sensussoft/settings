import { Request } from "express";
import { ReportReason } from "../db/mongodb/models/reportReason";

/**
 * Finds Services by Providerid
 * Multiple category values can be provided with comma separated strings
 *
 * future operations.
 * @param {Request} req Request post by the call.
 **/
export const getReportReasons = async function(req: Request): Promise<any>{
  var responseData = {} as any;  
  var result = await ReportReason.find();  
  return result;
}
  


