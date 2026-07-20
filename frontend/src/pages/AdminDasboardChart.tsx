import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer} from 'recharts';
type AdminDasboardChartProps = {
  num: number;
  total: number;
};

export const AdminDasboardChart = ({ num, total }: AdminDasboardChartProps) => {
  const chartData = [
    { name: 'Filtered Employees', value: Math.max(num, 0), fill: "#4d8fe1", },
    { name: 'Remaining Employees', value: Math.max(total - num, 0), fill: "#40d075", },
  ];

  return (
    <div className="bg-[#232f20] border border-[#3a5035] rounded-lg p-2">
      <h3 className="text-lg text-[#a8d96c]">Category Distribution</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}/>         
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

