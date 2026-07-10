import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { EmployeeFormData } from "../../utils/zodValidation";
import {employeeSchema} from "../../utils/zodValidation" ;
import { zodResolver } from "@hookform/resolvers/zod";
import type { Employee, UserFormProps } from "../../types/user.types";
import { toast } from "react-toastify";



const UserForm = ({onAdd, onUpdate, editingEmployee}: UserFormProps) => {
  const [success, setSuccess] = useState(false);

  enum SKILLS {
  React = "React",
  TypeScript = "TypeScript",
  Node = "Node",
  Python = "Python",
  Design = "Design",
  CPP = "C++",
  Java = "Java",
  }
  const skillOptions = Object.values(SKILLS);

  const { register, handleSubmit, reset, watch, setValue, formState: { errors }} = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "", 
      email: "", 
      phone: "", 
      department: "", 
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
        department: editingEmployee.department ,
        skills: editingEmployee.skills || [],
      });
    }
  }, [editingEmployee, reset]);


  const onSubmit = (data: EmployeeFormData) => {
    const employeeData: Employee = {
    ...(editingEmployee?.Eid && {  Eid: editingEmployee.Eid, }), ...data, };

    if (editingEmployee) 
    { onUpdate(employeeData); 
      toast.success("Updated Successfully")
    } 
    else { onAdd(employeeData);
      toast.success("Employee Added Successfully")
     }
      
    reset({
      name:"" ,
      email:"" ,
      phone:"" ,
      department: "" ,
      skills : [] ,
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
      
      {success 
      && 
      (
        <div className="bg-[#3a5035] text-lime-300 rounded-md px-5 py-4 text-md mb-4">
          {!editingEmployee ? "Employee updated successfully!" : "Employee added successfully!"}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
       <div className="grid grid-cols-2 gap-4 mb-4">

          
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
            <label className='block text-md m-2'>Password</label> 
            <input className="p-3 w-full bg-[#161915] border border-[#3a5035] rounded-md text-[#e8f0e0] text-md outline-none"  placeholder="9876543210" {...register("password")} />
            {errors.password && ( <p className="text-red-500 text-sm mt-1"> {errors.password.message} </p>)}
          </div>

        
          <div>
            <label className='block text-md m-2'>Department</label>  
            <input className="p-3 w-full bg-[#161915] border border-[#3a5035] rounded-md text-[#e8f0e0] text-md outline-none"  placeholder="Department Name" {...register("department")} />
            {errors.department && ( <p className="text-red-500 text-sm mt-1"> {errors.department.message} </p> )}
          </div>
        </div>

         {/*<div>
         <h2> Department </h2>
            <select className="p-3 w-full bg-[#161915] border border-[#3a5035] rounded-md text-[#e8f0e0] text-md outline-none"  >
              <option className="bg-[#232f20] text-white" > Select Your Department </option>
              <option className="bg-[#232f20] text-white" > SDE </option>
              <option className="bg-[#232f20] text-white" > AI/ML </option>
              <option className="bg-[#232f20] text-white" > Office Staff </option>
              <option className="bg-[#232f20] text-white" > HR </option>
              <option className="bg-[#232f20] text-white" > Testing </option>
            </select>
          </div> */}
        

      
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

        <button type="submit" className="bg-[#a8d96c] text-black rounded-md py-3 px-5 text-md font-semibold font-sans cursor-pointer border-0 hover:scale-105 transition-all ">
          {editingEmployee ? "Update Employee" : "Add Employee"}


        </button>

      </form>
    </div>
  );
};

export default UserForm;
