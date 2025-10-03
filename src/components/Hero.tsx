import React, { useState } from 'react';
import { Heart, Shield, MapPin, Smartphone, AlertTriangle, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <Shield className="w-6 h-6 text-green-500 absolute -top-1 -right-1 bg-white rounded-full p-1" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              HealthGuard AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium leading-relaxed">
            Continuous personal vitals + face/emotion scanning, AI triage & emergency alerts 
            (SMS/push/call), nearest-hospital search & turn-by-turn travel (Telangana ready), 
            all built to HIPAA-grade security and clinical validation.
          </p>

          {/* Key Features Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Continuous Vitals</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">AI Triage</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <MapPin className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Hospital Search</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">HIPAA Grade</p>
            </div>
          </div>

          {/* Demo Request Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Early Access</h3>
            <form onSubmit={handleDemoRequest} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitted ? (
                  <span>Demo Request Sent!</span>
                ) : (
                  <>
                    <span>Get Demo Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            {isSubmitted && (
              <p className="mt-3 text-sm text-green-600 text-center">
                Thank you! We'll be in touch with demo access soon.
              </p>
            )}
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2">
            <Heart className="w-5 h-5" />
            <span>Try Face Scanner</span>
          </button>
          <button className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-8 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Find Hospitals</span>
          </button>
        </div>