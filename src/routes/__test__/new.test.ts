import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import * as _ from "lodash";
//import { compareObjects, logToConsole } from "../../test/object";
import { compareObjects, logToConsole } from "@omtechservices/library";

const defaultObject = {
  "id" : undefined,
  "category":"1",
  "sub_category":"2",
  "hourly_price":"2",
  "fixed_price":"30",
  "description":"My new service",
  "status":"1"
};

it("creates new service", async () => {
  var result = await request(app)
    .post("/api/service")
    .set('Authorization', 'Bearer ' + process.env.AUTH_TOKEN) 
    .send(defaultObject)
    .expect(201);
  var { upsertedId } = result.body; 

  var resultQuery = await request(app)
    .get(`/api/service/${upsertedId}`)
    .set('Authorization', 'Bearer ' + process.env.AUTH_TOKEN) 
    .expect(200);
  var compareResult = compareObjects(defaultObject
        ,resultQuery.body,
        [
          "category",
          "sub_category",
          "hourly_price",
          "fixed_price",
          "description",
          "status"
        ]);
  if(!compareResult.result){
    // console.log(JSON.stringify(compareResult.messages));
  }        
  expect(compareResult.result).toEqual(true);
});


it("update service record", async () => {
  var resultInserted = await request(app)
    .post("/api/service")
    .set('Authorization', 'Bearer ' + process.env.AUTH_TOKEN) 
    .send(defaultObject)
    .expect(201);
  var { upsertedId } = resultInserted.body; 
  var updatedObject = _.clone(defaultObject);
  updatedObject.id = upsertedId;
  updatedObject.description = "Updated Description";
  updatedObject.category = "21";
  updatedObject.sub_category = "22";
  updatedObject.hourly_price = "23";
  updatedObject.fixed_price = "301";
  updatedObject.status = "23";
  var resultUpdated = await request(app)
    .post("/api/service")
    .set('Authorization', 'Bearer ' + process.env.AUTH_TOKEN) 
    .send(updatedObject)
    .expect(201); 
  var resultQueryUpdated = await request(app)
    .get(`/api/service/${upsertedId}`)
    .set('Authorization', 'Bearer ' + process.env.AUTH_TOKEN) 
    .expect(200); 
  let compareResult = compareObjects(updatedObject ,resultQueryUpdated.body);
  if(!compareResult.result){
    logToConsole("errorReason",compareResult); 
  } 
  expect(compareResult.result).toEqual(true);
});