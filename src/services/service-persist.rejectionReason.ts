import { Request } from "express";
import { RejectionReason } from "../db/mongodb/models/rejectionReason";

/**
 * Finds Services by Providerid
 * Multiple category values can be provided with comma separated strings
 *
 * future operations.
 * @param {Request} req Request post by the call.
 **/
export const getRejectionReasons = async function(req: Request): Promise<any>{
  var responseData = {} as any; 
  var result = await RejectionReason.find();  
  return result;
}
  


