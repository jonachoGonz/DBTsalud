const companies = [
  { name: "BBC", color: "bg-black" },
  { name: "Guardian", color: "bg-red-500" },
  { name: "Financial Times", color: "bg-pink-400" },
  { name: "Medium", color: "bg-green-500" },
  { name: "iD", color: "bg-blue-600" }
];

const TherapyFeatured = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Featured In</h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-12 h-12 ${company.color} rounded flex items-center justify-center mr-3`}>
                  <span className="text-white font-bold text-sm">
                    {company.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-700 font-medium text-lg">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyFeatured;
