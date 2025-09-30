import { Check, Star, AlertCircle, X, Info } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useState } from 'react';

// Updated pricing tiers with new information
const pricingTiers = [
  {
    name: 'Starter',
    price: '$15',
    period: 'month',
    description: 'Perfect for growing stores that want consistent, scheduled content.',
    features: [
      'Delivery cadence: ~1 image every 2 days (15 images / month)',
      'Premium model selection included',
      '1 revision per image included',
      'Multiple products allowed per request',
      'Turnaround: 24–48 hours per image request (standard SLA)',
      'High-resolution Web JPGs'
    ],
    popular: false,
    bulkScheduling: false,
    pricePerImage: '$1.00'
  },
  {
    name: 'Pro',
    price: '$60',
    period: 'month',
    description: 'For brands running regular campaigns and ads — more cadence and control.',
    features: [
      'Delivery cadence: ~2 images per day (60 images / month)',
      'Premium model selection included',
      '2 revisions per image included',
      'Multiple products allowed per request',
      'Turnaround: 24-hour SLA per image request',
      'High-resolution Web JPGs',
      'Priority WhatsApp support'
    ],
    popular: true,
    bulkScheduling: true,
    pricePerImage: '$1.00',
    discounts: [
      { type: 'Annual', discount: '10%', saving: '$72' },
      { type: 'Semi-annual', discount: '5%', saving: '$36' }
    ]
  },
  {
    name: 'Studio',
    price: '$150',
    period: 'month',
    description: 'Bespoke throughput, fastest turnaround and dedicated support.',
    features: [
      'Delivery cadence: up to 5 images per day (scheduled or bulk)',
      'Premium model selection included',
      '3 revisions per image included',
      'Multiple products allowed per request',
      'Turnaround: 12-hour priority SLA per image request',
      'High-resolution Web JPGs',
      'Dedicated account manager / priority WhatsApp support'
    ],
    popular: false,
    bulkScheduling: true,
    pricePerImage: '$1.00',
    discounts: [
      { type: 'Annual', discount: '20%', saving: '$360' },
      { type: 'Semi-annual', discount: '15%', saving: '$270' }
    ]
  }
];

// Updated picture packages
const picturePackages = [
  {
    service: '5 Images',
    price: '$8',
    description: 'Multiple products allowed.',
    features: [
      'Delivery: 24–48 hours',
      'Premium model selection included',
      '0 revisions per image',
      'High-resolution Web JPGs'
    ],
    discount: '0%'
  },
  {
    service: '10 Images',
    price: '$16',
    description: 'Multiple products allowed.',
    features: [
      'Delivery: 24–48 hours',
      'Premium model selection included',
      '1 revision per image',
      'High-resolution Web JPGs'
    ],
    popular: true,
    discount: '10%'
  },
  {
    service: '20 Images',
    price: '$32',
    description: 'Multiple products allowed.',
    features: [
      'Delivery: 24–48 hours',
      'Premium model selection included',
      '2 revisions per image',
      'High-resolution Web JPGs'
    ],
    discount: '20%'
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

  // Function to generate WhatsApp URL with pre-filled message
  const getWhatsAppUrl = (message: string) => {
    const phoneNumber = '12162449262';
    const encodedMessage = encodeURIComponent(message);
    // Using the direct wa.me URL which works better for pre-filled messages
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  // Function to generate WhatsApp URL for demo request
  const getDemoWhatsAppUrl = () => {
    const message = 'Hi, I\'d like to request a free demo of your AI fashion photography service.';
    return getWhatsAppUrl(message);
  };

  // Function to generate WhatsApp URL for plan inquiry
  const getPlanWhatsAppUrl = (plan: {name: string, price: string} | null) => {
    if (!plan) return 'https://wa.me/12162449262';
    const message = `Hi, I'm interested in the ${plan.name} plan (${plan.price}/month). Please provide more information about this subscription plan.`;
    return getWhatsAppUrl(message);
  };

  // Function to generate WhatsApp URL for package inquiry
  const getPackageWhatsAppUrl = (pkg: {service: string} | null) => {
    if (!pkg) return 'https://wa.me/12162449262';
    
    if (pkg.service === 'CUSTOM') {
      const message = 'Hi, I\'m interested in a custom solution. Please provide more information about tailored packages.';
      return getWhatsAppUrl(message);
    }
    
    const packageDetails = picturePackages.find(p => p.service === pkg.service);
    if (!packageDetails) return 'https://wa.me/12162449262';
    
    const message = `Hi, I'm interested in the ${pkg.service} package (${packageDetails.price}). Please provide more information about this one-time picture package.`;
    return getWhatsAppUrl(message);
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
              Free Trial Pack
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
                    <div className="font-medium text-gray-900">US: +1 (216) 244-9262</div>
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
                  <span className="font-mono">+1 (216) 244-9262</span>
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
              onClick={() => {
                const url = getDemoWhatsAppUrl();
                window.open(url, '_blank');
              }}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium"
            >
              Send Message
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
                                    {selectedPlan.name} | Product name{selectedPlan.name !== 'Starter' ? 's' : ''} | "Send photo{selectedPlan.name !== 'Starter' ? 's' : ''}"
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">US:</span>
                  <span className="font-mono">+1 (216) 244-9262</span>
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
              onClick={() => {
                const url = getPlanWhatsAppUrl(selectedPlan);
                window.open(url, '_blank');
              }}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium"
            >
              Send Message
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
                  <span className="font-mono">+1 (216) 244-9262</span>
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
              onClick={() => {
                const url = getPackageWhatsAppUrl(selectedPackage);
                window.open(url, '_blank');
              }}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium"
            >
              Send Message
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

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-600 ml-1">/{tier.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{tier.pricePerImage} per image</p>
                  <p className="text-gray-600">{tier.description}</p>
                </div>

                {/* Discount badges */}
                {tier.discounts && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {tier.discounts.map((discount, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          {discount.discount} off {discount.type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                  
                  {/* Bulk scheduling note */}
                  {!tier.bulkScheduling && (
                    <li className="flex items-start text-orange-600">
                      <AlertCircle className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium">Bulk scheduling NOT allowed</span>
                    </li>
                  )}
                </ul>

                <Button
                  variant="default"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium"
                  onClick={() => handleGetStarted({name: tier.name, price: tier.price})}
                >
                  Get {tier.name} — {tier.price} / mo
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
                className="w-full md:w-auto border-2 border-gray-300 hover:border-gray-400"
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
                
                {/* Discount badge */}
                {pkg.discount && pkg.discount !== '0%' && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Save {pkg.discount}
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
                  variant="default"
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium"
                  onClick={() => handlePackageGetStarted({service: pkg.service})}
                >
                  Buy {pkg.service.split(' ')[0]} — {pkg.price}
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
                                All packages include professional fashion photography, high-resolution images, 
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
                Starter (48 hours), Pro (24 hours), and Studio (12 hours).
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, and digital wallets through our secure 
                payment processing. All transactions are encrypted and secure.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer discounts for prepaid subscriptions?
              </h3>
              <p className="text-gray-600">
                Yes! We offer significant discounts for prepaid subscriptions:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Pro Plan: 10% off with annual prepayment, 5% off with semi-annual prepayment</li>
                  <li>Studio Plan: 20% off with annual prepayment, 15% off with semi-annual prepayment</li>
                </ul>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is your satisfaction guarantee?
              </h3>
              <p className="text-gray-600">
                We offer up to 3 revisions on Studio subscriptions, 2 revisions on Pro subscriptions, and 1 revision on Starter subscriptions.
                One-time packages include the specified revisions. 
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
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium px-8 py-3"
            onClick={() => window.location.href = '/contact'}
          >
            Contact for Custom Solutions
          </Button>
        </div>
      </section>
    </div>
  );
}
