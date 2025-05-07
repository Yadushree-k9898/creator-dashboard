// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
//         <p className="font-medium text-sm">{`${label}`}</p>
//         {payload.map((entry, index) => (
//           <p key={`tooltip-${index}`} className="text-sm" style={{ color: entry.color }}>
//             {`${entry.name}: ${entry.value.toLocaleString()}`}
//           </p>
//         ))}
//       </div>
//     )
//   }
//   return null
// }

// const LineChartComponent = ({ data, keys, colors, className }) => {
//   // If data is not provided or empty, return placeholder
//   if (!data || data.length === 0) {
//     return (
//       <div className={`h-64 flex items-center justify-center ${className}`}>
//         <p className="text-gray-500 dark:text-gray-400">No data available</p>
//       </div>
//     )
//   }

//   // Default colors if not provided
//   const defaultColors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"]
//   const chartColors = colors || defaultColors

//   // Extract keys from first data item if not provided
//   const chartKeys =
//     keys ||
//     (data[0] && typeof data[0] === "object"
//       ? Object.keys(data[0]).filter((key) => key !== "name" && key !== "date")
//       : [])

//   return (
//     <div className={`w-full ${className}`}>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
//           <XAxis
//             dataKey="date"
//             tick={{ fill: "#6B7280", fontSize: 12 }}
//             tickLine={{ stroke: "#6B7280" }}
//             axisLine={{ stroke: "#6B7280", strokeOpacity: 0.2 }}
//           />
//           <YAxis
//             tick={{ fill: "#6B7280", fontSize: 12 }}
//             tickLine={{ stroke: "#6B7280" }}
//             axisLine={{ stroke: "#6B7280", strokeOpacity: 0.2 }}
//             tickFormatter={(value) => value.toLocaleString()}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <Legend
//             wrapperStyle={{ paddingTop: 10 }}
//             formatter={(value) => <span className="text-sm font-medium">{value}</span>}
//           />
//           {chartKeys.map((key, index) => (
//             <Line
//               key={`line-${key}`}
//               type="monotone"
//               dataKey={key}
//               stroke={chartColors[index % chartColors.length]}
//               strokeWidth={2}
//               dot={{ r: 4, strokeWidth: 2 }}
//               activeDot={{ r: 6, strokeWidth: 0 }}
//               animationDuration={1500}
//             />
//           ))}
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// export default LineChartComponent


import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
        <p className="font-medium text-sm">{payload[0].name}</p>
        <p className="text-sm" style={{ color: payload[0].color }}>
          {`Value: ${payload[0].value.toLocaleString()}`}
        </p>
      </div>
    )
  }
  return null
}

const PieChartComponent = ({ data, colors, className }) => {
  // If data is not provided or empty, return placeholder
  if (!data || data.length === 0) {
    return (
      <div className={`h-64 flex items-center justify-center ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    )
  }

  // Default colors if not provided
  const defaultColors = [
    "#6366f1", // Indigo
    "#22c55e", // Green
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#8b5cf6", // Violet
    "#06b6d4", // Cyan
    "#ec4899", // Pink
  ]
  const chartColors = colors || defaultColors

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 20 }}
            formatter={(value) => <span className="text-sm font-medium">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieChartComponent
