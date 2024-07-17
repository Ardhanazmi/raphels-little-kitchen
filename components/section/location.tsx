import React from "react";

const LocationSection = () => {
  return (
    <div id="location" className="pt-28 pb-10 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-semibold">Lokasi Kami</h2>
        <p className="text-muted-foreground lg:w-[45%] mx-auto">
          Temukan lokasi kami pada map dibawah, area yang mudah dijangkau dan
          strategis. kami siap melayani kebutuhan Anda dengan produk kue
          terbaik.
        </p>
      </div>
      <iframe
        className="w-full h-[500px] rounded-md object-cover z-10"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d820.6496310311304!2d106.93006744077957!3d-6.306700195351228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6992bc954c94c1%3A0xe66d2ffe1d7c63f9!2sPondok%20Melati%20Indah!5e0!3m2!1sen!2sid!4v1720115961932!5m2!1sen!2sid"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default LocationSection;
