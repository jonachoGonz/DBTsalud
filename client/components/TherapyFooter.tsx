import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const TherapyFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">TherapyIn.London</h3>
            <p className="text-gray-300">
              Connecting you with qualified therapists and mental health professionals across London.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Clients */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Clients</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Find a Therapist</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Types of Therapy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Insurance Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Client Reviews</a></li>
            </ul>
          </div>

          {/* For Therapists */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Therapists</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Join Our Network</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Therapist Login</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Training</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mental Health Articles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Self-Help Tools</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Crisis Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Professional Standards</a>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-400">
              <p>&copy; 2024 TherapyIn.London. All rights reserved.</p>
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            <p>
              This website is for informational purposes only. It is not a substitute for professional medical advice, 
              diagnosis or treatment. Always seek the advice of your physician or other qualified health provider 
              with any questions you may have regarding a medical condition.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TherapyFooter;
