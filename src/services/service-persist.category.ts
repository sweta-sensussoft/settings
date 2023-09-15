import { Request } from "express";
import { Category } from "../db/mongodb/models/category";

/**
 * Finds Services by Providerid
 * Multiple category values can be provided with comma separated strings
 *
 * future operations.
 * @param {Request} req Request post by the call.
 **/
export const getCategories = async function(req: Request): Promise<any>{
  var responseData = {} as any;
  var perPage = 20;
  var pageNumber  =  req.query.page;
  
  let isAll  = Number(req.query.isAll);
  var page = Number(pageNumber)
  var resultCount = await Category.find().count();
  
  if (pageNumber == undefined) {
    var result = await Category.find();  
    responseData.data = result;  
  } else {
    var result = await Category.find().skip(( page  - 1) * perPage).limit(perPage);
    responseData.status = true,
    responseData.message =  "Category List",
    responseData.total = resultCount;
    responseData.page = Number(page);
    responseData.perPage = perPage;
    responseData.totalPage = Math.ceil(resultCount / perPage);
    responseData.data = result;
  }
  
 
  return responseData;

}


  


