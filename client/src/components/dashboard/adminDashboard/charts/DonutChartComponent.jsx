// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
//         <p className="font-medium text-sm">{payload[0].name}</p>
//         <p className="text-sm" style={{ color: payload[0].color }}>
//           {`Value: ${payload[0].value.toLocaleString()}`}
//         </p>
//         <p className="text-sm" style={{ color: payload[0].color }}>
//           {`Percentage: ${((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}%`}
//         </p>
//       </div>
//     )
//   }
//   return null
// }

// const DonutChartComponent = ({ data, colors, className }) => {
//   // If data is not provided or empty, return placeholder
//   if (!data || data.length === 0) {
//     return (
//       <div className={`h-64 flex items-center justify-center ${className}`}>
//         <p className="text-gray-500 dark:text-gray-400">No data available</p>
//       </div>
//     )
//   }

//   // Calculate total for percentage calculations
//   const total = data.reduce((sum, item) => sum + item.value, 0)

//   // Add total to each data item for tooltip
//   const enhancedData = data.map((item) => ({
//     ...item,
//     total,
//   }))

//   // Default colors if not provided
//   const defaultColors = [
//     "#6366f1", // Indigo
//     "#22c55e", // Green
//     "#f59e0b", // Amber
//     "#ef4444", // Red
//     "#8b5cf6", // Violet
//     "#06b6d4", // Cyan
//     "#ec4899", // Pink
//   ]
//   const chartColors = colors || defaultColors

//   return (
//     <div className={`w-full ${className}`}>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={enhancedData}
//             cx="50%"
//             cy="50%"
//             innerRadius={60}
//             outerRadius={100}
//             fill="#8884d8"
//             paddingAngle={2}
//             dataKey="value"
//             animationDuration={1500}
//           >
//             {enhancedData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={chartColors[index % chartColors.length]}
//                 stroke="rgba(255,255,255,0.2)"
//                 strokeWidth={1}
//               />
//             ))}
//           </Pie>
//           <Tooltip content={<CustomTooltip />} />
//           <Legend
//             layout="horizontal"
//             verticalAlign="bottom"
//             align="center"
//             wrapperStyle={{ paddingTop: 20 }}
//             formatter={(value) => <span className="text-sm font-medium">{value}</span>}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// export default DonutChartComponent


import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
        <p className="font-medium text-sm">{payload[0].name}</p>
        <p className="text-sm" style={{ color: payload[0].color }}>
          {`Value: ${payload[0].value.toLocaleString()}`}
        </p>
        <p className="text-sm" style={{ color: payload[0].color }}>
          {`Percentage: ${((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}%`}
        </p>
      </div>
    )
  }
  return null
}

const DonutChartComponent = ({ data, colors, className }) => {
  // If data is not provided or empty, return placeholder
  if (!data || data.length === 0) {
    return (
      <div className={`h-64 flex items-center justify-center ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    )
  }

  // Calculate total for percentage calculations
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Add total to each data item for tooltip
  const enhancedData = data.map((item) => ({
    ...item,
    total,
  }))

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
            data={enhancedData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            animationDuration={1500}
          >
            {enhancedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartColors[index % chartColors.length]}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1}
              />
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

export default DonutChartComponent
