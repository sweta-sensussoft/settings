import { Request } from "express";
import mongoose from "mongoose";
import { SubCategory } from "../db/mongodb/models/subcategory";

/**
 * Finds Services by Providerid
 * Multiple category values can be provided with comma separated strings
 *
 * future operations.
 * @param {Request} req Request post by the call.
 **/
export const getSubCategories = async function(req: Request): Promise<any>{
  const catID = req.query.categoryId;
  const query = { categoryId: new mongoose.Types.ObjectId(catID?.toString())  };
  const result = await SubCategory.find(  query  );
  return result;
}
  
export const getSubCategoriesAll = async function(req: Request): Promise<any>{
  var responseData = {} as any;

  var result = await SubCategory.find();  
  responseData.data = result;  

  return responseData;

}


