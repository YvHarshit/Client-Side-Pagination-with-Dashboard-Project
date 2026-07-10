import {type Request, type Response } from "express";
import Employee from "../models/user.model.js";
import { nextId } from "../utils/idAllocator.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { string, success } from "zod";




// export const getUsers =  async (req : Request, res : Response): Promise<void> => {
//  try {
//     const userId = req.userId;

//     if (!userId) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     const users = await Employee.find({
//       $or: [{ userId }, { addedBy: "Admin" }]
//     });

//     res.json(users);
//   } 
//   catch (err) {res.status(500).json({message: "500 - Failed to fetch users"});}
//   };


export const getUsers =  async (req: Request, res: Response) => {
    
        const userId = req.userId ;
        if(!userId) {
            res.json ({
                success : false,
                message : "Un-authorized"  })
            }
    try {

         const page = Number(req.query.page) || 1;
         const limit = Number(req.query.limit) || 3;
         const search = (req.query.search as string)?.trim() || "";
         const skip = (page - 1) * limit;

        const query : any =   {
            $and :[{
                $or : [{userId} , {addedBy : "Admin"}]
            }]
        }   
        if(search) {
            query.$and.push({
                 $or: [
                  { name: { $regex: search, $options: "i" } },
                  { email: { $regex: search, $options: "i" } },
                 { department: { $regex: search, $options: "i" } },
                ],
            })
        }
    const totalUsers = await Employee.countDocuments()  // total number of users in the database, regardless of the search filter
    const filteredUsers = await Employee.countDocuments(query)
    const totalPages = Math.ceil(filteredUsers / limit) 

    const users = await Employee.find(query).sort({ name: "asc" }).skip(skip).limit(limit)
    
    res.json({
    users,
    currentPage: page,
    totalUsers,
    filteredUsers ,
    totalPages });        
    } 
    catch (error: unknown) {
        if(error instanceof Error) {
            console.log(error.message) 
            console.log(error.stack)
        }
        else console.log("An Un expected Error occured ", error)        
    }
}



export const addUser =  async (req : Request, res : Response): Promise<void> => {
    try {
    const employeeId = String(await nextId('employeeId'));
    const { name, email, department, password, skills } = req.body;

    if (!req.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const emp = await Employee.create({
      Eid: employeeId,
      userId: req.userId,
      name, email, department, skills, password: hashedPassword
    });

    res.json(emp);
  }
        catch(err){res.status(500).json({ message: "Failed to add user"}); }
    }

// export const getUserByID =async (req : Request, res : Response): Promise<void> => {
//     try{
//         const emp = await Employee.findOne({Eid: req.params.Eid as string}) ;

//         if(emp)  res.json(emp)
//         else     res.status(404).json({message: "404 - User not found" })
//     }
//     catch(err){
//         res.status(500).json({message: "Failed to fetch user"});
//     }
// }

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



export const empLogin = async (req: Request, res: Response) => {
    const {email, password} = req.body ;

    if(!email || ! password) {
        return res.json({
            success: false ,
            message :     "Credentials Missings"
        })
    }

    try {
        const emp = await Employee.findOne({email}) ; 
        
        if (!emp) {
            return ({
                success: false ,
                message : "Employee Not Exist"
            })
        }

        if (!emp || typeof emp.password !== 'string') {
          res.status(401).json({ message: 'Invalid credentials' });
          return;
        }


        const isMatch = await bcrypt.compare(password, emp.password);

        if (!isMatch)  return res.status(400).json({ success: false, message: "Invalid password" });
            
        const token = jwt.sign({email:emp.email}, process.env.JWT_SECRET as string , {expiresIn : "2d"})   
        res.cookie("token", token, {
            httpOnly : true ,
            secure : false ,
            sameSite : "lax",
        })


        return res.status(200).json({ 
            success : true ,
            message: 'Login successful' });


    } 
    catch (error : unknown) {
        if(error instanceof Error) {
            console.log(error.message) 
            console.log(error.stack)
        }
        else console.log("An un-expected error : ", error)
        
    }

}



export const getEmpDetail = async (req: Request, res: Response) => {
    console.log("This is getEmpDetails (user.constrollers) ")

    const token = req.cookies.token ;
    if(!token) {
        return res.json ({
            success : false ,
            message : "Login Again"
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as { email: string };

    try {
        const emp = await Employee.findOne({email : decoded.email}).select("-password") ;
        
        if(!emp) {
            return res.json ({
                success : false ,
                message : "User Not Found"
            })
        }

        return res.json ({
            success: true ,
            message : "User Found" ,
            emp
        })
        
    } catch (error : unknown) {
        if(error instanceof Error){
            console.log(error.message)
            console.log(error.stack)
        }
        else console.log("Un-expexted Error", error)
        
    }
}




export const updateDetailsFromDashboard = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };

    const emp = await Employee.findOne({ email: decoded.email });

    if (!emp) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    emp.name = req.body.name ?? emp.name;
    emp.phone = req.body.phone ?? emp.phone;
    emp.department = req.body.department ?? emp.department;

    await emp.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      employee: emp,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

export const empLogout = async(req:Request, res: Response) => {

try {
    res.clearCookie("token" , {
        httpOnly: true, 
        secure : false ,
        sameSite : "lax"
    })
    return res.json({ success: true, message: "Logged out" });
} 
catch (error : unknown) {
  if(error instanceof Error){
    console.log(error.message)
    console.log(error.stack)
  }
  else console.log("Un-Expected error : ", error)    
}

}