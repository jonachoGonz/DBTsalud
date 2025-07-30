import { Button } from '@/components/ui/button';

const articles = [
  {
    id: 1,
    author: "Hanna Bohrisch",
    title: "Is it possible to stop acting childish?",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=305&h=390&fit=crop&crop=face",
    href: "#"
  },
  {
    id: 2,
    author: "Ronja Damian",
    title: "Relationships and Bad Choices: The Effects and Aftereffects",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=305&h=390&fit=crop&crop=face",
    href: "#"
  },
  {
    id: 3,
    author: "Sara Allahverdi",
    title: "Toxic relationships: How easy is it to leave them?",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=305&h=390&fit=crop&crop=face",
    href: "#"
  },
  {
    id: 4,
    author: "Philip Karahassan",
    title: "Why should we be talking about Bigorexia / Muscle Disphora?",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=305&h=390&fit=crop&crop=face",
    href: "#"
  },
  {
    id: 5,
    author: "Ronja Damian",
    title: "Severance and Grief",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=305&h=390&fit=crop&crop=face",
    href: "#"
  }
];

const TherapyArticles = () => {
  return (
    <section className="bg-gray-100">
      <div className="flex max-w-7xl w-full mx-auto">
        <div className="flex gap-12 relative w-full">
          {/* Sticky Left Sidebar */}
          <div className="self-start sticky top-24 w-2/5">
            <div>
              <h2 className="text-6xl font-bold text-gray-900 mb-12 leading-tight tracking-tight">
                <span>Latest Articles </span>
                <br />
                <span> by Our Therapists</span>
              </h2>
            </div>

            <div className="mb-8">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-5 py-3">
                See all Articles
              </Button>
            </div>

            {/* SVG Illustration */}
            <div className="h-96 w-96">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 237 339"
                width="237"
                height="339"
                className="w-full h-full"
              >
                {/* Orange paint splashes */}
                <g fill="#f6612e">
                  <path d="M57.034,140.674c1.784,0.751 2.044,3.241 -1.504,6.567c-5.67,0.9 -5.704,5.183 -5.538,4.522c0.769,3.105 1.575,6.202 2.411,9.287c0.343,1.264 1.035,2.261 2.485,2.389c1.508,0.131 2.529,-0.515 3.287,-1.865c1.163,-1.067 2.049,-3.194 1.772,-0.836c-0.177,1.468 -0.464,2.922 -0.758,4.718z"/>
                  <path d="M48.129,46.027c-3.391,2.465 -7.078,4.361 -10.898,6.051c-1.065,0.471 -2.726,1.208 -3.705,0.138c-0.883,-0.962 -0.301,-2.655 -0.225,-3.801c0.021,-0.318 0.124,-0.574 0.277,-0.778c-0.011,-0.436 0.193,-0.863 0.712,-1.13c2.457,-1.263 4.827,-2.686 7.194,-4.015c1.74,-0.86 3.964,-2.638 5.964,-2.84c0.474,-0.052 0.892,0.035 1.256,0.208c0.097,-0.023 0.194,-0.054 0.291,-0.072c0.242,-0.055 0.713,0.242 0.806,0.484c0.066,0.163 0.059,0.44 0.002,0.661c0.236,0.43 0.382,0.932 0.412,1.462c0.097,1.62 -0.903,2.835 -2.135,3.732z"/>
                  <path d="M92.123,32.787c-0.059,-2.354 -0.347,-4.701 -0.551,-7.051c-0.505,-5.805 -0.785,-11.644 -2.716,-17.224c-0.118,-0.35 -0.132,-0.734 -0.218,-1.094c-1.315,-5.546 -2.727,-11.067 -4.651,-16.436c-0.45,-1.26 -1.055,-2.461 -1.591,-3.689c-0.727,1.001 -1.008,1.977 -1.041,2.921c-0.532,-2.687 -1.141,-5.359 -1.425,-8.091c-0.194,-1.873 -2.322,-2.406 -3.37,-1.444c-0.222,-0.01 -0.461,0.024 -0.717,0.103c-5.232,1.655 -10.53,5.078 -14.302,9.114c-1.796,1.918 -3.227,4.158 -4.598,6.401c-1.249,2.053 -3.149,4.227 -3.882,6.532c-0.353,1.122 -0.199,2.26 0.165,3.361c-0.45,0.315 -0.768,0.831 -0.768,1.554c0.011,4.293 0.419,7.582 3.132,11.051c1.215,1.551 2.63,2.918 3.896,4.42c1.345,1.596 2.318,3.469 3.536,5.165c4.072,5.681 9.406,9.63 15.41,13.04c2.242,1.271 5.398,3.084 8.031,2.025c2.218,-0.894 2.636,-3.233 2.484,-5.424z"/>
                </g>

                {/* Blue base/platform */}
                <g fill="#3881f1">
                  <path d="M54.695,179.855l62.048,11.46c0,0 1.917,8.49 52.287,5.946s70.544,-6.378 65.077,-9.161s-19.546,-7.304 -56.764,-7.989s-73.438,12.533 -62.648,10.744z"/>
                  <ellipse cx="58.106" cy="209.764" rx="115.211" ry="19.909"/>
                </g>

                {/* Artist figure */}
                <g fill="#2a2a2a">
                  <path d="M48.24,177.85l69.975,78.435c69.465,61.495 69.455,61.505 69.105,57.735s-0.575,-3.995 -0.215,-7.765c0.566,-7.565 0.915,-15.144 1.405,-22.705c0.54,-8.305 0.835,-16.625 1.405,-24.955c0.824,-12.4 1.185,-24.855 2.115,-37.235c0.54,-7.245 1.445,-14.455 1.855,-21.715c0.93,-16.52 1.685,-33.04 2.615,-49.56c0.68,-12.08 1.385,-24.16 1.485,-36.28c0.02,-2.41 0.06,-4.82 0.24,-7.2c0.44,-5.69 0.44,-11.38 0.58,-17.06c0.08,-3.24 -0.52,-5.82 -2.54,-7.43c-2.05,-1.63 -4.27,-2.12 -6.67,-1.32s-4.93,2.93 -7.45,4.98c-3.8,3.09 -7.54,6.38 -11.27,9.68c-4.37,3.87 -8.6,7.88 -13.09,11.59c-5.53,4.58 -11.19,8.98 -16.59,13.74c-4.62,4.08 -8.99,8.41 -13.64,12.42c-6.18,5.33 -12.63,10.38 -18.73,15.8c-2.12,1.88 -4.24,3.76 -6.55,5.47c-3.97,2.93 -8.09,5.67 -11.76,8.95c-1.43,1.28 -2.5,2.89 -4.12,3.9c-1.54,0.96 -3.38,0.8 -4.58,-0.73c-1.38,-1.76 -0.8,-4.45 -0.72,-6.6c0.02,-0.58 0.14,-1.06 0.37,-1.42c0.01,-0.29 0.19,-0.56 0.51,-0.72c1.45,-0.73 2.95,-1.38 4.37,-2.15c2.44,-1.32 4.81,-2.74 7.23,-4.08c0.77,-0.43 1.54,-0.86 2.31,-1.27c0.32,-0.11 0.64,-0.21 0.96,-0.31c0.68,-0.16 1.37,-0.31 2.07,-0.45c0.32,-0.04 0.65,-0.08 0.98,-0.12h0.01c0.01,0.28 0.02,0.54 0.02,0.82v0.01c0.02,0.53 0.04,1.03 0.07,1.53c0.01,0.25 0.02,0.5 0.03,0.74c0.03,0.73 0.06,1.43 0.1,2.13c0.01,0.24 0.02,0.48 0.03,0.72c-2.5,1.36 -5.32,1.49 -8.15,1.12c-0.51,-0.08 -1.02,-0.15 -1.53,-0.20c-1.03,-0.15 -2.05,-0.17 -3.08,-0.03c-0.52,0.08 -1.05,0.20 -1.58,0.36c-0.26,0.08 -0.52,0.15 -0.77,0.21c-1.04,0.16 -2.14,0.01 -3.32,-0.75c0.01,-0.05 0.01,-0.09 0.02,-0.14c0,-0.93 0.16,-1.85 0.51,-2.74c0.12,-0.31 0.25,-0.61 0.39,-0.90c0.14,-0.3 0.29,-0.59 0.45,-0.88c0.18,-0.31 0.37,-0.61 0.57,-0.90c0.45,-0.66 0.94,-1.27 1.47,-1.83c0.05,-0.06 0.11,-0.11 0.16,-0.17c0.01,0 0.01,0 0.02,-0.01c0.66,-0.69 1.36,-1.33 2.09,-1.92c0.72,-0.58 1.48,-1.12 2.26,-1.61c0.01,0 0.01,0 0.02,-0.01c0.78,-0.49 1.58,-0.94 2.40,-1.35c0.82,-0.41 1.66,-0.79 2.51,-1.14c0.01,0 0.01,0 0.02,-0.01c0.85,-0.35 1.71,-0.67 2.58,-0.96c0.87,-0.29 1.75,-0.55 2.64,-0.78c0.01,0 0.01,0 0.02,-0.01c0.89,-0.23 1.79,-0.43 2.70,-0.60c0.91,-0.17 1.83,-0.32 2.75,-0.44c0.01,0 0.01,0 0.02,-0.01c0.92,-0.12 1.85,-0.21 2.78,-0.27c0.93,-0.06 1.87,-0.10 2.81,-0.11h0.40c-0.49,0.26 -1.10,0.26 -1.60,0.26s-1.01,0 -1.51,-0.01c-2.45,0 -4.90,-0.02 -7.35,-0.21c-0.98,-0.08 -1.96,-0.17 -2.94,-0.35c-1.11,-0.20 -2.17,-0.52 -3.16,-1.12c-0.34,-0.20 -0.67,-0.44 -0.99,-0.73c-0.15,-0.13 -0.29,-0.28 -0.42,-0.44c-0.13,-0.16 -0.25,-0.33 -0.36,-0.51c1.22,-1.10 3.12,-1.22 4.78,-1.90c1.70,-0.69 3.43,-1.30 5.50,-2.07c0.77,-0.27 1.49,-0.62 2.18,-1.02c0.07,-0.03 0.13,-0.07 0.20,-0.10c0.56,-0.29 1.12,-0.61 1.67,-0.97c0.27,-0.18 0.54,-0.37 0.80,-0.57c0.26,-0.20 0.52,-0.41 0.77,-0.63h0.01c0,-0.04 0,-0.08 0,-0.11c0,-0.05 0,-0.09 0,-0.14c0.01,-0.86 0.05,-1.71 0.09,-2.57c0.02,-0.43 0.04,-0.86 0.06,-1.28c0.01,-0.22 0.02,-0.43 0.03,-0.65c0.04,-0.68 0.07,-1.35 0.11,-2.03c0.01,-0.24 0.02,-0.48 0.03,-0.72c-2.34,1.36 -5.16,1.49 -8.01,1.12c-0.51,-0.08 -1.02,-0.15 -1.53,-0.20c-1.03,-0.15 -2.05,-0.17 -3.08,-0.03c-0.52,0.08 -1.05,0.20 -1.58,0.36c-0.26,0.08 -0.52,0.15 -0.77,0.21c-1.04,0.16 -2.14,0.01 -3.32,-0.75c0.01,-0.05 0.01,-0.09 0.02,-0.14c0,-0.93 0.16,-1.85 0.51,-2.74c0.12,-0.31 0.25,-0.61 0.39,-0.90c0.14,-0.3 0.29,-0.59 0.45,-0.88c0.18,-0.31 0.37,-0.61 0.57,-0.90c0.45,-0.66 0.94,-1.27 1.47,-1.83c0.05,-0.06 0.11,-0.11 0.16,-0.17c0.01,0 0.01,0 0.02,-0.01c0.66,-0.69 1.36,-1.33 2.09,-1.92c0.72,-0.58 1.48,-1.12 2.26,-1.61c0.01,0 0.01,0 0.02,-0.01c0.78,-0.49 1.58,-0.94 2.40,-1.35c0.82,-0.41 1.66,-0.79 2.51,-1.14c0.01,0 0.01,0 0.02,-0.01c0.85,-0.35 1.71,-0.67 2.58,-0.96c0.87,-0.29 1.75,-0.55 2.64,-0.78c0.01,0 0.01,0 0.02,-0.01c0.89,-0.23 1.79,-0.43 2.70,-0.60c0.91,-0.17 1.83,-0.32 2.75,-0.44c0.01,0 0.01,0 0.02,-0.01c0.92,-0.12 1.85,-0.21 2.78,-0.27c0.93,-0.06 1.87,-0.10 2.81,-0.11h0.40z"/>
                </g>
              </svg>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="mt-48 w-3/5">
            <div className="flex gap-10 max-w-4xl w-full">
              {/* Left Column */}
              <div className="flex flex-col gap-5 w-full">
                {[articles[0], articles[1]].map((article) => (
                  <div key={article.id} className="mb-8 w-full">
                    <a href={article.href} className="cursor-pointer inline-block font-light relative w-full">
                      <div className="cursor-pointer font-light overflow-hidden relative w-full">
                        <img
                          src={article.image}
                          alt={article.author}
                          className="w-full h-96 object-cover"
                          style={{
                            clipPath: "polygon(10% 0%, 90% 0%, 100% 90%, 10% 100%, 0% 10%)"
                          }}
                        />
                      </div>
                    </a>
                    <div className="flex flex-col items-start cursor-pointer font-light justify-start">
                      <a href={article.href} className="cursor-pointer inline-block font-light relative w-full">
                        <h3 className="text-4xl font-normal text-gray-900 leading-tight tracking-tight mb-1 pl-5 pr-5 z-2">
                          {article.title}
                        </h3>
                      </a>
                      <p className="cursor-pointer font-light mb-4 mt-0 pl-5 pr-5">
                        <a href="#" className="cursor-pointer inline-block font-light relative w-full">
                          {article.author}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-5 -mt-48 w-full">
                {[articles[2], articles[3], articles[4]].map((article) => (
                  <div key={article.id} className="mb-8 w-full">
                    <a href={article.href} className="cursor-pointer inline-block font-light relative w-full">
                      <div className="cursor-pointer font-light overflow-hidden relative w-full">
                        <img
                          src={article.image}
                          alt={article.author}
                          className="w-full h-96 object-cover"
                          style={{
                            clipPath: "polygon(10% 0%, 90% 0%, 100% 90%, 10% 100%, 0% 10%)"
                          }}
                        />
                      </div>
                    </a>
                    <div className="flex flex-col items-start cursor-pointer font-light justify-start">
                      <a href={article.href} className="cursor-pointer inline-block font-light relative w-full">
                        <h3 className="text-4xl font-normal text-gray-900 leading-tight tracking-tight mb-1 pl-5 pr-5 z-2">
                          {article.title}
                        </h3>
                      </a>
                      <p className="cursor-pointer font-light mb-4 mt-0 pl-5 pr-5">
                        <a href="#" className="cursor-pointer inline-block font-light relative w-full">
                          {article.author}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyArticles;
