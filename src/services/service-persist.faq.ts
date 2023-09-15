import { Request } from "express";
import mongoose from "mongoose";
import { getFaq } from "../db/mongodb/models/faq";

/**
 * Finds Services by Providerid
 * Multiple category values can be provided with comma separated strings
 *
 * future operations.
 * @param {Request} req Request post by the call.
 **/
export const getFAQAll = async function(req: Request): Promise<any>{

  var responseData = {} as any;

  const result = await getFaq.find().sort({ index: 1 });
 
  
  return result;

}
  


