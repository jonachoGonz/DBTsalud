import { Card, CardContent } from '@/components/ui/card';

const articles = [
  {
    id: 1,
    author: "Dr. Sarah Mitchell",
    title: "Toxic relationships: why do we fall for them?",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    excerpt: "Understanding the psychology behind toxic relationship patterns and how to break free."
  },
  {
    id: 2,
    author: "James Thompson",
    title: "Is it possible to truly 'accept' anxiety?",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    excerpt: "Exploring acceptance-based approaches to managing anxiety and finding peace."
  },
  {
    id: 3,
    author: "Dr. Maria Rodriguez",
    title: "Why should we be kind to ourselves?",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
    excerpt: "The importance of self-compassion in mental health and personal growth."
  },
  {
    id: 4,
    author: "David Chen",
    title: "Behavioural and Evidence-Based CBT: The Evidence and Afterthoughts",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    excerpt: "A deep dive into cognitive behavioral therapy techniques and their effectiveness."
  },
  {
    id: 5,
    author: "Dr. Emily Watson",
    title: "Several tips and Grief",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    excerpt: "Practical strategies for navigating grief and loss in healthy ways."
  }
];

const TherapyArticles = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start mb-12">
          {/* Section Title with Illustration */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest Articles
              <br />
              <span className="text-gray-700">by Our Therapists</span>
            </h2>
            
            {/* Simple easel illustration */}
            <div className="mt-8">
              <div className="relative w-24 h-32">
                {/* Easel legs */}
                <div className="absolute bottom-0 left-0 w-1 h-24 bg-amber-600 transform -rotate-12"></div>
                <div className="absolute bottom-0 right-0 w-1 h-24 bg-amber-600 transform rotate-12"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-amber-600"></div>
                
                {/* Canvas */}
                <div className="absolute top-0 left-2 right-2 h-20 bg-white border-2 border-amber-700 rounded-sm shadow-sm"></div>
                
                {/* Brush */}
                <div className="absolute top-4 right-0 w-8 h-1 bg-orange-400 transform rotate-45"></div>
                <div className="absolute top-3 right-1 w-2 h-3 bg-gray-600 transform rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="flex-1 ml-8">
            <div className="space-y-6">
              {articles.map((article, index) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={article.image} 
                        alt={article.author}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-tight">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          by {article.author}
                        </p>
                        <p className="text-gray-700 text-sm">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyArticles;
