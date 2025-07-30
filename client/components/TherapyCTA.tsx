import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MessageCircle, Clock, Shield, Heart } from 'lucide-react';

const TherapyCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Take the first step towards better mental health. 
            Find qualified therapists in London who can support you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Benefits */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Verified Professionals</h3>
                <p className="text-blue-100">All therapists are qualified, registered, and background-checked.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Flexible Scheduling</h3>
                <p className="text-blue-100">Book sessions that fit your schedule, including evenings and weekends.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Personalized Matching</h3>
                <p className="text-blue-100">We help match you with therapists who specialize in your specific needs.</p>
              </div>
            </div>

            <div className="pt-6">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100">
                Find Your Therapist Now
              </Button>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <Card className="bg-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Get Started Today
              </h3>
              
              <form className="space-y-4">
                <div>
                  <Input 
                    placeholder="Your Name" 
                    className="h-12"
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email Address" 
                    className="h-12"
                  />
                </div>
                <div>
                  <Input 
                    placeholder="Phone Number" 
                    className="h-12"
                  />
                </div>
                <div>
                  <Input 
                    placeholder="What would you like help with?" 
                    className="h-12"
                  />
                </div>
                <Button className="w-full h-12 bg-blue-800 hover:bg-blue-900 text-white">
                  Request a Call Back
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t">
                <p className="text-center text-gray-600 mb-4">Or contact us directly:</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-gray-700">
                    <Phone className="h-4 w-4" />
                    <span>020 7123 4567</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-700">
                    <Mail className="h-4 w-4" />
                    <span>hello@therapyin.london</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-700">
                    <MessageCircle className="h-4 w-4" />
                    <span>Live Chat Available 9AM-6PM</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Mental Health Tips & Resources
          </h3>
          <p className="text-blue-100 mb-6">
            Subscribe to receive helpful articles and updates from mental health professionals.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="h-12 bg-white"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyCTA;
