import {type Request, type Response,type  NextFunction} from "express" ;
import {type zodValidSchema} from "../validators/zodSchema.js" ;


export const validate = (schema:typeof zodValidSchema) => (req: Request, res: Response, next: NextFunction) =>{
    const result = schema.safeParse(req.body);

    console.log("Zod Validation Middleware") ;
    
    if(!result.success){
        return res.status(400).json( {
                success : false ,
                // errors :  result.error.issues }) } // Give full ERROR descripton

                message : "400 - Validation Falied",
                errors : result.error.flatten().fieldErrors  }); 
            }


    req.body = result.data ;

    next() ;

}




