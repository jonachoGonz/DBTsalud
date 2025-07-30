import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const TherapyHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-800">TherapyIn.London</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#find-help" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium transition-colors">
              Find Help For..
            </a>
            <a href="#therapy-types" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium transition-colors">
              Types of Therapy
            </a>
            <a href="#articles" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium transition-colors">
              Articles by Therapists
            </a>
            <a href="#find-therapist" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium transition-colors">
              Find a Therapist
            </a>
            <a href="#therapist-signup" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium transition-colors">
              I'm a Therapist
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-blue-800 hover:bg-blue-900 text-white">
              Book Session
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#find-help" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-800">
                Find Help For..
              </a>
              <a href="#therapy-types" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-800">
                Types of Therapy
              </a>
              <a href="#articles" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-800">
                Articles by Therapists
              </a>
              <a href="#find-therapist" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-800">
                Find a Therapist
              </a>
              <a href="#therapist-signup" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-800">
                I'm a Therapist
              </a>
              <div className="px-3 py-2">
                <Button className="w-full bg-blue-800 hover:bg-blue-900 text-white">
                  Book Session
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TherapyHeader;
