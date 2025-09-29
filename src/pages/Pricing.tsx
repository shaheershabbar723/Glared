import { Check, Star, AlertCircle, X, Info } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useState } from 'react';

// Updated pricing tiers with new information
const pricingTiers = [
  {
    name: 'Essential',
    price: '$30',
    period: 'month',
    description: 'Basic AI fashion photography — perfect for getting started.',
    features: [
      'Delivery cadence: 1 on-model image every 2 days (~15 images / month)',
      'Basic AI fashion photography',
      'Standard model selection',
      'No revisions (per image)',
      'Single Product',
      '24-hour turnaround per image',
      'High-resolution web JPGs'
    ],
    popular: false
  },
  {
    name: 'Signature',
    price: '$100',
    period: 'month',
    description: 'Professional AI fashion photography with advanced styling.',
    features: [
      'Delivery cadence: 2 on-model images per day (~60 images / month)',
      'Professional AI photography',
      'Premium model selection',
      'Advanced styling options (poses, lighting, backgrounds)',
      'Up to 1 revision per image',
      'Multiple products',
      '24-hour turnaround per image request',
      'High-resolution web JPGs',
      'Priority support'
    ],
    popular: true
  },
  {
    name: 'Couture',
    price: '$300',
    period: 'month',
    description: 'Premium AI fashion photography: bespoke styling, fastest delivery, dedicated support.',
    features: [
      'Delivery cadence: 5 on-model images per day (or scheduled bulk)',
      'Bespoke AI photography & custom model creation',
      'Unlimited styling options',
      'Up to 2 revisions per image',
      '12-hour delivery SLA per image request',
      'Ultra high-resolution images + custom backgrounds & settings',
      'Dedicated account manager / support'
    ],
    popular: false
  }
];

// Updated picture packages
const picturePackages = [
  {
    service: '5 Pictures',
    price: '$10.00',
    description: 'Entry package for testing a single product.',
    features: [
      '1 product only',
      '5 high-resolution images (web-ready JPGs)',
      'Delivery: 24–48 hours',
      'Basic AI styling (simple studio / lifestyle looks)',
      '0 revisions per image'
    ]
  },
  {
    service: '10 Pictures',
    price: '$20.00',
    description: 'Great for small product lines with more styling options.',
    features: [
      'Up to 4 products',
      '10 high-resolution images (web-ready JPGs)',
      'Delivery: 24–48 hours',
      'Advanced AI styling (poses, lighting, backgrounds)',
      '1 revision per image'
    ],
    popular: true
  },
  {
    service: '20 Pictures',
    price: '$40.00',
    description: 'Best for full collections or campaign drops.',
    features: [
      'Up to 10 products',
      '20 high-resolution images (web-ready JPGs)',
      'Delivery: 24–48 hours',
      'Premium AI styling (customized poses, premium backgrounds)',
      '1 revision per image'
    ]
  }
];

export function Pricing() {
  const [error, setError] = useState<string | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<{service: string} | null>(null);

  const handleGetStarted = (plan: {name: string, price: string}) => {
    setSelectedPlan(plan);
  };

  const handlePackageGetStarted = (pkg: {service: string}) => {
    setSelectedPackage(pkg);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Payment Error:</strong> {error}
              </p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-sm text-red-600 underline hover:text-red-800"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Starter Pack Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Starter Pack
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Send one product photo → get four unique on-model images in 48 hours
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Free Demo
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-4">Starter Pack</h2>
                  <p className="text-gray-600 mt-2">
                    Experience our AI fashion photography with a free sample
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">What you get</p>
                      <p className="text-gray-600 text-sm">4 unique on-model images generated from a single photo (studio + lifestyle)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Web-optimized JPGs</p>
                      <p className="text-gray-600 text-sm">Ready for e-commerce with color correction, realistic shadows, and clipping path</p>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium"
                  onClick={() => setShowDemoModal(true)}
                >
                  Request Free Demo
                </Button>
              </div>
              
              <div className="md:w-1/2 bg-gray-50 p-8 md:p-12 border-t border-gray-100 md:border-t-0 md:border-l">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">How to request</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                      1
                    </div>
                    <p className="text-gray-700">
                      Send one high-quality product photo (flat / mannequin / ghost) via WhatsApp to:
                    </p>
                  </div>
                  
                  <div className="pl-9 space-y-2">
                    <div className="font-medium text-gray-900">US: +1 (216) 244-92625</div>
                    <div className="font-medium text-gray-900">PK: +92 320 8399055</div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                      2
                    </div>
                    <p className="text-gray-700">
                      In the same message include short style notes (e.g., "neutral studio, natural light") and one example link
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                      3
                    </div>
                    <p className="text-gray-700">
                      We'll confirm receipt and deliver your 4 images within 48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Request Free Demo</h3>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Send your product photo via WhatsApp to one of our numbers:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">US Office</span>
                  <span className="font-mono">+1 (216) 244-92625</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Pakistan Office</span>
                  <span className="font-mono">+92 320 8399055</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              Don't forget to include your style notes and example link in the same message!
            </p>
            
            <Button
              onClick={() => setShowDemoModal(false)}
              className="w-full"
            >
              Got it
            </Button>
          </div>
        </div>
      )}

      {/* Plan Info Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-yellow-500" />
              How to start (WhatsApp)
            </h3>
            
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-medium text-gray-900">
                  {selectedPlan.name} | Product name{selectedPlan.name !== 'Essential' ? 's' : ''} | "Send photo{selectedPlan.name !== 'Essential' ? 's' : ''}"
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">US:</span>
                  <span className="font-mono">+1 (216) 244-92625</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">PK:</span>
                  <span className="font-mono">+92 320 8399055</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Our team will get back to you within 24 hours.
            </p>
            
            <Button
              onClick={() => setSelectedPlan(null)}
              className="w-full"
            >
              Got it
            </Button>
          </div>
        </div>
      )}

      {/* Package Info Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-yellow-500" />
              How to start (WhatsApp)
            </h3>
            
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-medium text-gray-900">
                  {selectedPackage.service === 'CUSTOM' 
                    ? 'CUSTOM | [Your request]' 
                    : `${selectedPackage.service} | [Product name] | Send photo`}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">US:</span>
                  <span className="font-mono">+1 (216) 244-92625</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">PK:</span>
                  <span className="font-mono">+92 320 8399055</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Our team will get back to you within 24 hours.
            </p>
            
            <Button
              onClick={() => setSelectedPackage(null)}
              className="w-full"
            >
              Got it
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Fashion Photography Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional AI-generated fashion photography with transparent pricing. 
            Choose the package that best fits your creative needs and budget.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Subscription Plans
            </h2>
            <p className="text-xl text-gray-600">
              Ongoing access to professional AI fashion photography
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border-2 p-8 ${
                  tier.popular
                    ? 'border-yellow-500 ring-2 ring-yellow-500 ring-opacity-50'
                    : 'border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-600 ml-1">/{tier.period}</span>
                  </div>
                  <p className="text-gray-600">{tier.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.popular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => handleGetStarted({name: tier.name, price: tier.price})}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Package Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Custom Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Tailored to your specific needs
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-gray-200">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Custom
              </h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">Flexible Pricing</div>
              <p className="text-gray-600 mb-6">
                Need something tailored to your needs? We've got you covered.
                Just message us on WhatsApp with your requirements (number of products, image styles, delivery speed, revisions, etc.), and we'll create a custom package for you.
              </p>
              <Button
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => {
                  // Set a special value to indicate this is the custom package
                  setSelectedPackage({service: 'CUSTOM'});
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Picture Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              One-Time Picture Packages
            </h2>
            <p className="text-xl text-gray-600">
              Perfect for specific photo needs and smaller projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {picturePackages.map((pkg) => (
              <div 
                key={pkg.service} 
                className={`bg-white rounded-lg p-6 shadow-sm border-2 relative ${
                  pkg.popular ? 'border-yellow-500 ring-2 ring-yellow-500 ring-opacity-50' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {pkg.service}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{pkg.price}</div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={pkg.popular ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => handlePackageGetStarted({service: pkg.service})}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and services
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's included in each package?
              </h3>
              <p className="text-gray-600">
                All packages include professional AI-generated fashion photography, high-resolution images, 
                and our quality guarantee. Higher tiers include additional revisions, faster delivery, and premium features.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does delivery take?
              </h3>
              <p className="text-gray-600">
                One-time picture packages are delivered within 24-48 hours. 
                Subscription packages provide ongoing access with varying delivery times: 
                Essential (48 hours), Signature (24 hours), and Couture (12 hours).
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, and digital wallets through our secure 
                Stripe payment processing. All transactions are encrypted and secure.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is your satisfaction guarantee?
              </h3>
              <p className="text-gray-600">
                We offer upto 2 revisions on Couture subscriptions, and 1 revision on Signature subscriptions.
                One-time packages include given revisions. 
                If you're not satisfied, we'll work with you until you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Choose your package above or contact us for custom requirements and enterprise solutions.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '/contact'}
          >
            Contact for Custom Solutions
          </Button>
        </div>
      </section>
    </div>
  );
}
