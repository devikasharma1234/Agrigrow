import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Upload,
  Image as ImageIcon,
  X,
  CheckCircle,
  TrendingUp,
  MapPin,
  Calendar,
  Loader2,
  Camera,
  FileImage,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

interface DetectionResult {
  wasteType: string;
  confidence: number;
  quantity: number;
  estimatedValue: number;
  marketDemand: string;
  suggestions: string[];
}

interface UploadHistory {
  id: string;
  wasteType: string;
  quantity: number;
  value: number;
  date: string;
  status: 'processing' | 'matched' | 'sold';
}

export default function Dashboard() {
  const { user } = useAuth();
  console.log('Dashboard component rendered for user:', user);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock upload history
  const [uploadHistory] = useState<UploadHistory[]>([
    {
      id: '1',
      wasteType: 'Rice Straw',
      quantity: 500,
      value: 2500,
      date: '2025-01-15',
      status: 'matched'
    },
    {
      id: '2',
      wasteType: 'Wheat Residue',
      quantity: 300,
      value: 1800,
      date: '2025-01-14',
      status: 'sold'
    },
    {
      id: '3',
      wasteType: 'Sugarcane Bagasse',
      quantity: 800,
      value: 4800,
      date: '2025-01-13',
      status: 'processing'
    }
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setDetectionResult(null);
    } else {
      toast.error('Please select an image file');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile || !quantity) {
      toast.error('Please select an image and enter quantity');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: DetectionResult[] = [
        {
          wasteType: 'Rice Straw',
          confidence: 94,
          quantity: parseFloat(quantity),
          estimatedValue: parseFloat(quantity) * 5,
          marketDemand: 'High',
          suggestions: [
            'Perfect for biofuel production',
            'High demand from paper mills',
            'Can be used for animal bedding'
          ]
        },
        {
          wasteType: 'Wheat Residue',
          confidence: 87,
          quantity: parseFloat(quantity),
          estimatedValue: parseFloat(quantity) * 6,
          marketDemand: 'Medium',
          suggestions: [
            'Suitable for mushroom cultivation',
            'Good for compost production',
            'Used in construction materials'
          ]
        },
        {
          wasteType: 'Sugarcane Bagasse',
          confidence: 91,
          quantity: parseFloat(quantity),
          estimatedValue: parseFloat(quantity) * 6,
          marketDemand: 'Very High',
          suggestions: [
            'Excellent for paper manufacturing',
            'Used in bioethanol production',
            'High value in textile industry'
          ]
        }
      ];

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setDetectionResult(randomResult);
      setIsAnalyzing(false);
      toast.success('Analysis complete!');
    }, 3000);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setDetectionResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      case 'matched':
        return <Badge className="bg-eco-600">Matched</Badge>;
      case 'sold':
        return <Badge className="bg-green-600">Sold</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Upload your agricultural waste images to detect type and find buyers
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-eco-600" />
                <span>Upload Agricultural Waste</span>
              </CardTitle>
              <CardDescription>
                Upload an image of your agricultural waste for AI-powered detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-eco-500 bg-eco-50' 
                    : 'border-gray-300 hover:border-eco-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-full h-48 mx-auto rounded-lg object-cover"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-eco-100 rounded-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-eco-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Drop your image here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports JPG, PNG, WebP up to 10MB
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4"
                    >
                      <FileImage className="mr-2 h-4 w-4" />
                      Choose Image
                    </Button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>

              {/* Quantity Input */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <select
                    id="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="tons">Tons</option>
                    <option value="quintal">Quintal</option>
                  </select>
                </div>
              </div>

              {/* Analyze Button */}
              <Button
                onClick={analyzeImage}
                disabled={!selectedFile || !quantity || isAnalyzing}
                className="w-full bg-eco-600 hover:bg-eco-700"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Image...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-4 w-4" />
                    Analyze Waste Type
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Detection Results */}
          {detectionResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Detection Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Detected Waste Type</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-2xl font-bold text-eco-700">
                          {detectionResult.wasteType}
                        </span>
                        <Badge className="bg-green-100 text-green-800">
                          {detectionResult.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Estimated Value</Label>
                      <div className="text-2xl font-bold text-earth-600 mt-1">
                        ₹{detectionResult.estimatedValue.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-500">
                        ₹{(detectionResult.estimatedValue / detectionResult.quantity).toFixed(2)} per {unit}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Market Demand</Label>
                      <Badge 
                        className={`mt-1 ${
                          detectionResult.marketDemand === 'Very High' ? 'bg-green-600' :
                          detectionResult.marketDemand === 'High' ? 'bg-eco-600' :
                          'bg-yellow-600'
                        }`}
                      >
                        {detectionResult.marketDemand}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">Usage Suggestions</Label>
                    <ul className="mt-2 space-y-2">
                      {detectionResult.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-eco-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="bg-eco-600 hover:bg-eco-700">
                    Find Matching Industries
                  </Button>
                  <Button variant="outline">
                    Save to Inventory
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-medium">₹8,100</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-eco-600">1.6T</div>
                  <div className="text-xs text-gray-600">Waste Processed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-earth-600">2.1T</div>
                  <div className="text-xs text-gray-600">CO₂ Saved</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Uploads */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {uploadHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{item.wasteType}</div>
                    <div className="text-xs text-gray-600">
                      {item.quantity} kg • ₹{item.value.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Find Nearby Buyers
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Market Prices
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Carbon Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
