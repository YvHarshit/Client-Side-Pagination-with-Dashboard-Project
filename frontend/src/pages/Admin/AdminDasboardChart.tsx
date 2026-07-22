import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

type AdminDasboardChartProps = {
  num: number;
  total: number;
};

export const AdminDasboardChart = ({num, total}: AdminDasboardChartProps) => {
  const chartData = [
    { name: "Filtered",
      value: Math.max(num, 0),
      color: "#4d8fe1",
    },
    { name: "Remaining",
      value: Math.max(total - num, 0),
      color: "#40d075",
    },
  ];

  const percentage = total === 0 ? 0 : Math.round((num / total) * 100);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#3a5035] bg-[#232f20] p-6 transition-all duration-300 hover:border-[#a8d96c] hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(168,217,108,0.12)]">
     <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#a8d96c] opacity-10 blur-3xl" />
      <div className="relative">

      <div className="flex items-center justify-between">
       <div>
        <h2 className="text-2xl font-bold text-white mt-1"> Employee Distribution  </h2>
        <p className="text-sm text-gray-400 mt-2">  Current dashboard view </p>
       </div>
       <div className="w-14 h-14 rounded-xl bg-[#31422b] flex items-center justify-center">
        <DonutLargeIcon  sx={{color: "#a8d96c", fontSize: 30 }}/>
       </div>
      </div>

    <div className="mt-1">
     <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={4} >
          
          {chartData.map((entry, index) => (
            <Cell  key={index} fill={entry.color}/>
          ))}  </Pie>

        <Tooltip
        contentStyle={{
          background: "#171f11",
          border: "1px solid #3a5035",
          borderRadius: "10px",
          color: "#fff",
        }}/>
       <Legend />
       </PieChart>
      </ResponsiveContainer>
    </div>

  <div className="grid grid-cols-3 gap-4 mt-2">
   <div className="rounded-xl bg-[#1c2518] p-3 text-center">
     <p className="text-gray-400 text-xs">  Displayed </p>
     <p className="text-xl font-bold text-[#4d8fe1]">  {num}  </p>
   </div>

   <div className="rounded-xl bg-[#1c2518] p-3 text-center">
     <p className="text-gray-400 text-xs"> Total </p>
     <p className="text-xl font-bold text-[#40d075]">  {total}   </p>
    </div>

    <div className="rounded-xl bg-[#1c2518] p-3 text-center">
      <p className="text-gray-400 text-xs">  Coverage </p>
      <p className="text-xl font-bold text-[#a8d96c]">  {percentage}%  </p>
    </div>
   </div>
   </div>
  </div>
  );
};