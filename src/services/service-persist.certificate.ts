import { Request } from "express";
import mongoose from "mongoose";
import { Certificate } from "../db/mongodb/models/certificate";

/**
 * Finds Certificates by SubCategoryId
 * @param {Request} req Request post by the call.n
 **/
export const getCertificate = async function(req: Request): Promise<any>{  
  const catID = req.query.subCategoryId;
  const query = { subCategoryId: new mongoose.Types.ObjectId(catID?.toString())  };
  const result = await Certificate.find(  query  );
  return result;
}
  


