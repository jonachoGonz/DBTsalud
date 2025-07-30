const TherapySimpleFooter = () => {
  return (
    <footer className="bg-blue-500 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - CTA */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Real Connection
              <br />
              <span className="text-blue-200">Real Change</span>
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Start your journey to better mental health today.
            </p>
          </div>

          {/* Right side - Navigation dots and links */}
          <div className="text-right">
            <div className="flex justify-end space-x-2 mb-6">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
              <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
              <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
            </div>
            
            <div className="space-y-2">
              <div><a href="#" className="text-blue-100 hover:text-white">Privacy Policy</a></div>
              <div><a href="#" className="text-blue-100 hover:text-white">Terms of Service</a></div>
              <div><a href="#" className="text-blue-100 hover:text-white">Contact Us</a></div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-12 pt-8 text-center">
          <p className="text-blue-100">
            &copy; 2024 Therapy in London. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TherapySimpleFooter;
