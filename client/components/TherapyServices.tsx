import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Brain, Users, Star } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: "Individual Therapy",
    description: "One-on-one sessions with qualified therapists for personal growth and mental health support.",
    categories: ["CBT", "Psychodynamic", "Humanistic", "EMDR"],
    color: "bg-blue-100 text-blue-800"
  },
  {
    icon: Users,
    title: "Couples Therapy",
    description: "Relationship counselling to help couples improve communication and resolve conflicts.",
    categories: ["Gottman Method", "EFT", "Solution-Focused"],
    color: "bg-green-100 text-green-800"
  },
  {
    icon: Heart,
    title: "Family Therapy",
    description: "Family counselling sessions to strengthen family bonds and resolve family issues.",
    categories: ["Systemic", "Narrative", "Structural"],
    color: "bg-purple-100 text-purple-800"
  },
  {
    icon: Star,
    title: "Specialist Services",
    description: "Specialized therapy for specific conditions like trauma, addiction, eating disorders.",
    categories: ["Trauma", "Addiction", "Eating Disorders", "ADHD"],
    color: "bg-orange-100 text-orange-800"
  }
];

const TherapyServices = () => {
  return (
    <section id="therapy-types" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Types of Therapy Available
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the right therapeutic approach for your unique needs. 
            Our directory includes various therapy types and specializations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {service.categories.map((category, catIndex) => (
                      <span 
                        key={catIndex}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Find Therapists
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-blue-800 hover:bg-blue-900 text-white">
            View All Therapy Types
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TherapyServices;
