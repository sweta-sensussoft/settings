import { Request } from "express";
import mongoose from "mongoose";
import axios from 'axios';
import { SubCategory } from "../db/mongodb/models/subcategory";
import {  serviceBaseUrl } from "../index";

/**
 * Finds Services by Providerid
 * Multiple category values can be provided with comma separated strings
 *
 * future operations.
 * @param {Request} req Request post by the call.
 **/
export const getSubCategories = async function(req: Request): Promise<any>{
  const catID = req.query.categoryId;
  const id = (req.query.id) ? req.query.id : "";
  const subCategoryId = (req.query.subCategoryId) ? req.query.subCategoryId : "";

  const query = { categoryId: new mongoose.Types.ObjectId(catID?.toString())  };
  let result = await SubCategory.find(  query  );

  if(id){
   

    var data = await getServices(id, catID);    
    var subcategoryIds = data.map((item: any) => item.subcategoryId);
    result = result.filter(item => !subcategoryIds.includes(String(item._id)));    

    if(subCategoryId){
      let subCategoryData = await SubCategory.find({ "_id":subCategoryId });
      result = result.concat(subCategoryData);  
    }
  }
  
  return result;
}
async function getServices(id : any, catID : any) {
  
  var response = await axios({
    method: 'get',
        url: serviceBaseUrl+'/api/service/check',
        // headers: {
        //     Authorization: token
        // },
        data: {
          id: id,
          categoryId: catID
        }
    });
    //console.log("response data", response.data);
    return response.data;
}
  
export const getSubCategoriesAll = async function(req: Request): Promise<any>{
  var responseData = {} as any;

  var result = await SubCategory.find();  
  responseData.data = result;  

  return responseData;

}


