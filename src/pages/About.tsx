import { Award, Users, Globe } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="About Glared"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Glared</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Crafting luxury clothing that defines elegance and sophistication for the modern individual.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Founded with a vision to redefine luxury fashion, Glared emerged from a passion for creating clothing 
                that transcends trends and embodies timeless elegance. Our journey began with a simple belief: that 
                exceptional clothing should not just look beautiful, but should make the wearer feel extraordinary.
              </p>
              <p>
                Every piece in our collection is a testament to our commitment to excellence. We work with master 
                craftsmen who share our dedication to perfection, using only the finest materials sourced from around 
                the world. From the initial design concept to the final stitch, every detail is meticulously planned 
                and executed.
              </p>
              <p>
                At Glared, we believe that luxury is not just about exclusivity—it's about the emotional connection 
                between the wearer and their clothing. It's about confidence, self-expression, and the joy of wearing 
                something truly special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Excellence</h3>
              <p className="text-gray-600">
                We pursue perfection in every detail, from design conception to final delivery, ensuring each piece 
                meets our highest standards of quality and craftsmanship.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Customer First</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We listen, understand, and create clothing that 
                not only meets but exceeds expectations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to responsible fashion, working with ethical suppliers and sustainable materials 
                to minimize our environmental impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
