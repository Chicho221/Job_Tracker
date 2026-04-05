import {PieChart, Pie, BarChart, XAxis, YAxis, Tooltip, Bar, LabelList, ResponsiveContainer } from "recharts"

function Dashboard ({stats}) {
    const barData = [
        {name: "Total", value: stats.total, fill:"oklch(48.8% 0.243 264.376)"},
        {name: "Applied", value: stats.applied, fill:"oklch(48.8% 0.243 264.376)"},
        {name: "Interview",value: stats.interview, fill:"oklch(48.8% 0.243 264.376)"},
        {name: "Rejected",value: stats.rejected, fill:"oklch(48.8% 0.243 264.376)"}
    ]
    const pieData = [
        {name: "Success", value: stats.interview, fill:"oklch(50.8% 0.118 165.612)"},
        {name: "Other", value: stats.total - stats.interview, fill:"oklch(44.4% 0.177 26.899)"}
    ]
    
    return(
    <div className="px-4 h-full flex flex-row gap-4 rounded-xl bg-zinc-800/50 shadow-xl">
        {/* Bar Chart */}
        <div className="w-2/3 h-full flex items-center justify-center">
            <BarChart
            width={500}
            height={250}
            data={barData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            >
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                <LabelList dataKey="value" position="top" fill="white" />
            </Bar>
            </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="w-1/3 h-full flex items-center justify-center">
        <PieChart width={250} height={250}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={80}
            stroke="none"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          />
        </PieChart>
      </div>
    </div>
    )
}

export default Dashboard