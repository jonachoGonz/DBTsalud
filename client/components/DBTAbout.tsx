import { ArrowRight } from "lucide-react";

export default function DBTAbout() {
  return (
    <section id="nosotros" className="bg-[rgb(253,251,245)]">
      <div className="px-[5%] pr-[5%]">
        <div className="ml-auto mr-auto max-w-[2838.26px] w-full">
          <div className="pb-[133.043px] pt-[133.043px]">
            <div>
              <div className="max-w-[1525.57px] w-full">
                <h2 className="cursor-default font-[ppeiko,arial,sans-serif] text-[81.6px] font-thin leading-[89.76px]">
                  Q Psychology aims to positively impact the mental health of
                  all individuals and communities.
                </h2>
              </div>
            </div>
            <div className="mt-[133.043px]">
              <div className="flex items-start justify-between relative">
                <div className="relative w-[48%]">
                  <div className="flex items-center bg-[rgb(46,76,71)] h-px justify-start mb-[35.4783px] text-left w-full">
                  </div>
                  <p className="text-[23.0609px] leading-[34.5913px]">
                    We are dedicated to creating a safe and inclusive
                    environment for all. We are leaders in LGBTQIAP+ affirming
                    and neuroaffirming mental health care.
                  </p>
                  <div className="mt-[35.4783px]">
                    <div className="flex items-center flex-wrap gap-[17.7391px]">
                      <a
                        href="https://www.qpsychology.com.au/about"
                        className="flex items-center bg-[rgb(203,237,224)] rounded-full cursor-pointer gap-[8.86957px] justify-start max-w-full overflow-hidden px-[26.6087px] py-[26.6087px] relative group"
                      >
                        <div className="cursor-pointer flex-shrink-0 relative z-[3]">
                          More about us
                        </div>
                        <div className="flex items-center flex-wrap gap-[17.7391px]">
                          <div className="flex items-center bg-[rgb(46,76,71)] rounded-full cursor-pointer h-[44.3478px] justify-center overflow-hidden w-[44.3478px]">
                            <img
                              loading="lazy"
                              width="auto"
                              alt="icon-arrow"
                              src="https://cdn.prod.website-files.com/6737210bb03e85ff33925ed4/67386972d746e88bae819ad7_Icon-arrow.svg"
                              className="cursor-pointer h-[13.3043px] max-w-full object-cover overflow-clip align-middle w-[13.3043px]"
                            />
                          </div>
                          <div className="flex items-center bg-[rgb(203,237,224)] rounded-full cursor-pointer h-[44.3478px] justify-center opacity-0 absolute w-[44.3478px] z-[3]">
                            <img
                              loading="lazy"
                              width="auto"
                              alt="arrow icon"
                              src="https://cdn.prod.website-files.com/6737210bb03e85ff33925ed4/67392474c8e327ef3c0fe859_Icon.svg"
                              className="cursor-pointer h-[13.3043px] max-w-full object-cover overflow-clip align-middle w-[13.3043px]"
                            />
                          </div>
                        </div>
                        <div className="bg-[rgb(46,76,71)] rounded-full bottom-0 cursor-pointer h-[140%] left-[-5%] ml-auto mr-auto mt-auto opacity-0 absolute right-0 top-0 w-[120%] z-[2]"></div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="relative w-[48%]">
                  {/* Contenido de la segunda columna puede ir aquí */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
