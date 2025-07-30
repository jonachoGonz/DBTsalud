import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    id: 1,
    title: "Search for the right Therapist",
    description: "Browse through our curated list of qualified therapists and find the perfect match for your needs.",
    icon: "chair"
  },
  {
    id: 2,
    title: "See what they actually think",
    description: "Read authentic reviews and detailed profiles to understand each therapist's approach and expertise.",
    icon: "sofa"
  },
  {
    id: 3,
    title: "Make Contact",
    description: "Reach out directly through our platform to schedule your first consultation and begin your journey.",
    icon: "loveseat"
  }
];

const FurnitureIcon = ({ type }: { type: string }) => {
  if (type === 'chair') {
    return (
      <div className="w-20 h-20 relative">
        {/* Chair back */}
        <div className="absolute top-0 left-4 right-4 h-12 bg-blue-400 rounded-t-lg"></div>
        {/* Chair seat */}
        <div className="absolute bottom-4 left-2 right-2 h-8 bg-blue-500 rounded"></div>
        {/* Chair legs */}
        <div className="absolute bottom-0 left-2 w-1 h-4 bg-blue-700"></div>
        <div className="absolute bottom-0 right-2 w-1 h-4 bg-blue-700"></div>
        <div className="absolute bottom-0 left-6 w-1 h-4 bg-blue-700"></div>
        <div className="absolute bottom-0 right-6 w-1 h-4 bg-blue-700"></div>
      </div>
    );
  }
  
  if (type === 'sofa') {
    return (
      <div className="w-20 h-20 relative">
        {/* Sofa back */}
        <div className="absolute top-2 left-0 right-0 h-10 bg-green-400 rounded-t-lg"></div>
        {/* Sofa seat */}
        <div className="absolute bottom-4 left-2 right-2 h-6 bg-green-500 rounded"></div>
        {/* Sofa arms */}
        <div className="absolute top-4 left-0 w-4 h-8 bg-green-600 rounded-l"></div>
        <div className="absolute top-4 right-0 w-4 h-8 bg-green-600 rounded-r"></div>
        {/* Legs */}
        <div className="absolute bottom-0 left-4 w-1 h-4 bg-green-800"></div>
        <div className="absolute bottom-0 right-4 w-1 h-4 bg-green-800"></div>
      </div>
    );
  }
  
  if (type === 'loveseat') {
    return (
      <div className="w-20 h-20 relative">
        {/* Loveseat back */}
        <div className="absolute top-1 left-1 right-1 h-12 bg-purple-400 rounded-t-lg"></div>
        {/* Loveseat seat */}
        <div className="absolute bottom-4 left-3 right-3 h-7 bg-purple-500 rounded"></div>
        {/* Arms */}
        <div className="absolute top-3 left-1 w-3 h-10 bg-purple-600 rounded-l"></div>
        <div className="absolute top-3 right-1 w-3 h-10 bg-purple-600 rounded-r"></div>
        {/* Legs */}
        <div className="absolute bottom-0 left-5 w-1 h-4 bg-purple-800"></div>
        <div className="absolute bottom-0 right-5 w-1 h-4 bg-purple-800"></div>
      </div>
    );
  }
  
  return <div className="w-20 h-20 bg-gray-200 rounded"></div>;
};

const TherapyHowTo = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The <span className="text-emerald-500">how to's</span>
            <br />
            of Therapy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card key={step.id} className="bg-white hover:shadow-lg transition-shadow text-center">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <FurnitureIcon type={step.icon} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-full">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TherapyHowTo;
