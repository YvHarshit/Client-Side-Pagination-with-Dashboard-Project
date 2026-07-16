import { useEffect, useState } from "react";
import { allEmployee } from "../services/analyticsService";
import type { Employee } from "../types/user.types";
import { ageInfo, avgAge, countByGender, departDistribution, getMostCommonDomain, mailSummary, salaryInfo, skillsSummary} from "../utils/filterEmp.js";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line} from "recharts";

const COLORS = ["#A8D96C","#8BC34A","#7CB342","#689F38","#558B2F","#9CCC65","#AED581","#C5E1A5"];

const CompanyAnalytics = () => {
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await allEmployee();
        setAllEmployees(data);        
      } 
      catch (err) { console.error(err); }
    };
    fetchEmployees();
  }, []);

  const genderCount = countByGender(allEmployees);
  const departmentCount = departDistribution(allEmployees)

  const totalNumberOfDepartments = Object.keys(departmentCount).length
  const averageAge = avgAge(allEmployees)
  const salaryInformation = salaryInfo(allEmployees)
  const ageInformation = ageInfo(allEmployees)

  const mailAnalytics = mailSummary(allEmployees)
  const skillsAnalytics = skillsSummary(allEmployees)
  const topDomain = getMostCommonDomain(allEmployees)

  const skillsDonutGraph = Object.entries(skillsAnalytics).map(([skill, cnt]) => ({skill, cnt}))
  const emailChartData = Object.entries(mailSummary(allEmployees)).map(([domain, count]) => ({domain, count }))

  const genderChartData = Object.entries(genderCount).map(([gender, count]) => ({gender, count}));
  const departmentChartData = Object.entries(departmentCount).map(([department, count]) => ({department, count}));













return (
    <div className="max-w-[1800px] mx-auto py-10 px-6 font-serif bg-gray-800">

      <div className="flex justify-center ">
        <h1 className="text-4xl mt-5"> Company Analytics</h1></div>

        <div className="mx-2 grid grid-cols-2 gap-4 sm:grid-cols-4 text-center mt-4 text-lime-300 text-lg"> 

          <div className="border border-white rounded p-4">
            <p> Total Employees </p>
            <p className="text-xl text-indigo-300">  {allEmployees.length} </p>
          </div>

          <div className="border border-white rounded p-4">
            <p> Top Domain</p>
            <p className="text-xl text-indigo-300"> {topDomain} </p>
          </div>

          <div className="border border-white rounded p-4">
            <p> Total Departments </p>
            <p className="text-xl text-indigo-300">  {totalNumberOfDepartments}</p>
          </div>

          <div className="border border-white rounded p-4">
            <p> Average Salary </p>
            <p className="text-xl text-indigo-300"> {salaryInformation[2]}</p>
          </div>

          <div className="border border-white rounded p-4">
            <p> Average Age </p>
            <p className="text-xl text-indigo-300">  { averageAge } </p>
          </div>
          
          <div className="border border-white rounded p-4">
            <p> Salary Info </p>
            <p className="text-xl text-indigo-300">  Highest Salary : { salaryInformation[0] } </p>
            <p className="text-xl text-indigo-300">  Lowest Salary : { salaryInformation[1] } </p>
            <p className="text-xl text-indigo-300">  Avg Salary : { salaryInformation[2] } </p>
          </div>

          <div className="border border-white rounded p-4">
            <p> Age Analytics </p>
            <p className="text-xl text-indigo-300">  Youngest Employee : { ageInformation[0] } </p>
            <p className="text-xl text-indigo-300">  Oldest Employee : { ageInformation[1] } </p>
            <p className="text-xl text-indigo-300">  Avg Age : { ageInformation[2] } </p>
            <p className="text-xl text-indigo-300">  Total Validate Count: { ageInformation[3] } </p>
          </div>
                  
      </div>
      
<div className="grid grid-cols-2">

  <div className="p-5 rounded-lg">    
  <h2 className="text-xl mb-4">Skills Distribution</h2>
  {Object.entries(skillsAnalytics).map(([skills, count]) => (
    <div key={skills} className="w-[400px] flex justify-between border-b border-gray-700 py-2" >
      <span>{skills}</span>
      <span>{count}</span>
    </div>
  ))
  }
  </div>

  <div className="p-5 rounded-lg"> 
  <h2 className="text-xl mb-4">Gender Distribution</h2>
  {Object.entries(genderCount).map(([gender, count]) => (
    <div key={gender} className="w-[400px] flex justify-between border-b border-gray-700 py-2" >
      <span>{gender}</span>
      <span>{count}</span>
    </div>
  ))
  }
  </div>

  <div className="p-5 rounded-lg">
    <h2 className="text-xl mb-4"> Department Distribution</h2>

  {Object.entries(departmentCount).map(([department, count]) => (
    <div key={department} className="w-[400px] flex justify-between border-b border-gray-700 py-2" >
      <span>{department}</span>
      <span>{count}</span>
    </div>
  ))}
   </div>

   <div className="p-5 rounded-lg">
  <h2 className="text-xl mb-4">Mail Domain Distribution</h2>
  {
    Object.entries(mailAnalytics).map(([domain, cnt]) => (
      <div key={domain} className="w-[400px] flex justify-between border-b border-gray-700 py-2" >
      <span>{ domain }</span>
      <span>{cnt}</span>
      </div>
    ))
  }
  </div>


 

    <div className="bg-[#232f20] p-5 rounded-lg my-2">
      <h2 className="text-xl mb-5">Gender Distribution</h2>
    
      <ResponsiveContainer width="100%" >
        <BarChart data={genderChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="gender" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#81a358" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    
    <div>
  <h2 className="text-xl mb-5">Skills Distribution</h2>

  <PieChart width={700} height={700}>
    <Tooltip />

    <Pie
      data={skillsDonutGraph}
      dataKey="cnt"
      nameKey="skill"
      cx="50%"
      cy="50%"
      outerRadius={250}
      innerRadius={150}
      label={({ payload }) => `${payload.skill}: ${payload.cnt}`}>
      {skillsDonutGraph.map(( _ , index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
       ))
      }
    </Pie>

  </PieChart>
</div> 


    
    <div className="bg-[#232f20] p-5 my-9 rounded-lg">
      <h2 className="text-xl mb-5">Department Distribution</h2>
    
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={departmentChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#6bc5ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="ml-9">
      <h2> Department Distribution </h2>

      <BarChart data={departmentChartData} layout="vertical">
        <XAxis type="number" />
        <YAxis dataKey="department" type="category" />
        <Tooltip />
        <Bar dataKey="count" fill="green" />
      </BarChart>
    </div>

    <div className="bg-[#232f20] rounded-lg p-5">
     <h2 className="text-xl mb-5">Email Domain Distribution</h2>

      <ResponsiveContainer width="100%" height={350}>
       <BarChart data={emailChartData}>
       <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="domain" />
         <YAxis />
       <Tooltip />
       <Bar dataKey="count" fill="#A8D96C" />
       </BarChart>
      </ResponsiveContainer>
    </div>


  </div>
</div> 
  );
}

export default CompanyAnalytics;