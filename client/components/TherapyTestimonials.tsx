import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Emily Watson",
    location: "South London",
    rating: 5,
    text: "Finding my therapist through this platform was life-changing. The process was simple, and I was matched with someone who truly understood my needs.",
    therapy: "Anxiety & Depression"
  },
  {
    name: "Michael Chen",
    location: "East London", 
    rating: 5,
    text: "The quality of therapists on this platform is exceptional. My couples therapist helped us transform our relationship in just a few months.",
    therapy: "Couples Therapy"
  },
  {
    name: "Sophie Williams",
    location: "West London",
    rating: 5,
    text: "I was skeptical about online therapy directories, but this platform made it so easy to find a specialist who deals with trauma. Highly recommend!",
    therapy: "Trauma Therapy"
  }
];

const stats = [
  { number: "2,500+", label: "Verified Therapists" },
  { number: "15,000+", label: "Successful Sessions" },
  { number: "4.8/5", label: "Average Rating" },
  { number: "95%", label: "Client Satisfaction" }
];

const TherapyTestimonials = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from people who found the right therapist through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star key={starIndex} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
                  <p className="text-gray-700 italic pl-6">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-800 font-medium">{testimonial.therapy}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Join thousands of people who found the right therapist
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>Trusted by 15,000+ clients</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>•</span>
              <span>CQC Regulated Therapists</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>•</span>
              <span>100% Confidential</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyTestimonials;
