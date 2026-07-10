import type { UserCardProps } from '../../types/user.types'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Swal from 'sweetalert2'



const UserCard = ({ employee, isHighlighted, onDelete, onEditClick }: UserCardProps) => {

  return (
    <div  className={` font-serif rounded-lg p-4 bg-[#232f20]  relative transition-colors ${ isHighlighted ? "border border-lime-400" : "border border-[#3a5035]"}`}>

    { employee.addedBy 
    && 
    <p className = "px-3 py-1 rounded-md text-lg text-[#a8d96c] bg-[#161715] float-right animate-pulse">
     Seeded Data
    </p>
    }
     <h3 className ="text-md font-semibold mb-4">
      Emp ID : {employee.Eid}
      </h3>

      <h3 className='text-md mb-1'>
        Name : {employee.name}
      </h3>

      <p className='text-md mb-1'>
        Email : {employee.email}
      </p>

     
      <p className='text-md mb-2'>
        Phone : {employee.phone}
      </p>

      <div className='flex justify-between items-center'>
        
        <div>
          <span className='bg-[#202b1e] border border-[#3a5035] text-md px-3 py-1'>
            Department : {employee.department}
          </span>
        </div>
      </div>

      { !(employee.addedBy === "Admin") 
      && 
      (
       <div className='flex flex-wrap gap-4 float-right mt-2'>         
        <button           
           onClick={() => {
                        Swal.fire({
                          title: 'Are you sure, you want to delete employee of ID ' + employee.Eid + '?',
                          text: "You won't be able to revert this!",
                          
                          showCancelButton: true,
                          confirmButtonColor: "#316d22",
                          cancelButtonColor: "rgb(190, 68, 68)",
                          confirmButtonText: "Yes, delete it !",
                          background: "#232f20" ,
                          color: "white" 
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
                              icon: "success",
                              background: "#232f20" ,
                              color: "white" 
                            }).then(() => {
                              if (employee.Eid) {
                                onDelete(employee.Eid);
                              }
                            });
                          }
                        });
          }}> 
          <DeleteIcon className="text-red-400 cursor-pointer"/> </button>

          <button           
           onClick={() => {
                        Swal.fire({
                          title: 'Are you sure, you want to edit employee of ID : ' +employee.Eid +' ?',
                  
                          showCancelButton: true,
                          confirmButtonColor: "#316d22",
                          cancelButtonColor: "rgb(190, 68, 68)",
                          confirmButtonText: "Yes, Edit it !",
                          background: "#232f20" ,
                          color: "white" 
                        }).then((result) => {
                          if (result.isConfirmed)  
                           onEditClick(employee);                            
                        });
          }}>
         <EditIcon className="text-lime-300 cursor-pointer" />
        </button>  
               
       </div>
      )
    }
</div>
  )
}



export default UserCard


