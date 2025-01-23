import { 
    UserPlus, 
    Search, 
    CheckCircle, 
    CreditCard 
  } from 'lucide-react';
  
  export default function HowItWorks() {
    const steps = [
      {
        icon: UserPlus,
        title: "Create Your Account",
        description: "Sign up in minutes with a simple registration process. Complete your profile to showcase your skills and interests.",
        color: "bg-blue-100",
        iconColor: "text-blue-600"
      },
      {
        icon: Search,
        title: "Find Opportunities",
        description: "Browse through a wide range of tasks and projects matched to your skills. Filter by category, difficulty, and compensation.",
        color: "bg-green-100",
        iconColor: "text-green-600"
      },
      {
        icon: CheckCircle,
        title: "Complete Tasks",
        description: "Select tasks that match your expertise. Follow clear instructions, maintain quality, and submit your work through our platform.",
        color: "bg-purple-100",
        iconColor: "text-purple-600"
      },
      {
        icon: CreditCard,
        title: "Get Paid",
        description: "Receive instant payments upon task completion. Multiple withdrawal options and transparent pricing with no hidden fees.",
        color: "bg-orange-100",
        iconColor: "text-orange-600"
      }
    ];
  
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes earning simple, transparent, and rewarding. Follow these four easy steps to start your journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={index}
                  className="relative group"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-1 text-sm font-bold text-gray-700 shadow-md">
                    Step {index + 1}
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6 pt-10 text-center transform transition-all duration-300 hover:-translate-y-2">
                    <div className={`mx-auto w-20 h-20 ${step.color} rounded-full flex items-center justify-center mb-6`}>
                      <IconComponent 
                        className={`w-10 h-10 ${step.iconColor}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-gray-300 group-last:hidden" />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-md">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    );
  }