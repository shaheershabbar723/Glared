import { Mail, Phone, MapPin } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Your privacy is important to us at GLARED
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-4">
                At GLARED, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our AI Fashion Photography Platform.
              </p>
              <p className="text-gray-700">
                This policy is designed to help you understand what data we collect, how we use it, and what rights you have regarding your information.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect various types of information to provide and improve our services:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Name and contact details (email, phone number)</li>
                <li>Billing and shipping information</li>
                <li>Communication preferences</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Information</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Authentication credentials</li>
                <li>Profile data and preferences</li>
                <li>Account settings and history</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Information</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Payment details are securely processed via Stripe</li>
                <li>GLARED never stores full credit card details</li>
                <li>Only necessary transaction information is retained</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Uploaded Content</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Images uploaded for portfolio or AI processing</li>
                <li>Product information and descriptions</li>
                <li>Project specifications and requirements</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Data</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use your information for various purposes to enhance your experience:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide our AI fashion photography services and portfolio management</li>
                <li>Create and manage your account</li>
                <li>Authenticate your identity and ensure account security</li>
                <li>Process payments securely via Stripe</li>
                <li>Communicate with you for customer support and updates</li>
                <li>Improve our services, security, and user experience</li>
                <li>Send you relevant information based on your preferences</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            {/* How We Share Your Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Share Your Information</h2>
              <p className="text-gray-700 mb-4">
                We respect your privacy and only share information in specific circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Third-party services:</strong> We use Supabase for database, authentication, and storage, and Stripe for payment processing. These services have their own privacy policies.</li>
                <li><strong>Legal compliance:</strong> We may share information if required by law or to protect our rights and safety.</li>
                <li><strong>Business transfers:</strong> In the event of a merger or acquisition, your information may be transferred to the new owners.</li>
                <li><strong>With your consent:</strong> We may share information with your explicit permission.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>We never sell or rent your personal information to third parties.</strong>
              </p>
            </section>

            {/* Data Storage & Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Storage & Security</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>All data is hosted on Supabase, a secure cloud platform with robust security measures</li>
                <li>Sensitive data is encrypted both in transit and at rest</li>
                <li>Access to personal information is restricted to authorized personnel only</li>
                <li>We implement industry-standard security practices to protect your data</li>
                <li>Regular security audits and updates are performed</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Access:</strong> You can request access to the personal information we hold about you</li>
                <li><strong>Correction:</strong> You can request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> You can request deletion of your personal information</li>
                <li><strong>Objection:</strong> You can object to certain processing of your information</li>
                <li><strong>Restriction:</strong> You can request restriction of processing in certain circumstances</li>
                <li><strong>Data Portability:</strong> You can request a copy of your data in a portable format</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </section>

            {/* Cookies & Tracking */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies & Tracking</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>We use cookies for authentication and to enhance your browsing experience</li>
                <li>Analytics cookies help us understand how visitors interact with our website</li>
                <li>You can manage or disable cookies in your browser settings</li>
                <li>Disabling cookies may affect the functionality of certain features</li>
              </ul>
            </section>

            {/* Payments */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payments</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>All payments are securely processed via Stripe, a trusted payment processor</li>
                <li>GLARED does not store full payment card details</li>
                <li>Payment information is encrypted and handled according to PCI DSS standards</li>
                <li>Transaction records are kept for accounting and security purposes</li>
              </ul>
            </section>

            {/* International Users */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Our services are available to users globally</li>
                <li>Your information may be processed and stored in the United States and Pakistan</li>
                <li>We comply with applicable data protection laws in all jurisdictions</li>
                <li>Data transfers are protected by appropriate safeguards</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            {/* Updates to this Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to this Policy</h2>
              <p className="text-gray-700">
                GLARED may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Mail className="text-gray-700 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">Email: info@glared.com</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Phone className="text-gray-700 mt-1 flex-shrink-0" size={18} />
                  <div className="text-gray-700">
                    <div>US Office: +1 (216) 244-9262</div>
                    <div>Pakistan Office: +92 320 8399055</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="text-gray-700 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-700">3648 Rocky River Dr, Cleveland, OH - 44111</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}