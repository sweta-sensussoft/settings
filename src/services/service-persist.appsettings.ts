import { Request } from "express";
import mongoose from "mongoose";
import { Appsetting } from "../db/mongodb/models/appsetting";

/**
 * Finds Services by Providerid
 * Multiple category values can be provided with comma separated strings
 *
 * future operations.
 * @param {Request} req Request post by the call.
 **/


export const appsettings = async function (req: Request): Promise<any> {
  const {
    pushNotifications,
    dataCrashCollectionode
  } = req.body;

  try {
    const result = await Appsetting.updateOne(
      {}, // Empty condition to update all documents
      {
        $set: {
          pushNotifications,
          dataCrashCollectionode
        }
      },
      { upsert: true }
    );

    return result;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const getAppsettingAll = async function (req: Request): Promise<any> {

  var responseData = {} as any;

  const result = await Appsetting.find();


  return result;

}






