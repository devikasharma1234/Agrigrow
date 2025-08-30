import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Leaf, 
  Upload, 
  Factory, 
  BarChart3, 
  Globe, 
  TrendingUp,
  Zap,
  Shield,
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Index() {
  const features = [
    {
      icon: Upload,
      title: 'Instant Scanner/Upload',
      description: 'Upload or scan agricultural waste for AI-powered classification and instant suggestions.',
      color: 'bg-eco-500'
    },
    {
      icon: BarChart3,
      title: 'Carbon Footprint Dashboard',
      description: 'Track CO₂ savings, avoided emissions, and your contribution to environmental sustainability.',
      color: 'bg-earth-500'
    },
    {
      icon: Factory,
      title: 'Industry Matching',
      description: 'Connect directly with industries, startups, and manufacturers seeking your agricultural waste.',
      color: 'bg-eco-600'
    },
    {
      icon: Globe,
      title: 'Trade Locator',
      description: 'Find nearby industries that accept your farm waste with our intelligent location mapping.',
      color: 'bg-earth-600'
    },
    {
      icon: TrendingUp,
      title: 'Waste Value Estimator',
      description: 'AI-powered tool that provides current market prices for your agro-waste before selling.',
      color: 'bg-eco-700'
    },
    {
      icon: Shield,
      title: 'Transaction Records',
      description: 'Complete transparency with detailed deal records, receipts, and ratings for trust.',
      color: 'bg-earth-700'
    }
  ];

  const stats = [
    { value: '₹30,000+', label: 'Crores in Lost Business Prevented', icon: TrendingUp },
    { value: '20%', label: 'Increase in Farmer Income', icon: Users },
    { value: '100%', label: 'Reduction in Waste Burning', icon: Leaf },
    { value: '24/7', label: 'Real-time Marketplace', icon: Zap }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-eco-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-eco-600 rounded-lg">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-eco-800">AGRIGROW</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-eco-700 hover:text-eco-800">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-eco-600 hover:bg-eco-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-eco-50 via-white to-earth-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  AGRIGROW
                </h1>
                <p className="text-2xl lg:text-3xl font-semibold text-eco-600">
                  "WHERE WASTE FINDS WORTH"
                </p>
                <p className="text-lg text-gray-600 max-w-xl">
                  Turning agricultural waste into a climate-positive, profitable ecosystem. 
                  Connect farmers with industries through AI-powered matching and real-time data.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-eco-600 hover:bg-eco-700 text-white px-8 py-3">
                    Start Transforming Waste
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-eco-600 text-eco-600 hover:bg-eco-50 px-8 py-3">
                    Login to Platform
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-eco-600" />
                  <span>AI-Powered Detection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-eco-600" />
                  <span>Real-time Matching</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-eco-600" />
                  <span>Multilingual Support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg"
                  alt="Golden wheat field representing agricultural abundance"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-eco-600/90 to-earth-600/90 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <h3 className="text-3xl font-bold mb-4">From Waste to Worth</h3>
                    <p className="text-lg opacity-90">Transforming agricultural abundance into sustainable value</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-eco-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-eco-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Agriculture Meets Innovation
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how we're transforming the agricultural landscape through sustainable practices and technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/33605458/pexels-photo-33605458.jpeg"
                alt="Fresh tomatoes representing quality agricultural produce"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Fresh Produce Quality</h3>
                  <p className="text-sm opacity-90">Premium agricultural output through sustainable farming</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/7663316/pexels-photo-7663316.jpeg"
                alt="Sustainable agricultural technology in green fields"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Smart Agriculture</h3>
                  <p className="text-sm opacity-90">Technology-driven sustainable farming solutions</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/33571966/pexels-photo-33571966.jpeg"
                alt="Local farmers market showcasing fresh vegetables"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Marketplace Connection</h3>
                  <p className="text-sm opacity-90">Direct farm-to-industry connections</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/31935682/pexels-photo-31935682.jpeg"
                alt="Modern drone technology for precision agriculture"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Precision Technology</h3>
                  <p className="text-sm opacity-90">Advanced drone monitoring and targeted agricultural solutions</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/30733226/pexels-photo-30733226.jpeg"
                alt="Traditional farmers working in agricultural fields"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Traditional Farming</h3>
                  <p className="text-sm opacity-90">Honoring time-tested agricultural practices and knowledge</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://images.pexels.com/photos/5608056/pexels-photo-5608056.jpeg"
                alt="Agricultural waste materials ready for transformation"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Waste Transformation</h3>
                  <p className="text-sm opacity-90">Converting agricultural waste into valuable resources</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-gray-50 to-eco-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform connects the entire agricultural waste ecosystem,
              from farmers to industries, creating value at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-eco-600 to-earth-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Agricultural Waste?
          </h2>
          <p className="text-xl text-eco-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and industries already using AGRIGROW to create 
            sustainable value from agricultural waste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-eco-600 hover:bg-gray-100 px-8 py-3">
                Sign Up as Farmer
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-eco-600 px-8 py-3">
                Join as Industry
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-eco-600 rounded-lg">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">AGRIGROW</span>
              </div>
              <p className="text-gray-400">
                Transforming agricultural waste into valuable resources for a sustainable future.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/signup" className="hover:text-white">Get Started</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>AI Waste Detection</li>
                <li>Industry Matching</li>
                <li>Carbon Tracking</li>
                <li>Value Estimation</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Impact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Climate Positive</li>
                <li>Farmer Income</li>
                <li>Circular Economy</li>
                <li>Sustainable Future</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AGRIGROW. Built for a sustainable future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
