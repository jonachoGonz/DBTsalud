import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';

const TherapyHero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find the Right Therapist
            <span className="block text-blue-800">in London</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with qualified therapists and counsellors in London. 
            Get the support you need for your mental health journey.
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="What do you need help with?" 
                  className="pl-10 h-12"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="London area or postcode" 
                  className="pl-10 h-12"
                  defaultValue="London"
                />
              </div>
              <Button className="bg-blue-800 hover:bg-blue-900 text-white h-12 px-8">
                Search Therapists
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="text-gray-600">Popular searches:</span>
            <button className="text-blue-800 hover:text-blue-900 underline">Anxiety</button>
            <button className="text-blue-800 hover:text-blue-900 underline">Depression</button>
            <button className="text-blue-800 hover:text-blue-900 underline">Couples Therapy</button>
            <button className="text-blue-800 hover:text-blue-900 underline">CBT</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyHero;
