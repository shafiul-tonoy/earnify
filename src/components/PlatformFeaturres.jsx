import { 
    Globe, 
    Lock, 
    Clock, 
    Zap, 
    Smartphone, 
    DollarSign 
  } from 'lucide-react';
  
  export default function PlatformFeatures() {
    const features = [
      {
        icon: Globe,
        title: "Global Opportunities",
        description: "Access work from around the world. No geographical limitations mean more chances to earn and grow.",
        color: "bg-blue-100",
        iconColor: "text-blue-600"
      },
      {
        icon: Lock,
        title: "Secure Payments",
        description: "Guaranteed payment protection. We ensure you get paid fairly and on time for every completed task.",
        color: "bg-green-100",
        iconColor: "text-green-600"
      },
      {
        icon: Clock,
        title: "Flexible Scheduling",
        description: "Work on your own terms. Choose tasks that fit your schedule and lifestyle, giving you ultimate freedom.",
        color: "bg-purple-100",
        iconColor: "text-purple-600"
      },
      {
        icon: Zap,
        title: "Instant Matching",
        description: "Our advanced algorithm quickly connects you with tasks that match your skills and interests.",
        color: "bg-yellow-100",
        iconColor: "text-yellow-600"
      },
      {
        icon: Smartphone,
        title: "Mobile-Friendly",
        description: "Manage your work from anywhere. Our platform is fully optimized for mobile devices.",
        color: "bg-red-100",
        iconColor: "text-red-600"
      },
      {
        icon: DollarSign,
        title: "Competitive Rates",
        description: "Earn more with transparent, competitive pricing that values your time and expertise.",
        color: "bg-indigo-100",
        iconColor: "text-indigo-600"
      }
    ];
  
    return (
      <div className="bg-white py-16" id="features">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the powerful features that make our platform unique, designed to empower your professional journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-gray-100 p-6 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className={`mx-auto w-20 h-20 ${feature.color} rounded-full flex items-center justify-center mb-6`}>
                    <IconComponent 
                      className={`w-10 h-10 ${feature.iconColor}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-md">
              Explore More Features
            </button>
          </div>
        </div>
      </div>
    );
  }