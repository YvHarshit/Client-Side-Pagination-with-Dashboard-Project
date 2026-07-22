import { useEffect, useState } from "react";
import { allEmployee } from "../../services/analyticsService.js";
import type { Employee } from "../../types/user.types.js";
import { ageInfo, avgAge, countByGender, departDistribution, getMostCommonDomain, mailSummary, salaryInfo, skillsSummary } from "../../utils/filterEmp.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
// import { ArrowBack } from "@mui/icons-material";
import { ArrowBack, PeopleAltOutlined, ApartmentOutlined, AlternateEmailOutlined, CalendarMonthOutlined, PaidOutlined, TrendingUpOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {SKILL_COLORS} from "../../utils/constants.js"
import { useAppContext } from "../../context/AppContext.js";
import AdminNavbar from "./AdminNavbar.js";


interface ChartData { name: string; count: number;}

const CompanyAnalytics = () => {
  const {backendUrl} = useAppContext()
  const navigate = useNavigate()
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await allEmployee(backendUrl);
        setAllEmployees(data);
      }
      catch (err) { console.error(err); }
    };
    fetchEmployees();
  }, []);

  const genderCount: Record<string, number> = countByGender(allEmployees);
  const departmentCount: Record<string, number> = departDistribution(allEmployees);

  const totalNumberOfDepartments = Object.keys(departmentCount).length;
  const averageAge = avgAge(allEmployees);
  const salaryInformation = salaryInfo(allEmployees);
  const ageInformation = ageInfo(allEmployees);

  const mailAnalytics: Record<string, number> = mailSummary(allEmployees);
  const skillsAnalytics: Record<string, number> = skillsSummary(allEmployees);
  const topDomain = getMostCommonDomain(allEmployees);

  const skillsDonutGraph: { skill: string; cnt: number }[] = Object.entries(skillsAnalytics).map(([skill, cnt]) => ({ skill, cnt }));

  const genderChartData: ChartData[] = Object.entries(genderCount).map(([name, count]) => ({ name, count }));
  const departmentChartData: ChartData[] = Object.entries(departmentCount).map(([name, count]) => ({ name, count }));
  const emailChartData: ChartData[] = Object.entries(mailAnalytics).map(([name, count]) => ({ name, count }));

  const totalSkills = Object.values(skillsAnalytics).reduce((sum, n) => sum + n, 0);
  const totalGender = Object.values(genderCount).reduce((sum, n) => sum + n, 0);
  const totalDept = Object.values(departmentCount).reduce((sum, n) => sum + n, 0);
  const totalMail = Object.values(mailAnalytics).reduce((sum, n) => sum + n, 0);

  return (
    <div>
    <AdminNavbar/> 

    <div className=" mx-auto py-10 px-6 bg-[#0A0F0A] min-h-screen text-gray-200">

      <button onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#a8d96c] hover:text-white transition mb-2">
        <ArrowBack />
        <span className="font-semibold"> Back to Dashboard </span>
      </button>

       <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-white">Company Analytics</h1>
        <p className="text-sm text-gray-500 mt-2"> Insights into your workforce</p>
      </div>

     
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">

     <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5 flex items-center gap-4 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20">
      <div className="p-3 rounded-lg bg-[#86EFAC]/10 text-[#86EFAC]">
       <PeopleAltOutlined sx={{ fontSize: 30 }} />
      </div>
      <div>
        <p className="text-3xl font-serif font-bold text-white"> {allEmployees.length} </p>
       <p className="text-xs uppercase tracking-wider text-lime-400 mt-1"> Total Employees </p>
      </div>

  </div>

     <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5 flex items-center gap-4 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20">
          <div className="p-3 rounded-lg bg-[#86EFAC]/10 text-[#86EFAC]">
           <ApartmentOutlined sx={{ fontSize: 30 }} />
          </div>
         <div>
          <p className="text-2xl font-serif text-white">{totalNumberOfDepartments}</p>
          <p className="text-lime-400 text-sm mt-1">Total Departments</p>
          </div>
        </div>

        <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5 flex items-center gap-4 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20">
          <div className="p-3 rounded-lg bg-[#86EFAC]/10 text-[#86EFAC]">
           <AlternateEmailOutlined sx={{ fontSize: 30 }} />
          </div>
         <div>
          <p className="text-2xl font-serif text-white">{topDomain}</p>
          <p className="text-lime-400 text-sm mt-1">Top Mail Domain</p>
        </div>
        </div>

        <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5 flex items-center gap-4 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20">
          <div className="p-3 rounded-lg bg-[#86EFAC]/10 text-[#86EFAC]">
           <CalendarMonthOutlined sx={{ fontSize: 30 }} />
          </div>
         <div>
          <p className="text-2xl font-serif text-white">{averageAge}</p>
          <p className="text-lime-400 text-sm mt-1">Average Age</p>
        </div>
        </div>

        <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5 flex items-center gap-4 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20">
          <div className="p-3 rounded-lg bg-[#86EFAC]/10 text-[#86EFAC]">
           <PaidOutlined sx={{ fontSize: 30 }} />
          </div>
         <div>
          <p className="text-2xl font-serif text-white">{salaryInformation[2]}</p>
          <p className="text-lime-400 text-sm mt-1">Average Salary</p>
        </div>
        </div>

        <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5 flex items-center gap-4 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20">
          <div className="p-3 rounded-lg bg-[#86EFAC]/10 text-[#86EFAC]">
           <TrendingUpOutlined sx={{ fontSize: 30 }} />
          </div>
         <div>
          <p className="text-2xl font-serif text-white">{salaryInformation[1]} - {salaryInformation[0]}</p>
          <p className="text-lime-400 text-sm mt-1">Salary Range</p>
        </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">        
        <div className="flex flex-col gap-4">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5">
            <h2 className="text-lime-400 font-serif text-lg mb-3">Salary Breakdown</h2>
            <div className="flex justify-between text-sm py-1.5 border-b border-[#2C4A34]">
              <span className="text-gray-400">Highest Salary</span>
              <span className="text-white">{salaryInformation[0]}</span>
            </div>
            <div className="flex justify-between text-sm py-1.5 border-b border-[#2C4A34]">
              <span className="text-gray-400">Lowest Salary</span>
              <span className="text-white">{salaryInformation[1]}</span>
            </div>
            <div className="flex justify-between text-sm py-1.5">
              <span className="text-gray-400">Average Salary</span>
              <span className="text-white">{salaryInformation[2]}</span>
            </div>
          </div>

           <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5">
            <h2 className="text-lime-400 font-serif text-lg mb-3">Gender</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-[11px] uppercase">
                  <th className="text-left font-medium pb-2">Gender</th>
                  <th className="text-right font-medium pb-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(genderCount).map(([gender, count]) => (
                  <tr key={gender} className="border-t border-[#2C4A34]">
                    <td className="py-2 text-gray-300">{gender}</td>
                    <td className="py-2 text-right text-white">
                      {count} <span className="text-gray-500 text-xs">({Math.round((count / totalGender) * 100)}%)</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>  



          <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5">
            <h2 className="text-lime-400 font-serif text-lg mb-3">Age Breakdown</h2>
            <div className="flex justify-between text-sm py-1.5 border-b border-[#2C4A34]">
              <span className="text-gray-400">Youngest Employee</span>
              <span className="text-white">{ageInformation[0]}</span>
            </div>
            <div className="flex justify-between text-sm py-1.5 border-b border-[#2C4A34]">
              <span className="text-gray-400">Oldest Employee</span>
              <span className="text-white">{ageInformation[1]}</span>
            </div>
            <div className="flex justify-between text-sm py-1.5 border-b border-[#2C4A34]">
              <span className="text-gray-400">Average Age</span>
              <span className="text-white">{ageInformation[2]}</span>
            </div>
            
          </div>

          <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5">
            <h2 className="text-lime-400 font-serif text-lg mb-3">Skills</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-[11px] uppercase">
                  <th className="text-left font-medium pb-2">Skill</th>
                  <th className="text-right font-medium pb-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(skillsAnalytics).map(([skill, count]) => (
                  <tr key={skill} className="border-t border-[#2C4A34]">
                    <td className="py-2 text-gray-300">{skill}</td>
                    <td className="py-2 text-right text-white">
                      {count} <span className="text-gray-500 text-xs">({Math.round((count / totalSkills) * 100)}%)</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         

          <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5">
            <h2 className="text-lime-400 font-serif text-lg mb-3">Department</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-[11px] uppercase">
                  <th className="text-left font-medium pb-2">Department</th>
                  <th className="text-right font-medium pb-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(departmentCount).map(([department, count]) => (
                  <tr key={department} className="border-t border-[#2C4A34]">
                    <td className="py-2 text-gray-300">{department}</td>
                    <td className="py-2 text-right text-white">
                      {count} <span className="text-gray-500 text-xs">({Math.round((count / totalDept) * 100)}%)</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5">
            <h2 className="text-lime-400 font-serif text-lg mb-3">Mail Domain</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-[11px] uppercase">
                  <th className="text-left font-medium pb-2">Domain</th>
                  <th className="text-right font-medium pb-2">Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(mailAnalytics).map(([domain, count]) => (
                  <tr key={domain} className="border-t border-[#2C4A34]">
                    <td className="py-2 text-gray-300">{domain}</td>
                    <td className="py-2 text-right text-white">
                      {count} <span className="text-gray-500 text-xs">({Math.round((count / totalMail) * 100)}%)</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-4">         

          <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5">
            <h2 className="text-lime-400 font-serif text-lg mb-4">Skills Distribution</h2>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Tooltip contentStyle={{ background: "#0A0F0A", border: "1px solid #2C4A34" }} />
                <Legend verticalAlign="middle" align="right" layout="vertical" wrapperStyle={{ fontSize: 12, color: "#D1D5DB" }} />
                <Pie
                  data={skillsDonutGraph}
                  dataKey="cnt" nameKey="skill"
                  cx="38%" cy="50%"
                  outerRadius={80} innerRadius={45}
                  paddingAngle={2}
                  stroke="#0A0F0A"
                  strokeWidth={2}>
                  {skillsDonutGraph.map((_, index) => (<Cell key={`cell-${index}`} fill={SKILL_COLORS[index % SKILL_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5">
            <h2 className="text-lime-400 font-serif text-lg mb-4">Department Distribution</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={departmentChartData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C4A34" horizontal={false} />
                <XAxis type="number" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" tick={{ fontSize: 12 }} width={80} />
                <Tooltip contentStyle={{ background: "#0A0F0A", border: "1px solid #2C4A34" }} />
                <Bar dataKey="count" fill="#38BDF8" radius={[0, 4, 4, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5">
            <h2 className="text-lime-400 font-serif text-lg mb-4">Email Domain Distribution</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={emailChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C4A34" vertical={false} />
                <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "#0A0F0A", border: "1px solid #2C4A34" }} />
                <Bar dataKey="count" fill="#FBBF24" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#232f20] border border-[#2C4A34] rounded-lg p-5">
            <h2 className="text-lime-400 font-serif text-lg mb-4">Gender Distribution</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={genderChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C4A34" vertical={false} />
                <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "#0A0F0A", border: "1px solid #2C4A34" }} />
                <Bar dataKey="count" fill="#A78BFA" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CompanyAnalytics;