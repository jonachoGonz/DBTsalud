import { Button } from '@/components/ui/button';

const TherapistSignup = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Are you a
              <br />
              <span className="text-emerald-500">Therapist?</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Sign up for our therapist directory. 
              Share your Therapy in London profile is 
              one of the best ways to grow your mental 
              health practice with connection to
              therapist.
            </p>

            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-full">
              Sign up for free
            </Button>
          </div>

          {/* Right side - Illustration */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Chair illustration */}
              <div className="w-48 h-48 relative">
                {/* Chair back */}
                <div className="absolute top-8 left-12 right-12 h-24 bg-purple-300 rounded-t-2xl"></div>
                
                {/* Chair seat */}
                <div className="absolute bottom-16 left-8 right-8 h-16 bg-purple-400 rounded-lg"></div>
                
                {/* Chair arms */}
                <div className="absolute top-16 left-8 w-8 h-20 bg-purple-500 rounded-l-lg"></div>
                <div className="absolute top-16 right-8 w-8 h-20 bg-purple-500 rounded-r-lg"></div>
                
                {/* Chair legs */}
                <div className="absolute bottom-0 left-12 w-2 h-16 bg-purple-700"></div>
                <div className="absolute bottom-0 right-12 w-2 h-16 bg-purple-700"></div>
                <div className="absolute bottom-0 left-20 w-2 h-16 bg-purple-700"></div>
                <div className="absolute bottom-0 right-20 w-2 h-16 bg-purple-700"></div>
                
                {/* Side table */}
                <div className="absolute bottom-8 -right-8 w-12 h-12 bg-amber-200 rounded-lg"></div>
                <div className="absolute bottom-0 -right-6 w-2 h-8 bg-amber-400"></div>
                <div className="absolute bottom-0 -right-10 w-2 h-8 bg-amber-400"></div>
                <div className="absolute bottom-0 -right-14 w-2 h-8 bg-amber-400"></div>
                <div className="absolute bottom-0 -right-2 w-2 h-8 bg-amber-400"></div>
                
                {/* Plant pot on table */}
                <div className="absolute bottom-20 -right-6 w-4 h-6 bg-green-600 rounded-t-full"></div>
                <div className="absolute bottom-16 -right-7 w-6 h-4 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapistSignup;
