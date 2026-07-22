import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { EmployeeFormData } from "../../utils/zodValidation";
import {employeeSchema} from "../../utils/zodValidation" ;
import { zodResolver } from "@hookform/resolvers/zod";
import type { Employee, UserFormProps } from "../../types/user.types";
import { DEPARTMENT, SKILLS, EXPERIENCE, GENDER} from "../../utils/constants";



const UserForm = ({onAdd, onUpdate, editingEmployee}: UserFormProps) => {
  const [success, setSuccess] = useState(false);

  const skillOptions = Object.values(SKILLS) ;
  const departmentOptions = Object.values(DEPARTMENT) ;
  const experienceOptions = Object.values(EXPERIENCE) ;

  const { register, handleSubmit, reset, watch, setValue, formState: { errors }} = useForm<EmployeeFormData>({
  resolver: zodResolver(employeeSchema),

    defaultValues: {
      name: "", 
      email: "", 
      phone: "", 
      department: undefined,
      gender: undefined,
      experience: undefined,
      password: "",
      skills: [],
      
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const skills = watch("skills");

  const toggleSkill = (skill: string) => { 
    const currentSkills = skills || [];

    if (currentSkills.includes(skill)) {
      setValue( "skills", currentSkills.filter((s) => s !== skill));
    } 
    else {
      setValue("skills", [...currentSkills, skill])
    }
  };

  useEffect(() => {
    if (editingEmployee) {
      reset({
        name: editingEmployee.name ,
        email: editingEmployee.email ,
        phone: editingEmployee.phone ,
        age: Number(editingEmployee.age),
        department: editingEmployee.department ,
        experience: editingEmployee.experience ,
        gender: editingEmployee.gender,
        skills: editingEmployee.skills || [],
        salary : Number(editingEmployee.salary),
      });
    }
  }, [editingEmployee, reset]);


    const onSubmit: SubmitHandler<EmployeeFormData> = (data) => {
      console.log(data);
      console.log(typeof data.age);


    const employeeData: Employee = {
      ...(editingEmployee?.Eid && { Eid: editingEmployee.Eid, }), ...data,
      isFirstLogin: true
    };

    if (editingEmployee) onUpdate(employeeData); 
    else onAdd(employeeData);    
      
    reset({
      name:"" ,
      email:"" ,
      phone:"" ,
      password: "" ,
        department: "" as DEPARTMENT,
        gender: "" as GENDER,
        experience: "" as EXPERIENCE,
      age: 0 ,
      skills : [] ,

      salary : 0 ,
    });
    setSuccess(true);
    setTimeout(() => { setSuccess(false); }, 3000);     
  };

  return (
    <div className="bg-[#232f20] rounded-md p-5 mt-2 ">
      
      {
       editingEmployee
      &&
      (<h2  className="text-xl text-lime-400 mb-1 font-serif"> Edit Employee </h2>) 
      }      
      

      <form onSubmit={handleSubmit(onSubmit)}>
       <div className="grid grid-cols-1 sm: grid grid-cols-3 gap-4 mb-4">

          
          <div>
            <label className='block text-md m-2'>Name</label> 
            <input className="p-3 w-full bg-[#161915] border border-[#3a5035] rounded-md text-[#e8f0e0] text-md outline-none" placeholder="Name" {...register("name")}/>
            {errors.name && ( <p className="text-red-500 text-sm mt-1"> {errors.name.message}</p>)}
          </div>

         
          <div>
            <label className='block text-md m-2'>Email</label>  
            <input className="p-3 w-full bg-[#161915] border border-[#3a5035] rounded-md text-[#e8f0e0] text-md outline-none" placeholder="email@example.com" {...register("email")}/>
            {errors.email && ( <p className="text-red-500 text-sm mt-1"> {errors.email.message} </p> )}
          </div>

          
          <div>
            <label className='block text-md m-2'>Phone</label> 
            <input className="p-3 w-full bg-[#161915] border border-[#3a5035] rounded-md text-[#e8f0e0] text-md outline-none"  placeholder="9876543210" {...register("phone")} />
            {errors.phone && ( <p className="text-red-500 text-sm mt-1"> {errors.phone.message} </p>)}
          </div>


          <div>
            <label className='block text-md m-2'>Age</label> 
            <input className="p-3 w-full bg-[#161915] border border-[#3a5035] rounded-md text-[#e8f0e0] text-md outline-none" placeholder="age" type="number" {...register("age", { valueAsNumber: true })} />
            {errors.age && ( <p className="text-red-500 text-sm mt-1"> {errors.age.message} </p>)}
          </div>

          <div>
            <label className='block text-md m-2'> Salary </label> 
            <input className="p-3 w-full bg-[#161915] border border-[#3a5035] rounded-md text-[#e8f0e0] text-md outline-none" placeholder="salary"  type="number" {...register("salary", { valueAsNumber: true })} />
            {errors.salary && ( <p className="text-red-500 text-sm mt-1"> {errors.salary.message} </p>)}
          </div>



           {
            !editingEmployee
            &&
          <div>
            <label className='block text-md m-2'>Password</label> 
            <input className="p-3 w-full bg-[#161915] border border-[#3a5035] rounded-md text-[#e8f0e0] text-md outline-none"  placeholder="password" {...register("password")} />
            {errors.password && ( <p className="text-red-500 text-sm mt-1"> {errors.password.message} </p>)}
          </div>
         }


         <div>
            <label className="block text-md m-2"> Department  </label>
          
            <select {...register("department")} className="p-3 w-full bg-[#161915] border border-[#3a5035] rounded-md text-[#e8f0e0] text-md outline-none">
              <option value="" className="bg-red-700"> Select Department </option>
          
              {departmentOptions.map((department) => ( <option key={department} value={department} className="bg-[#232f20]" >
                  {department}
                </option>
              ))}
            </select>
          
            {errors.department && ( <p className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-md m-2"> Experience  </label>
          
            <select {...register("experience")} className="p-3 w-full bg-[#161915] border border-[#3a5035] rounded-md text-[#e8f0e0] text-md outline-none">
              <option value="" className="bg-red-700"> Select Experience </option>
          
              {experienceOptions.map((experience) => ( <option key={experience} value={experience} className="bg-[#232f20]" >
                  {experience}
                </option>
              ))} </select>
          
            {errors.experience && ( <p className="text-red-500 text-sm mt-1"> {errors.experience.message}  </p> )}
          </div>

        <div>
          <label className="block text-md m-2"> Gender  </label>
             <select {...register("gender")} className="p-3 w-full bg-[#161915] border border-[#3a5035] rounded-md text-[#e8f0e0] text-md outline-none">
               <option value="" className="bg-red-700">Select Gender</option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
             </select> 
               {errors.gender && ( <p className="text-red-500 text-sm mt-1"> {errors.gender.message} </p> )}

        </div>
      </div>

        

      
        <div className="mb-6">
          <label className='block text-md m-2'>Skills</label>
          <div  className="flex flex-wrap gap-3">

            {skillOptions.map((skill) => (
              <button key={skill} type="button" onClick={() => toggleSkill(skill)}
                className={`mt-4 px-5 py-2 rounded-full text-md cursor-pointer transition-all ${skills?.includes(skill)
                ? "bg-[#a8d96c] text-[var(--bg)] font-semibold"
                : "bg-[var(--bg)] text-[#7a9970]" }`
                }>
                {skill}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="block bg-[#a8d96c] text-black rounded-md mt-15 py-3 px-8 text-md font-semibold font-sans cursor-pointer border-0 hover:scale-105 transition-all ">
          {editingEmployee ? "Update Employee" : "Add Employee"}


        </button>        

      </form>
    </div>
    
  );
};

export default UserForm;
