import type { DEPARTMENT, GENDER , EXPERIENCE} from "../utils/constants"

export interface Employee {
  Eid?: string
  _id?: string
  name: string
  email: string
  phone: string
  age : number,
  username?: string
  department?: DEPARTMENT;
  gender :  GENDER,
  experience : EXPERIENCE ,
  skills: string[]

  addedBy ?: string ,
  isFirstLogin : boolean ,
  salary : number ,
}


export interface UserCardProps {
  employee: Employee
  isHighlighted: boolean     
  onDelete: (eid: string) => void
  onEditClick: (employee: Employee) => void;
}

export interface UserFormProps {
  onAdd: (employee: Employee) => void;
  onUpdate: (employee: Employee) => void;
  editingEmployee: Employee | null;
}

export interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}


export interface UserData {
  _id: string;
  name: string;
  email: string;
  otp?: number ;
  otpExpireAt ?: number ;
  isAuthenticated ?: boolean ;

}


export interface AppContextType {
  backendUrl: string;
  isLoggedin: boolean;
  setIsLoggedin: (val: boolean) => void;
  userData: UserData | null;
  setUserData: (val: UserData | null) => void;
  getUserData: () => Promise<void>;
  selectedDomain : string ;
  setSelectedDomain: (val : string) => void ;

  currPage : number ;
  setCurrPage : (val :number) => void ;

  searchStr: string ;
  setSearchStr : (val: string) => void ;
  totalPages : number ;
  setTotalPages : (val : number) => void ;
  totalEmp : number ;
  setTotalEmp : (val : number) => void ;
  trigger : boolean ;
  setTrigger : (val : boolean) => void ;

  filteredData : number ;
  setFilteredData : (val : number) => void ;
  empDetails : Employee | null ; 
  setEmpDetails : (val : Employee) => void ;
  getEmpDetails : (val: string) => Promise<Employee> ;
  fetchEmployeeDetails : () => Promise<void> ;
} 
export interface UsersResponse {
  users: Employee[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  filteredUsers: number ;
}



export interface Leave {
  _id: string;
  employeeId: string;
  leaveType: string;
  reason: string;
  fromDate: string;
  toDate: string;
  totalDays: number;
  status: string;
  adminRemark?: string;
  createdAt: string;
}