import { 
    Users, 
    HandCoins, 
    Target, 
    Rocket, 
    BookOpen, 
    Shield 
  } from 'lucide-react';
  
  export default function WhyImportant() {
    const importanceFeatures = [
      {
        icon: Users,
        title: "Diverse Talents Matter",
        description: "Every individual brings unique skills and perspectives. We celebrate your distinctive abilities and create opportunities tailored to your strengths."
      },
      {
        icon: HandCoins,
        title: "Fair Compensation",
        description: "Your hard work deserves proper recognition. We ensure transparent, competitive compensation that reflects the true value of your contributions."
      },
      {
        icon: Target,
        title: "Personal Growth",
        description: "More than just tasks, we provide a platform for continuous learning, skill development, and professional advancement."
      },
      {
        icon: Rocket,
        title: "Career Acceleration",
        description: "Transform individual tasks into long-term career opportunities. We connect talented individuals with meaningful work that propels your professional journey."
      },
      {
        icon: BookOpen,
        title: "Continuous Learning",
        description: "Access resources, workshops, and training programs designed to expand your skill set and keep you at the forefront of your industry."
      },
      {
        icon: Shield,
        title: "Secure Environment",
        description: "Your safety and trust are paramount. We maintain rigorous standards to protect your data, payments, and professional reputation."
      }
    ];
  
    return (
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why You Are Important to Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You're not just a worker—you're the heartbeat of our platform. Your skills, dedication, and unique perspectives drive innovation and success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {importanceFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <IconComponent 
                        className="w-8 h-8 text-blue-600"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }