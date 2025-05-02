import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, TrendingUp, Users, Clock } from "lucide-react"

const CreditStatsCard = ({ creditStats }) => {
  if (!creditStats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Credit Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">No credit statistics available</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Coins className="mr-2 h-5 w-5" />
          Platform Credit Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Coins className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-600">Total Platform Credits</p>
                <h3 className="text-2xl font-bold text-blue-900">
                  {creditStats.totalPlatformCredits.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-600">Login Points</p>
                <h3 className="text-2xl font-bold text-green-900">{creditStats.totalLoginPoints.toLocaleString()}</h3>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-purple-600">Profile Points</p>
                <h3 className="text-2xl font-bold text-purple-900">
                  {creditStats.totalProfilePoints.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-indigo-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-indigo-600">Interaction Points</p>
                <h3 className="text-2xl font-bold text-indigo-900">
                  {creditStats.totalInteractionPoints.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Credit Distribution by Action</h4>
          <div className="space-y-2">
            {creditStats.creditsByActionType?.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{item.action}</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium">{item.totalPoints.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 ml-2">({item.count} actions)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreditStatsCard
