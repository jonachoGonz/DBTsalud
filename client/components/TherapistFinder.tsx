import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Calendar, Check } from 'lucide-react';

const therapists = [
  {
    name: "Dr. Sarah Johnson",
    qualification: "Clinical Psychologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    rating: 4.9,
    reviews: 127,
    location: "Harley Street, W1",
    specialties: ["Anxiety", "Depression", "CBT"],
    price: "£120",
    availability: "Available today",
    verified: true
  },
  {
    name: "James Thompson",
    qualification: "Counselling Psychologist",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
    rating: 4.8,
    reviews: 89,
    location: "Canary Wharf, E14",
    specialties: ["Couples Therapy", "Relationships", "EFT"],
    price: "£100",
    availability: "Next week",
    verified: true
  },
  {
    name: "Dr. Maria Rodriguez",
    qualification: "Psychotherapist",
    image: "https://images.unsplash.com/photo-1594824863577-4cd0b6b4ab1b?w=300&h=300&fit=crop&crop=face",
    rating: 4.9,
    reviews: 203,
    location: "Camden, NW1",
    specialties: ["Trauma", "EMDR", "PTSD"],
    price: "£140",
    availability: "Available this week",
    verified: true
  }
];

const TherapistFinder = () => {
  return (
    <section id="find-therapist" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Therapists in London
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover qualified and experienced therapists ready to support your mental health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.map((therapist, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <img 
                    src={therapist.image} 
                    alt={therapist.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  {therapist.verified && (
                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{therapist.name}</h3>
                <p className="text-sm text-gray-600">{therapist.qualification}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{therapist.rating}</span>
                    <span className="text-sm text-gray-500">({therapist.reviews} reviews)</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{therapist.price}/session</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{therapist.location}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Calendar className="h-4 w-4" />
                  <span>{therapist.availability}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {therapist.specialties.map((specialty, specIndex) => (
                    <Badge key={specIndex} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-blue-800 hover:bg-blue-900 text-white">
                    Book Consultation
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-blue-800 hover:bg-blue-900 text-white">
            Browse All Therapists
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TherapistFinder;
