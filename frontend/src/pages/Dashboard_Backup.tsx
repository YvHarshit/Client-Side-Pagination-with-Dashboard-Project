import cover from "../assests/cover.jpg"
import profile from "../assests/profile.jpg"
import ProfileField from "../pages/ProfileField"
// import axios from "axios"
// import type { Employee } from "../types/user.types"
 
 
const EmpDashboard = () => {
 
//  const [employee, setEmployee] = useState<Employee | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
 
//   const [formData, setFormData] = useState({
//     name: employee.name,
//     email: employee.email,
//     phone: employee.phone,
//     username: employee.username || "",
//     department: employee.department || ""
//    });
 
 
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({...prev,[name]: value }));
//   };
 
 
//   const handleEdit = () => {
//     if (!employee) return;
 
//     setFormData({
//     name: employee.name,
//     email: employee.email,
//     phone: employee.phone,
//     username: employee.username || "",
//     department: employee.department || "",
//     });
//     setIsEditing(true);
//   };
 
 
//   const handleCancel = () => {
//     setIsEditing(false);
//   };
 
 
//   const handleUpdate = async () => {
 
//     try {
//       const { data } = await axios.patch( "/api/employee/me", formData,
//         {withCredentials: true }
//       );
//       setEmployee(data.employee);
//       setIsEditing(false);
//     }
//     catch (error) {
//       console.error(error);
//     }
//   };
 
 
  return (
    <div className="min-h-screen bg-gray-300 ">
        <div className="rounded-md border overflow-hidden">
 
 
            <div className="relative h-52 md:h-64">
              <img src={cover} alt="Cover"
                className="h-full w-full object-cover "/>
            </div>
 
            <div className="absolute left-8 top-32 md:left-14 md:top-36">
               <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-md md:h-60 md:w-60 ">
                <img src={profile} alt="Employee Avatar" className="object-cover "/>
              </div>
            </div>
        </div>
 
        <div className="px-8 pb-12 pt-1 md:px-16 md:pt-28">
         
           <div className="mb-10 flex justify-end">
               <button
               className="rounded-lg bg-slate-900 px-6 py-2 text-white transition hover:bg-slate-400 float-right">  Edit Profile
              </button>
           </div>
 
           <div className="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2 ml-10 md:ml-30">
            {/* {
                isEditing ?
                  (
                  <input name="name" value={formData.name} onChange={handleChange}
                    className="border rounded p-2"/>
                  )
                 :
                  (
                  <ProfileField label="Name" value={employee?.name ?? "-"} />
                  )
            } */}
             <ProfileField label="Name" value="Rahul Sharma" />
             <ProfileField label="Email" value="rahul@gmail.com" />
             <ProfileField label="Employee ID" value="EMP-102" />
             <ProfileField label="Account Status" value="Active" />
             <ProfileField label="Salary" value="₹45,000" />
             <ProfileField label="Experience" value="2 Years" />
           </div>
        </div>
    </div>
  )
}
 
export default EmpDashboard