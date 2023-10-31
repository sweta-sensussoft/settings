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
  var userId = req.currentUser?.sub;
  try {
    const result = await Appsetting.updateOne(
      {userId}, // Empty condition to update all documents
      {
        $set: {
          userId,
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

  try {
    const userId = new mongoose.Types.ObjectId(req.currentUser?.sub); // Assuming req.currentUser?.sub is a valid ObjectId

    const query = { userId }; // No need to wrap it in { userId: userId }

    const result = await Appsetting.find(query).exec();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Handle or rethrow the error as needed
  }

}






