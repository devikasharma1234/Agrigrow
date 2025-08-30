import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Factory, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  TrendingUp,
  Filter,
  Search,
  MessageCircle,
  Users,
  Clock,
  DollarSign,
  Truck
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

interface Industry {
  id: string;
  name: string;
  type: string;
  location: string;
  distance: number;
  rating: number;
  reviewCount: number;
  wasteTypes: string[];
  priceRange: string;
  monthlyDemand: number;
  responseTime: string;
  verified: boolean;
  description: string;
  contact: {
    phone: string;
    email: string;
  };
  logo?: string;
  recentPurchases: number;
}

export default function Industries() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWasteType, setSelectedWasteType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);

  // Mock industries data
  const [industries] = useState<Industry[]>([
    {
      id: '1',
      name: 'GreenTech Paper Mills',
      type: 'Paper Manufacturing',
      location: 'Ludhiana, Punjab',
      distance: 15,
      rating: 4.8,
      reviewCount: 124,
      wasteTypes: ['Rice Straw', 'Wheat Residue', 'Sugarcane Bagasse'],
      priceRange: '₹4-6 per kg',
      monthlyDemand: 500,
      responseTime: '< 2 hours',
      verified: true,
      description: 'Leading paper manufacturer specializing in eco-friendly products made from agricultural waste.',
      contact: {
        phone: '+91 98765 43210',
        email: 'procurement@greentech.com'
      },
      recentPurchases: 45
    },
    {
      id: '2',
      name: 'BioFuel Solutions Ltd',
      type: 'Renewable Energy',
      location: 'Chandigarh',
      distance: 25,
      rating: 4.6,
      reviewCount: 89,
      wasteTypes: ['Rice Straw', 'Corn Stalks', 'Cotton Stalks'],
      priceRange: '₹5-8 per kg',
      monthlyDemand: 800,
      responseTime: '< 4 hours',
      verified: true,
      description: 'Converting agricultural waste into clean biofuels for sustainable energy solutions.',
      contact: {
        phone: '+91 98765 43211',
        email: 'sourcing@biofuel.com'
      },
      recentPurchases: 38
    },
    {
      id: '3',
      name: 'EcoBoard Manufacturing',
      type: 'Construction Materials',
      location: 'Amritsar, Punjab',
      distance: 35,
      rating: 4.5,
      reviewCount: 67,
      wasteTypes: ['Wheat Residue', 'Rice Husk', 'Bagasse'],
      priceRange: '₹3-5 per kg',
      monthlyDemand: 300,
      responseTime: '< 6 hours',
      verified: true,
      description: 'Manufacturing eco-friendly construction boards from agricultural waste materials.',
      contact: {
        phone: '+91 98765 43212',
        email: 'purchase@ecoboard.com'
      },
      recentPurchases: 29
    },
    {
      id: '4',
      name: 'AgriCompost Industries',
      type: 'Organic Fertilizer',
      location: 'Jalandhar, Punjab',
      distance: 20,
      rating: 4.7,
      reviewCount: 156,
      wasteTypes: ['All Organic Waste', 'Crop Residue'],
      priceRange: '₹2-4 per kg',
      monthlyDemand: 1200,
      responseTime: '< 3 hours',
      verified: true,
      description: 'Converting agricultural waste into high-quality organic fertilizers and compost.',
      contact: {
        phone: '+91 98765 43213',
        email: 'raw.materials@agricompost.com'
      },
      recentPurchases: 67
    },
    {
      id: '5',
      name: 'TextileFiber Corp',
      type: 'Textile Manufacturing',
      location: 'Bathinda, Punjab',
      distance: 45,
      rating: 4.4,
      reviewCount: 93,
      wasteTypes: ['Cotton Stalks', 'Jute Waste', 'Hemp Residue'],
      priceRange: '₹6-9 per kg',
      monthlyDemand: 400,
      responseTime: '< 8 hours',
      verified: false,
      description: 'Producing sustainable textile fibers from agricultural waste materials.',
      contact: {
        phone: '+91 98765 43214',
        email: 'procurement@textilefiber.com'
      },
      recentPurchases: 22
    },
    {
      id: '6',
      name: 'BioPackaging Solutions',
      type: 'Packaging Industry',
      location: 'Patiala, Punjab',
      distance: 30,
      rating: 4.9,
      reviewCount: 203,
      wasteTypes: ['Sugarcane Bagasse', 'Wheat Straw', 'Rice Husk'],
      priceRange: '₹7-10 per kg',
      monthlyDemand: 600,
      responseTime: '< 1 hour',
      verified: true,
      description: 'Creating biodegradable packaging materials from agricultural waste.',
      contact: {
        phone: '+91 98765 43215',
        email: 'sourcing@biopackaging.com'
      },
      recentPurchases: 54
    }
  ]);

  const wasteTypes = ['all', 'Rice Straw', 'Wheat Residue', 'Sugarcane Bagasse', 'Cotton Stalks', 'Corn Stalks'];
  const locations = ['all', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan'];

  const filteredIndustries = industries
    .filter(industry => {
      const matchesSearch = industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           industry.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesWasteType = selectedWasteType === 'all' || 
                               industry.wasteTypes.some(type => type.toLowerCase().includes(selectedWasteType.toLowerCase()));
      const matchesLocation = selectedLocation === 'all' || 
                              industry.location.toLowerCase().includes(selectedLocation.toLowerCase());
      
      return matchesSearch && matchesWasteType && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance': return a.distance - b.distance;
        case 'rating': return b.rating - a.rating;
        case 'demand': return b.monthlyDemand - a.monthlyDemand;
        case 'price': return b.priceRange.localeCompare(a.priceRange);
        default: return 0;
      }
    });

  const connectWithIndustry = (industry: Industry) => {
    toast.success(`Connection request sent to ${industry.name}!`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Matching Industries</h1>
        <p className="text-gray-600">
          Find industries that need your agricultural waste and connect directly
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-eco-600" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search industries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Waste Type</Label>
              <Select value={selectedWasteType} onValueChange={setSelectedWasteType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select waste type" />
                </SelectTrigger>
                <SelectContent>
                  {wasteTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="demand">Demand</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Found {filteredIndustries.length} matching industries
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Verified</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>High Demand</span>
          </div>
        </div>
      </div>

      {/* Industries Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredIndustries.map((industry) => (
          <Card key={industry.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={industry.logo} />
                      <AvatarFallback className="bg-eco-100">
                        <Factory className="h-6 w-6 text-eco-600" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">{industry.name}</h3>
                        {industry.verified && (
                          <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{industry.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{industry.rating}</span>
                      <span className="text-sm text-gray-500">({industry.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{industry.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <span>{industry.distance} km away</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span>{industry.priceRange}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{industry.responseTime}</span>
                  </div>
                </div>

                {/* Waste Types */}
                <div>
                  <Label className="text-sm font-medium text-gray-600">Accepts:</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {industry.wasteTypes.slice(0, 3).map((type, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                    {industry.wasteTypes.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{industry.wasteTypes.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
                  <div className="text-center">
                    <div className="font-semibold text-eco-600">{industry.monthlyDemand}T</div>
                    <div className="text-xs text-gray-500">Monthly Demand</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-earth-600">{industry.recentPurchases}</div>
                    <div className="text-xs text-gray-500">Recent Purchases</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-xs text-gray-500">Growing</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setSelectedIndustry(industry)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-eco-100">
                              <Factory className="h-5 w-5 text-eco-600" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span>{industry.name}</span>
                            {industry.verified && (
                              <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Verified</Badge>
                            )}
                          </div>
                        </DialogTitle>
                        <DialogDescription>
                          {industry.description}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="font-medium">Contact Information</Label>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center space-x-2 text-sm">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span>{industry.contact.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span>{industry.contact.email}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="font-medium">Requirements</Label>
                            <div className="mt-2 space-y-1">
                              <div className="text-sm">Monthly Demand: <span className="font-medium">{industry.monthlyDemand}T</span></div>
                              <div className="text-sm">Price Range: <span className="font-medium">{industry.priceRange}</span></div>
                              <div className="text-sm">Response Time: <span className="font-medium">{industry.responseTime}</span></div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="font-medium">Accepted Waste Types</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {industry.wasteTypes.map((type, index) => (
                              <Badge key={index} variant="outline">{type}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            className="flex-1 bg-eco-600 hover:bg-eco-700"
                            onClick={() => connectWithIndustry(industry)}
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Connect Now
                          </Button>
                          <Button variant="outline">
                            <Phone className="mr-2 h-4 w-4" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    className="flex-1 bg-eco-600 hover:bg-eco-700"
                    onClick={() => connectWithIndustry(industry)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIndustries.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Factory className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Industries Found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms to find more matching industries.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
