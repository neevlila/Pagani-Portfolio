import React from 'react';

const Error404 = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 font-sans text-white overflow-hidden relative">
      {/* Background Decorative Element: Subtle Carbon Texture or Radial Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* The Error Code */}
        <h1 className="text-[12rem] md:text-[18rem] font-black tracking-tighter leading-none opacity-10 italic">
          404
        </h1>

        <div className="-mt-20 md:-mt-32">
          <h2 className="text-2xl md:text-4xl font-light uppercase tracking-[0.3em] mb-4">
            You've Gone <span className="text-amber-500 font-medium">Off-Track</span>
          </h2>
          
          <p className="text-zinc-500 max-w-md mx-auto mb-10 leading-relaxed font-light">
            The road you are looking for has been bypassed. Even a Zonda R can't find this coordinate in our garage.
          </p>

          {/* Action Button */}
          <a 
            href="/" 
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium transition-all bg-zinc-900 border border-zinc-800 rounded-sm hover:bg-zinc-800"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-amber-500 rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center gap-2 uppercase tracking-widest text-xs">
              Return to Starting Line
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 transition-transform group-hover:translate-x-1" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
        <div className="h-[1px] w-20 bg-zinc-700 mb-4"></div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-400">Pagani Automobili</p>
      </div>
    </div>
  );
};

export default Error404;
