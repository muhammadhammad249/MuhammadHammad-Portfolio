import React from 'react';
// If you are using Lucide icons or FontAwesome, import them here. 
// Otherwise, I've used placeholder divs for your custom icons.

const ContactSection = () => {
  const contactData = [
    {
      title: "Contact Us",
      value: "+91 123 456 987",
      // Replace with your actual icon path
      icon: "/icons/phone-icon.png", 
      bgImage: "/images/bg-1.jpg"
    },
    {
      title: "E-Mail Us",
      value: "info@domainname.com",
      icon: "/icons/email-icon.png",
      bgImage: "/images/bg-2.jpg"
    },
    {
      title: "Location",
      value: "1058 Meadowbrook, CA 95050",
      icon: "/icons/location-icon.png",
      bgImage: "/images/bg-3.jpg"
    }
  ];

  return (
    <section className="py-12 bg-[#FDFBF2]"> {/* Matches the off-white background */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactData.map((item, index) => (
          <div 
            key={index}
            className="relative h-[220px] rounded-2xl overflow-hidden bg-[#1A3019] flex items-end p-8"
            style={{
              // If you want the background image overlay as seen in the mockup:
              backgroundImage: `linear-gradient(rgba(26, 48, 25, 0.8), rgba(26, 48, 25, 0.9)), url(${item.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Dark Overlay/Placeholder Text Effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <span className="text-[#2A4229] text-6xl font-bold opacity-40 select-none">
                 414 × 220
               </span>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex items-center space-x-4">
              {/* Icon Circle */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C89434] flex items-center justify-center">
                {/* Replace with <img src={item.icon} /> or your Icon Component */}
                <div className="w-6 h-6 bg-white/20 rounded-sm" /> 
              </div>

              {/* Text Info */}
              <div className="text-white">
                <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
                <p className="text-sm font-medium opacity-90">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;