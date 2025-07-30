import { Button } from '@/components/ui/button';

const TherapyHeader = () => {
  return (
    <header className="bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-gray-900">Therapy</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#articles" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Articles
            </a>
            <a href="#find-therapist" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Find Therapist
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              How it works
            </a>
            <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
              For Therapists
            </Button>
          </nav>

          {/* Mobile - simplified */}
          <div className="md:hidden">
            <Button variant="outline" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TherapyHeader;
