import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Terms of Service
            </CardTitle>
            <p className="text-center text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Service Description</h2>
                <p>
                  Smart Booking Pro is an AI-powered appointment scheduling system that helps users book appointments 
                  through an intelligent interface. Our service uses artificial intelligence to analyze booking requests 
                  and generate personalized email confirmations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. User Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and truthful information when booking appointments</li>
                  <li>Respect scheduled appointment times and provide adequate notice for cancellations</li>
                  <li>Use the service in compliance with applicable laws and regulations</li>
                  <li>Maintain the confidentiality of any account credentials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. AI and Data Usage</h2>
                <p>
                  Our system uses Claude AI to analyze booking messages and generate email content. 
                  By using our service, you consent to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI analysis of your booking messages for service improvement</li>
                  <li>Generation of personalized email confirmations</li>
                  <li>Storage of booking data for service delivery</li>
                  <li>Anonymous usage analytics for system improvement</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Privacy and Data Protection</h2>
                <p>
                  We are committed to protecting your privacy. Your personal information is:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Used only for appointment scheduling and communication</li>
                  <li>Stored securely using industry-standard encryption</li>
                  <li>Never sold to third parties</li>
                  <li>Retained only as long as necessary for service delivery</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Service Availability</h2>
                <p>
                  While we strive for 99.9% uptime, we cannot guarantee uninterrupted service. 
                  We reserve the right to perform maintenance, updates, or modifications that may 
                  temporarily affect service availability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
                <p>
                  Smart Booking Pro is provided "as is" without warranties. We are not liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Missed appointments or scheduling conflicts</li>
                  <li>Data loss or system interruptions</li>
                  <li>Third-party service failures (email, hosting, etc.)</li>
                  <li>Indirect or consequential damages</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Information</h2>
                <p>
                  For questions about these terms or our service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> support@smartbookingpro.com</p>
                  <p><strong>Website:</strong> smartbookingpro.com</p>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 