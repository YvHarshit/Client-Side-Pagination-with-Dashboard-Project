import {type Request, type Response } from "express";
import Employee from "../models/user.model.js";
import { nextId } from "../utils/idAllocator.js";


export const getUsers =  async (req : Request, res : Response): Promise<void> => {
 try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const users = await Employee.find({
      $or: [{ userId }, { addedBy: "Admin" }]
    });

    res.json(users);
  } 
  catch (err) {res.status(500).json({message: "500 - Failed to fetch users"});}
  };



export const addUser =  async (req : Request, res : Response): Promise<void> => {
    try {
        const employeeId = await nextId('employeeId'); 

        const userId = (req).userId;        
        const emp = await Employee.create({ Eid: employeeId, userId, ...req.body });
        
        res.json(emp) ;
        }
        catch(err){res.status(500).json({ message: "Failed to add user"}); }
    }

export const getUserByID =async (req : Request, res : Response): Promise<void> => {
    try{
        const emp = await Employee.findOne({Eid: req.params.Eid as string}) ;

        if(emp)  res.json(emp)
        else     res.status(404).json({message: "404 - User not found" })
    }
    catch(err){
        res.status(500).json({message: "Failed to fetch user"});
    }
}

export const deleteUserByID = async (req : Request, res : Response): Promise<void> => {
    try {
        const rawEid = req.params.Eid;
        const Eid = Array.isArray(rawEid) ? rawEid[0] : rawEid;
        if (!Eid) 
        {
            res.status(400).json({ message: "400 - Missing Eid parameter" }); 
            return; 
        }

        const emp = await Employee.findOneAndDelete({ Eid: Eid }) ;

        if(emp)    res.json({message: "User deleted successfully"}) 
        else       res.status(404).json({ message: "User not found"}) ;
            
    } 
    catch(err){
    res.status(500).json({message: "Failed to delete user"});
    }
}


export const updateUserByID = async (req: Request, res: Response): Promise<void> => {
    try {
        const rawEid = Array.isArray(req.params.Eid) ? req.params.Eid[0] : req.params.Eid;

        if (!rawEid) {
            res.status(400).json({ message: "Missing Eid parameter" });
            return;
        }

        const updatedEmp = await Employee.findOneAndUpdate({
            Eid: rawEid }, 
            req.body, 
            { returnDocument: 'after', 
                runValidators: true }
        );

        if (updatedEmp) res.json(updatedEmp);

        else res.status(404).json({ message: "User not found" });
       
    } 
    catch (err) {
        res.status(500).json({ message: "Failed to update user" });
    }
}