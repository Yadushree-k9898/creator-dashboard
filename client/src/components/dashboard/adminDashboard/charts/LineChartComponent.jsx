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


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
        <p className="font-medium text-sm">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const LineChartComponent = ({ data, keys, colors, className }) => {
  // If data is not provided or empty, return placeholder
  if (!data || data.length === 0) {
    return (
      <div className={`h-64 flex items-center justify-center ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    )
  }

  // Default colors if not provided
  const defaultColors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"]
  const chartColors = colors || defaultColors

  // Extract keys from first data item if not provided
  const chartKeys =
    keys ||
    (data[0] && typeof data[0] === "object"
      ? Object.keys(data[0]).filter((key) => key !== "name" && key !== "date")
      : [])

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickLine={{ stroke: "#6B7280" }}
            axisLine={{ stroke: "#6B7280", strokeOpacity: 0.2 }}
          />
          <YAxis
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickLine={{ stroke: "#6B7280" }}
            axisLine={{ stroke: "#6B7280", strokeOpacity: 0.2 }}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: 10 }}
            formatter={(value) => <span className="text-sm font-medium">{value}</span>}
          />
          {chartKeys.map((key, index) => (
            <Line
              key={`line-${key}`}
              type="monotone"
              dataKey={key}
              stroke={chartColors[index % chartColors.length]}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartComponent
