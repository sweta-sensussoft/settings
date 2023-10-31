import express, { Request, Response } from "express";
import { requireAuth } from "@omtechservices/library";
import { getCategories } from "../services/service-persist.category";
import { getRejectionReasons } from "../services/service-persist.rejectionReason";
import { getLegalAll } from "../services/service-persist.legalcontent";
import { getSubCategories, getSubCategoriesAll } from "../services/service-persist.subcategory";
import { getCertificate } from "../services/service-persist.certificate";
import { getFAQAll } from "../services/service-persist.faq";
import { contactus } from "../services/service-persist.contactus";
import { appsettings,getAppsettingAll } from "../services/service-persist.appsettings";
import { getReportReasons } from "../services/service-persist.reportReason";


const router = express.Router();
// category detail router ==============================================================================
router.get("/api/settings/categories", async (req: Request, res: Response) => {
  var responseData = {} as any;
var result = await getCategories(req);
  if(result){
    res.status(200).send(result);       
  }else{
    responseData.status = false;
    
    responseData.message = "Category not found";
    res.status(200).send(responseData);
  }
});

router.get("/api/settings/subcategories", async (req: Request, res: Response) => {
  var responseData = {} as any;
  var result = await getSubCategories(req);
  if(result.length > 0){
    responseData.status = true;
    responseData.message = "Sub Category List";
    responseData.data = result;  
    res.status(200).send(responseData);
  }else{
    responseData.status = false;
    responseData.message = "Sub Category not found";
    res.status(200).send(responseData);
  }
});

router.get("/api/settings/subcategorielist", async (req: Request, res: Response) => {
  var responseData = {} as any;
  var result = await getSubCategoriesAll(req);
  if(result){
    res.status(200).send(result);       
  }else{
    responseData.status = false;
    responseData.message = "Category not found";
    res.status(200).send(responseData);
  }
});

// get certificate list =================================================================================
router.get("/api/settings/certificates", async (req: Request, res: Response) => {
  var responseData = {} as any;
  var result = await getCertificate(req);
  
  if(result.length > 0){
    responseData.status = true;
    responseData.message = "Certificate List";
    responseData.data = result;  
    res.status(200).send(responseData);       
  }else{
    responseData.status = false;
    responseData.message = "Certificate not found";
    res.status(200).send(responseData);
  }
});

router.get("/api/settings/legal", async (req: Request, res: Response) => {
  var responseData = {} as any;
  var result = await getLegalAll(req);
  if(result){
    responseData.status = true;
    responseData.message = "Legal Details";
    responseData.data = result;  
    res.status(200).send(responseData);       
  }else{
    responseData.status = false;
    responseData.message = "Data not found";
    res.status(200).send(responseData);
  }
});

router.get("/api/settings/faq",async (req: Request, res: Response) => {
  var responseData = {} as any;
  var result = await getFAQAll(req);
  if(result){
    responseData.status = true;
    responseData.message = "Get FAQ Details";
    responseData.data = result;  
    res.status(200).send(responseData);       
  }else{
    responseData.status = false;
    responseData.message = "data not found";
    res.status(200).send(responseData);
  }
});

router.post("/api/settings/contactus",requireAuth, async (req: Request, res: Response) => {
  var responseData = {} as any;
  var result = await contactus(req);
  if(result){
    responseData.status = true;
    responseData.message = "Contactus detail saved";
    responseData.data = result;  
    res.status(200).send(responseData);       
  }else{
    responseData.status = false;
    responseData.message = "Something wrong";
    res.status(200).send(responseData);
  }
});

router.post("/api/settings/appsettings",requireAuth, async (req: Request, res: Response) => {
  var responseData = {} as any;
  var result = await appsettings(req);
  if(result){
    responseData.status = true;
    responseData.message = "Appsettings detail saved";
    responseData.data = result;  
    res.status(200).send(responseData);       
  }else{
    responseData.status = false;
    responseData.message = "Something wrong";
    res.status(200).send(responseData);
  }
});

router.get("/api/settings/appsettings",requireAuth, async (req: Request, res: Response) => {
  var responseData = {} as any;
  var result = await getAppsettingAll(req);
  if(result){
    responseData.status = true;
    responseData.message = "Get Appsetting Details";
    responseData.data = result;  
    res.status(200).send(responseData);       
  }else{
    responseData.status = false;
    responseData.message = "data not found";
    res.status(200).send(responseData);
  }
});

router.get("/api/settings/rejectionreasons", async (req: Request, res: Response) => {
  //DO NOT ADD TOKEN MIDDLEWARE HERE
  var responseData = {} as any;
  var result = await getRejectionReasons(req);
  
  if(result.length > 0){
    responseData.status = true;
    responseData.message = "Rejection Reason List";
    responseData.data = result;  
    res.status(200).send(responseData);       
  }else{
    responseData.status = false;
    responseData.message = "Rejection Reasons not found";
    res.status(200).send(responseData);
  }
  
});

router.get("/api/settings/reportreasons", async (req: Request, res: Response) => {
  //DO NOT ADD TOKEN MIDDLEWARE HERE
  var responseData = {} as any;
  var result = await getReportReasons(req);
  
  if(result){
    responseData.status = true;
    responseData.message = "Report Reason List";
    responseData.data = result;  
    res.status(200).send(responseData);       
  }else{
    responseData.status = false;
    responseData.message = "Report Reasons not found";
    res.status(200).send(responseData);
  }
  
});

router.get('/healthz', async (req: Request, res: Response) => {
  return res.status(200).json("Settin API grunning");
});

export { router as servicesRouter };
