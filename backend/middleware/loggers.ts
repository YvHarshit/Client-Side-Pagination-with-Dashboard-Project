import {type Request, type Response, type NextFunction } from "express";

const logger = ((req: Request,res : Response, next:NextFunction) => {
    // console.log("Middleware executed") ;
    // console.log(`${req.method} ${req.url}`) ;

    next()

})

export default logger ;