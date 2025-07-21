import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
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
              Privacy Policy
            </CardTitle>
            <p className="text-center text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                <p>We collect the following types of information:</p>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Personal Information:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and email address (for appointment booking)</li>
                  <li>Appointment preferences and messages</li>
                  <li>Communication history with our system</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Usage Data:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and browser information</li>
                  <li>Pages visited and interaction patterns</li>
                  <li>System performance and error logs</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                <p>We use your information for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Processing and confirming appointment bookings</li>
                  <li>Sending personalized email confirmations</li>
                  <li>Improving our AI-powered services</li>
                  <li>Providing customer support</li>
                  <li>Ensuring system security and performance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. AI and Data Processing</h2>
                <p>
                  Our system uses Claude AI to enhance your experience:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Message analysis for better service recommendations</li>
                  <li>Personalized email content generation</li>
                  <li>Appointment duration and priority assessment</li>
                  <li>Service improvement through pattern recognition</li>
                </ul>
                <p className="mt-4 text-sm bg-blue-50 p-4 rounded-lg">
                  <strong>Note:</strong> All AI processing is done securely and your personal information 
                  is never shared with third-party AI services beyond what's necessary for service delivery.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Storage and Security</h2>
                <p>We protect your data through:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Industry-standard encryption (SSL/TLS)</li>
                  <li>Secure cloud hosting with Railway and Vercel</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal data</li>
                  <li>Automatic data backup and recovery</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Retention</h2>
                <p>We retain your data for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Booking data:</strong> 2 years after last activity</li>
                  <li><strong>Email confirmations:</strong> 1 year</li>
                  <li><strong>Usage analytics:</strong> 6 months (anonymized)</li>
                  <li><strong>System logs:</strong> 30 days</li>
                </ul>
                <p className="mt-4">
                  You can request data deletion at any time by contacting us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights (GDPR)</h2>
                <p>Under GDPR, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate information</li>
                  <li><strong>Erasure:</strong> Request deletion of your data</li>
                  <li><strong>Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Objection:</strong> Object to certain processing activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Third-Party Services</h2>
                <p>We use these third-party services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Railway:</strong> Backend hosting and database</li>
                  <li><strong>Vercel:</strong> Frontend hosting</li>
                  <li><strong>Gmail:</strong> Email delivery</li>
                  <li><strong>Anthropic:</strong> AI processing (Claude)</li>
                </ul>
                <p className="mt-4 text-sm bg-yellow-50 p-4 rounded-lg">
                  <strong>Important:</strong> These services have their own privacy policies. 
                  We only share data necessary for service delivery.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Cookies and Tracking</h2>
                <p>We use essential cookies for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Session management and security</li>
                  <li>Performance monitoring</li>
                  <li>User experience optimization</li>
                </ul>
                <p className="mt-4">
                  We do not use tracking cookies or third-party advertising.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
                <p>For privacy-related questions or requests:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> privacy@smartbookingpro.com</p>
                  <p><strong>Data Protection Officer:</strong> dpo@smartbookingpro.com</p>
                  <p><strong>Address:</strong> [Your Business Address]</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any 
                  significant changes by email or through our website. Continued use of our service 
                  after changes constitutes acceptance of the updated policy.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 