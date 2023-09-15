import { Request } from "express";
import mongoose from "mongoose";
import { Legal } from "../db/mongodb/models/legal";

/**
 * Finds Services by Providerid
 * Multiple category values can be provided with comma separated strings
 *
 * future operations.
 * @param {Request} req Request post by the call.
 **/
export const getLegalAll = async function(req: Request): Promise<any>{

  var responseData = {} as any;

  const Pagename = req.query.pageName;
  const query = Pagename ? { pageName: Pagename.toString() } : {};

  const result = await Legal.find(query);
 
  
  return result;

}
  


