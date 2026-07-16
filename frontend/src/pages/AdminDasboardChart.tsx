import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d'];

type AdminDasboardChartProps = {
  num: number;
  total: number;
};

export const AdminDasboardChart = ({ num, total }: AdminDasboardChartProps) => {
  const chartData = [
    { name: 'Filtered Employees', value: Math.max(num, 0) },
    { name: 'Remaining Employees', value: Math.max(total - num, 0) },
  ];

  return (
    <div className="bg-[#232f20] border border-[#3a5035] rounded-lg p-5">
      <h3 className="text-lg mb-4 text-[#a8d96c]">Category Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

