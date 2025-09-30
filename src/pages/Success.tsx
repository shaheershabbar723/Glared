import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session = searchParams.get('session_id');
    setSessionId(session);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for choosing our AI fashion photography services. Your order has been confirmed and we're excited to create amazing visuals for you.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Order Confirmation</h4>
                  <p className="text-gray-600 text-sm">You'll receive an email confirmation with your order details within the next few minutes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Project Setup</h4>
                  <p className="text-gray-600 text-sm">Our team will review your requirements and begin setting up your AI photography project.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Delivery</h4>
                  <p className="text-gray-600 text-sm">Your professional AI-generated fashion photos will be delivered according to your package timeline.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session ID (for reference) */}
          {sessionId && (
            <div className="bg-blue-50 rounded-lg p-4 mb-8">
              <p className="text-sm text-blue-800">
                <strong>Order Reference:</strong> {sessionId}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Please save this reference number for your records
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/portfolio')}
              className="group"
            >
              View Our Portfolio
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/contact')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help or have questions? Contact us at{' '}
              <a href="mailto:support@glared.com" className="text-yellow-600 hover:text-yellow-700">
                support@glared.com
              </a>{' '}
              or call:
            </p>
            <div className="text-sm text-gray-500 mt-2 space-y-1">
              <p>
                                <a href="tel:+12162449262" className="text-yellow-600 hover:text-yellow-700">
                                    +1 (216) 244-9262
                </a>{' '}
                (US Office)
              </p>
              <p>
                <a href="tel:+923208399055" className="text-yellow-600 hover:text-yellow-700">
                  +92 320 8399055
                </a>{' '}
                (Pak Office)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}