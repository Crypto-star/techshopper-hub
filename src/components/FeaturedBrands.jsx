import React from 'react';

const brands = [
  "Arduino", "Raspberry Pi", "Adafruit", "SparkFun", "Seeed Studio",
  "Pololu", "DFRobot", "MakerBot", "Parallax", "BeagleBoard"
];

const FeaturedBrands = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Featured Brands</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {brands.map((brand, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <img src={`/placeholder.svg`} alt={brand} className="h-12 w-auto" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBrands;