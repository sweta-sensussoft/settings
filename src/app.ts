import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, errorHandler } from "@omtechservices/library";
//import { currentUser, errorHandler } from "./lib/library";
import { servicesRouter } from "./routes/index";
import path from 'path';
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);
// console.log(process.env.AUTH0_ISSUER);
// console.log();


// for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

//app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(servicesRouter);

app.all("*", async (req, res) => { });

app.use(errorHandler);

export { app };
