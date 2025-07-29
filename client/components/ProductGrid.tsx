export default function ProductGrid() {
  const products = [
    {
      id: 1,
      title: "Stay your best self, always",
      category: "Wellbeing",
      image: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/6748577ad24e2f2050ddaf30_man.webp",
      alt: "man in white t-shirt looking forward",
      link: "/product/essential",
      gradient: {
        from: "#FF9A2B",
        via: "#FFDFCF", 
        to: "#FFAD37"
      }
    },
    {
      id: 2,
      title: "Optimize your fertility, cycle and menopause naturally",
      category: "Women's health",
      image: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/673c1a67dd8dc2f34eb35582_Portrait%20of%20Black%20Woman%203.webp",
      alt: "Portrait of Black Woman",
      link: "/product/kini",
      gradient: {
        from: "#FF97E7",
        via: "#FFDDFE",
        to: "#FF66B9"
      }
    },
    {
      id: 3,
      title: "Fuel your cells for a supercharged life",
      category: "Longevity",
      image: "https://cdn.prod.website-files.com/671898ae57fbee5bf1da9fba/671b4edb7e08b9f23ffd16d8_Smiling%20Woman%20Purple%20Glasses%201.webp",
      alt: "old woman is smiling",
      link: "/product/kini-essential-bundle",
      gradient: {
        from: "#FF783F",
        via: "#FF8A35",
        to: "#FF3232"
      }
    }
  ];

  return (
    <div className="bg-[rgb(252,248,241)] px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 mb-16 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[rgb(252,248,241)] rounded-[40px] shadow-[rgba(197,16,16,0.03)_0px_4px_44px_10px] flex flex-col overflow-hidden relative group transition-all duration-800 hover:scale-105"
          >
            {/* Product Link Overlay */}
            <a
              href={product.link}
              className="absolute inset-0 z-10 cursor-pointer"
              aria-label={`View ${product.category} product`}
            />

            {/* Image Container */}
            <div className="relative rounded-[40px] overflow-hidden">
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-64 lg:h-72 object-cover"
                loading="lazy"
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(252,248,241,0.7)] via-transparent to-transparent rounded-[32px]" />
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-1 justify-between gap-8 p-6 lg:p-8">
              {/* Title */}
              <div className="max-w-[224px]">
                <p className="text-[rgba(0,0,0,0.5)] text-base leading-[22.4px]">
                  {product.title}
                </p>
              </div>

              {/* Category Badge */}
              <div className="relative flex items-center h-[59px] bg-[rgb(252,248,241)] border border-[rgba(194,189,181,0.5)] rounded-[30px] pl-12 overflow-hidden transition-all duration-600 hover:border-[rgba(194,189,181,0.8)]">
                {/* Gradient Circle */}
                <div 
                  className="absolute left-4 w-5 h-5 rounded-full z-10 transition-all duration-600"
                  style={{
                    background: `radial-gradient(circle, ${product.gradient.from} 0%, ${product.gradient.via} 60%, ${product.gradient.to} 100%)`
                  }}
                />
                
                {/* Category Text */}
                <span 
                  className="relative z-20 font-medium text-[16.5px] leading-[21.45px]"
                  style={{ fontFamily: '"saans trial", sans-serif' }}
                >
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
