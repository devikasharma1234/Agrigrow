import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  Leaf, 
  Globe, 
  Award,
  Calendar,
  Download,
  Target,
  Zap,
  TreePine,
  Factory
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CarbonData {
  month: string;
  saved: number;
  prevented: number;
  target: number;
}

interface WasteTypeEmission {
  type: string;
  emission: number;
  color: string;
}

export default function Carbon() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('12months');

  // Mock carbon emission data
  const carbonTrends: CarbonData[] = [
    { month: 'Jan', saved: 1.2, prevented: 2.1, target: 2.0 },
    { month: 'Feb', saved: 1.8, prevented: 2.8, target: 2.2 },
    { month: 'Mar', saved: 2.3, prevented: 3.2, target: 2.4 },
    { month: 'Apr', saved: 2.8, prevented: 3.8, target: 2.6 },
    { month: 'May', saved: 3.2, prevented: 4.1, target: 2.8 },
    { month: 'Jun', saved: 2.9, prevented: 3.9, target: 3.0 },
    { month: 'Jul', saved: 3.4, prevented: 4.5, target: 3.2 },
    { month: 'Aug', saved: 3.8, prevented: 4.8, target: 3.4 },
    { month: 'Sep', saved: 4.2, prevented: 5.2, target: 3.6 },
    { month: 'Oct', saved: 3.9, prevented: 4.9, target: 3.8 },
    { month: 'Nov', saved: 4.1, prevented: 5.1, target: 4.0 },
    { month: 'Dec', saved: 4.5, prevented: 5.5, target: 4.2 }
  ];

  const wasteTypeEmissions: WasteTypeEmission[] = [
    { type: 'Rice Straw', emission: 35, color: '#10B981' },
    { type: 'Wheat Residue', emission: 28, color: '#F59E0B' },
    { type: 'Sugarcane Bagasse', emission: 22, color: '#EF4444' },
    { type: 'Cotton Stalks', emission: 15, color: '#8B5CF6' }
  ];

  const monthlyComparison = [
    { month: 'Jan', withPlatform: 1.2, withoutPlatform: 5.8 },
    { month: 'Feb', withPlatform: 1.8, withoutPlatform: 6.2 },
    { month: 'Mar', withPlatform: 2.3, withoutPlatform: 6.5 },
    { month: 'Apr', withPlatform: 2.8, withoutPlatform: 6.8 },
    { month: 'May', withPlatform: 3.2, withoutPlatform: 7.1 },
    { month: 'Jun', withPlatform: 2.9, withoutPlatform: 6.9 }
  ];

  const totalCarbonSaved = carbonTrends.reduce((total, month) => total + month.saved, 0);
  const totalCarbonPrevented = carbonTrends.reduce((total, month) => total + month.prevented, 0);
  const targetAchievement = (totalCarbonSaved / carbonTrends.reduce((total, month) => total + month.target, 0)) * 100;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Carbon Emission Dashboard</h1>
          <p className="text-gray-600">
            Track your environmental impact and carbon footprint reduction
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total CO₂ Saved</p>
                <p className="text-3xl font-bold text-green-700">{totalCarbonSaved.toFixed(1)}T</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  23% reduction this year
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Emissions Prevented</p>
                <p className="text-3xl font-bold text-blue-700">{totalCarbonPrevented.toFixed(1)}T</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  35% improvement
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Target Achievement</p>
                <p className="text-3xl font-bold text-purple-700">{targetAchievement.toFixed(0)}%</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Target className="h-3 w-3 mr-1" />
                  Above target
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Trees Equivalent</p>
                <p className="text-3xl font-bold text-orange-700">{Math.round(totalCarbonSaved * 45)}</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <TreePine className="h-3 w-3 mr-1" />
                  Trees planted equivalent
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TreePine className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-eco-600" />
                <span>Carbon Emission Trends</span>
              </CardTitle>
              <CardDescription>
                Monthly carbon savings and emissions prevented over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={carbonTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Tons CO₂', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value, name) => [`${value}T`, name === 'saved' ? 'CO₂ Saved' : name === 'prevented' ? 'Emissions Prevented' : 'Target']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="saved" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="CO₂ Saved"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="prevented" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Emissions Prevented"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Impact Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Impact Comparison: With vs Without Platform</CardTitle>
              <CardDescription>
                Carbon emissions comparison between using AGRIGROW platform and traditional waste burning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Tons CO₂', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value, name) => [`${value}T`, name === 'withPlatform' ? 'With AGRIGROW' : 'Traditional Burning']}
                  />
                  <Legend />
                  <Bar dataKey="withPlatform" fill="#10B981" name="With AGRIGROW" />
                  <Bar dataKey="withoutPlatform" fill="#EF4444" name="Traditional Burning" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Waste Type Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Emission by Waste Type</CardTitle>
              <CardDescription>Carbon savings breakdown by agricultural waste type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={wasteTypeEmissions}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="emission"
                    label={({ type, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {wasteTypeEmissions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Contribution']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {wasteTypeEmissions.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.type}</span>
                    </div>
                    <span className="font-medium">{item.emission}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environmental Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Environmental Goals</CardTitle>
              <CardDescription>Progress towards sustainability targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Annual CO₂ Reduction</span>
                  <span className="font-medium">78% of 50T target</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Waste Processing</span>
                  <span className="font-medium">92% of 500T target</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Industry Partnerships</span>
                  <span className="font-medium">65% of 30 target</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-eco-600" />
                    <span className="text-sm font-medium">Carbon Neutral Status</span>
                  </div>
                  <Badge className="bg-eco-100 text-eco-800">In Progress</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Carbon Saver Badge</p>
                  <p className="text-xs text-gray-600">Saved 10T CO₂ this month</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Factory className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Industry Partner</p>
                  <p className="text-xs text-gray-600">Connected with BioFuel Ltd</p>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Target className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Target Achieved</p>
                  <p className="text-xs text-gray-600">Exceeded monthly CO₂ target</p>
                  <p className="text-xs text-gray-500">2 weeks ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Carbon Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Download Carbon Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Assessment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Zap className="mr-2 h-4 w-4" />
                Optimize Operations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
