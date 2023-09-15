import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { apiCall } from "@omtechservices/library";

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  var result = await apiCall({
    url:"http://localhost:3001/oidc/token",
    method:"POST",
    body:{
      "client_id":"statitt_app",
      "client_secret":"5f02d05b2312f745a9a567ba69819eb4583bef72a7ec8bfd",
      "grant_type":"client_credentials"
    },
    headers:[{
            "testuser":"test@dev.com",
            "testpassword":"dev"
          }]
  });
  
    process.env.AUTH_TOKEN = result.data.access_token;
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  //jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

