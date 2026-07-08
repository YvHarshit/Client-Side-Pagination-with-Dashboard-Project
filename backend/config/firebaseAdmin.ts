import * as admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";
import type { ServiceAccount } from "firebase-admin";


//const serviceAccount = require("./auth-project-2209-firebase-adminsdk-fbsvc-3fab15c57f.json") as ServiceAccount;
import serviceAccount from "./auth-project-2209-firebase-adminsdk-fbsvc-d69ea442c8.json" with { type: "json" };


initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export default admin;