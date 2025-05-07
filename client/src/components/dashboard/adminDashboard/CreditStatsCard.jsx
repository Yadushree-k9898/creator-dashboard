// import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
// import { Coins, TrendingUp, Users, Clock } from "lucide-react"
// import { Skeleton } from "../../ui/skeleton"

// const CreditStatsCard = ({ creditStats }) => {
//   if (!creditStats) {
//     return <CreditStatsCardSkeleton />
//   }

//   return (
//     <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
//       <CardHeader className="bg-gradient-to-r from-primary/80 to-primary text-white p-6">
//         <CardTitle className="flex items-center text-xl">
//           <Coins className="mr-2 h-6 w-6" />
//           Platform Credit Statistics
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="bg-primary/5 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-primary/10 group">
//             <div className="flex items-center">
//               <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-all duration-300">
//                 <Coins className="h-8 w-8 text-primary" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Platform Credits</p>
//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
//                   {creditStats.totalPlatformCredits.toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </div>

//           <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-amber-100 dark:hover:bg-amber-900/30 group">
//             <div className="flex items-center">
//               <div className="bg-amber-100 dark:bg-amber-800/30 p-3 rounded-full group-hover:bg-amber-200 dark:group-hover:bg-amber-800/40 transition-all duration-300">
//                 <Clock className="h-8 w-8 text-amber-500 dark:text-amber-400" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Login Points</p>
//                 <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
//                   {creditStats.totalLoginPoints.toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </div>

//           <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-violet-100 dark:hover:bg-violet-900/30 group">
//             <div className="flex items-center">
//               <div className="bg-violet-100 dark:bg-violet-800/30 p-3 rounded-full group-hover:bg-violet-200 dark:group-hover:bg-violet-800/40 transition-all duration-300">
//                 <Users className="h-8 w-8 text-violet-500 dark:text-violet-400" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-violet-700 dark:text-violet-300">Profile Points</p>
//                 <h3 className="text-2xl font-bold text-violet-900 dark:text-violet-100">
//                   {creditStats.totalProfilePoints.toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </div>

//           <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-emerald-100 dark:hover:bg-emerald-900/30 group">
//             <div className="flex items-center">
//               <div className="bg-emerald-100 dark:bg-emerald-800/30 p-3 rounded-full group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/40 transition-all duration-300">
//                 <TrendingUp className="h-8 w-8 text-emerald-500 dark:text-emerald-400" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Interaction Points</p>
//                 <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
//                   {creditStats.totalInteractionPoints.toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8">
//           <h4 className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-200 flex items-center">
//             <TrendingUp className="h-4 w-4 mr-2 text-primary" />
//             Credit Distribution by Action
//           </h4>
//           <div className="space-y-3">
//             {creditStats.creditsByActionType?.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
//               >
//                 <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.action}</span>
//                 <div className="flex items-center">
//                   <span className="text-sm font-medium text-primary">{item.totalPoints.toLocaleString()}</span>
//                   <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({item.count} actions)</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// const CreditStatsCardSkeleton = () => {
//   return (
//     <Card className="overflow-hidden shadow-md">
//       <CardHeader className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-6">
//         <div className="flex items-center">
//           <Skeleton className="h-6 w-6 mr-2 rounded-full" />
//           <Skeleton className="h-6 w-48" />
//         </div>
//       </CardHeader>
//       <CardContent className="p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
//               <div className="flex items-center">
//                 <Skeleton className="h-14 w-14 rounded-full" />
//                 <div className="ml-4 space-y-2">
//                   <Skeleton className="h-4 w-32" />
//                   <Skeleton className="h-6 w-20" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-8 space-y-2">
//           <Skeleton className="h-5 w-48" />
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="flex justify-between items-center p-3">
//               <Skeleton className="h-4 w-32" />
//               <div className="flex items-center space-x-2">
//                 <Skeleton className="h-4 w-16" />
//                 <Skeleton className="h-4 w-12" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// export default CreditStatsCard


import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Coins, TrendingUp, Users, Clock } from "lucide-react"
import { Skeleton } from "../../ui/skeleton"

const CreditStatsCard = ({ creditStats }) => {
  if (!creditStats) {
    return <CreditStatsCardSkeleton />
  }

  // Create a safe version of creditStats with default values
  const safeStats = {
    totalPlatformCredits: creditStats.totalPlatformCredits || 0,
    totalLoginPoints: creditStats.totalLoginPoints || 0,
    totalProfilePoints: creditStats.totalProfilePoints || 0,
    totalInteractionPoints: creditStats.totalInteractionPoints || 0,
    creditsByActionType: creditStats.creditsByActionType || [],
  }

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-primary/80 to-primary text-white p-6">
        <CardTitle className="flex items-center text-xl">
          <Coins className="mr-2 h-6 w-6" />
          Platform Credit Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary/5 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-primary/10 group">
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-all duration-300">
                <Coins className="h-8 w-8 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Platform Credits</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {safeStats.totalPlatformCredits.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-amber-100 dark:hover:bg-amber-900/30 group">
            <div className="flex items-center">
              <div className="bg-amber-100 dark:bg-amber-800/30 p-3 rounded-full group-hover:bg-amber-200 dark:group-hover:bg-amber-800/40 transition-all duration-300">
                <Clock className="h-8 w-8 text-amber-500 dark:text-amber-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Login Points</p>
                <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                  {safeStats.totalLoginPoints.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-violet-100 dark:hover:bg-violet-900/30 group">
            <div className="flex items-center">
              <div className="bg-violet-100 dark:bg-violet-800/30 p-3 rounded-full group-hover:bg-violet-200 dark:group-hover:bg-violet-800/40 transition-all duration-300">
                <Users className="h-8 w-8 text-violet-500 dark:text-violet-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-violet-700 dark:text-violet-300">Profile Points</p>
                <h3 className="text-2xl font-bold text-violet-900 dark:text-violet-100">
                  {safeStats.totalProfilePoints.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-emerald-100 dark:hover:bg-emerald-900/30 group">
            <div className="flex items-center">
              <div className="bg-emerald-100 dark:bg-emerald-800/30 p-3 rounded-full group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/40 transition-all duration-300">
                <TrendingUp className="h-8 w-8 text-emerald-500 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Interaction Points</p>
                <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                  {safeStats.totalInteractionPoints.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {safeStats.creditsByActionType.length > 0 && (
          <div className="mt-8">
            <h4 className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-200 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              Credit Distribution by Action
            </h4>
            <div className="space-y-3">
              {safeStats.creditsByActionType.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.action}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-primary">{item.totalPoints.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({item.count} actions)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const CreditStatsCardSkeleton = () => {
  return (
    <Card className="overflow-hidden shadow-md">
      <CardHeader className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-6">
        <div className="flex items-center">
          <Skeleton className="h-6 w-6 mr-2 rounded-full" />
          <Skeleton className="h-6 w-48" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="ml-4 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-2">
          <Skeleton className="h-5 w-48" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center p-3">
              <Skeleton className="h-4 w-32" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default CreditStatsCard
