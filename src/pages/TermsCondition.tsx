import React from 'react';
import Layout from '../components/Layout';

const TermsCondition = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Terms & <span className="text-primary">Conditions</span>
            </h1>
            <p className="text-gray-400 text-lg">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Welcome to NEXARA Agency Ltd. These Terms and Conditions ("Terms") govern your use of our website nexara.agency, our digital marketing services, and any related products or services (collectively, the "Services").
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              By accessing our website or engaging our services, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the service or use our services.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-6">
              <p className="text-gray-300 text-sm">
                <strong>Important:</strong> These Terms constitute a legally binding agreement between you and NEXARA Agency Ltd. Please read them carefully before using our services.
              </p>
            </div>
          </section>

          {/* Definitions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">2. Definitions</h2>
            <div className="space-y-4">
              <div className="bg-dark-lighter rounded-xl p-4 border border-white/10">
                <p className="text-primary font-semibold mb-2">"Company"</p>
                <p className="text-gray-300">NEXARA Agency Ltd., a digital marketing agency registered in Bangladesh.</p>
              </div>
              <div className="bg-dark-lighter rounded-xl p-4 border border-white/10">
                <p className="text-primary font-semibold mb-2">"Client"</p>
                <p className="text-gray-300">Any individual, business, or entity that purchases or uses our services.</p>
              </div>
              <div className="bg-dark-lighter rounded-xl p-4 border border-white/10">
                <p className="text-primary font-semibold mb-2">"Services"</p>
                <p className="text-gray-300">Digital marketing services including but not limited to SEO, social media marketing, content creation, web development, and advertising campaigns.</p>
              </div>
              <div className="bg-dark-lighter rounded-xl p-4 border border-white/10">
                <p className="text-primary font-semibold mb-2">"Deliverables"</p>
                <p className="text-gray-300">All materials, reports, content, and other outputs created by the Company for the Client as part of the Services.</p>
              </div>
            </div>
          </section>

          {/* Service Agreement */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">3. Service Agreement</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.1 Service Scope</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Company agrees to provide digital marketing services as specified in the project proposal or service agreement. Services may include:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Search Engine Optimization (SEO) and content marketing</li>
              <li>Social media management and advertising campaigns</li>
              <li>Website development and maintenance</li>
              <li>Pay-per-click (PPC) advertising management</li>
              <li>Email marketing and automation</li>
              <li>Analytics reporting and performance tracking</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.2 Client Responsibilities</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Client agrees to:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Provide accurate and complete information required for service delivery</li>
              <li>Grant necessary access to accounts, platforms, and systems</li>
              <li>Review and approve deliverables within specified timeframes</li>
              <li>Provide timely feedback and communication</li>
              <li>Make payments as per the agreed schedule</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.3 Third-Party Services</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Some services may require third-party platforms (Google Ads, Facebook, etc.). The Client is responsible for:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Creating and maintaining accounts on required platforms</li>
              <li>Paying directly for ad spend and platform fees</li>
              <li>Complying with third-party terms of service</li>
              <li>Providing necessary permissions and access</li>
            </ul>
          </section>

          {/* Payment Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.1 Fees and Pricing</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Service fees are as specified in the project proposal or service agreement. Prices may include:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>One-time project fees</li>
              <li>Monthly retainer fees</li>
              <li>Performance-based compensation</li>
              <li>Ad spend management fees</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.2 Payment Schedule</h3>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li><strong>Projects:</strong> 50% upfront, 50% upon completion</li>
              <li><strong>Monthly Services:</strong> Payment due in advance of each billing period</li>
              <li><strong>Ad Spend:</strong> Paid directly to advertising platforms</li>
              <li><strong>Late Payments:</strong> 1.5% interest per month on overdue amounts</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.3 Refund Policy</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Refunds are handled on a case-by-case basis. Generally:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>No refunds for services already rendered</li>
              <li>Pro-rata refunds for unused portions of monthly services</li>
              <li>Refunds for third-party ad spend subject to platform policies</li>
              <li>Setup fees and one-time costs are non-refundable</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.1 Company Ownership</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Company retains ownership of:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Proprietary methodologies, processes, and systems</li>
              <li>Pre-existing materials and intellectual property</li>
              <li>Tools, software, and templates developed by the Company</li>
              <li>General knowledge and expertise</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.2 Client Ownership</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Upon full payment, the Client receives ownership of:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Custom content created specifically for the Client</li>
              <li>Website designs and developed code</li>
              <li>Final deliverables as specified in the agreement</li>
              <li>Reports and analytics data related to their campaigns</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.3 Licensing</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Company grants the Client a non-exclusive, worldwide license to use deliverables for their business purposes. The Company reserves the right to use work samples in our portfolio and marketing materials.
            </p>
          </section>

          {/* Confidentiality */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">6. Confidentiality</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.1 Confidential Information</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Both parties agree to keep confidential all non-public information received during our business relationship, including:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Business strategies, financial information, and customer data</li>
              <li>Marketing plans, campaign details, and performance metrics</li>
              <li>Technical information and proprietary processes</li>
              <li>Any information marked as confidential</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.2 Exceptions</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              This confidentiality obligation does not apply to information that:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Is or becomes public knowledge through no fault of the receiving party</li>
              <li>Is rightfully received from a third party without restriction</li>
              <li>Is required to be disclosed by law or legal process</li>
              <li>Was already in the receiving party's possession prior to disclosure</li>
            </ul>
          </section>

          {/* Service Level and Performance */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">7. Service Level and Performance</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">7.1 Service Standards</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We commit to:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Respond to inquiries within 24 business hours</li>
              <li>Provide regular progress reports and updates</li>
              <li>Deliver work within agreed timeframes</li>
              <li>Maintain professional standards of quality</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">7.2 Performance Metrics</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              While we strive for excellent results, we cannot guarantee specific outcomes such as:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Specific search engine rankings</li>
              <li>Exact traffic or conversion numbers</li>
              <li>Social media engagement rates</li>
              <li>Return on investment figures</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              Marketing results depend on numerous factors beyond our control, including market conditions, competition, and client decisions.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">8.1 Termination by Client</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Client may terminate services with:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>30 days written notice for monthly services</li>
              <li>Immediate termination for cause (material breach)</li>
              <li>Payment for all work completed up to termination date</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">8.2 Termination by Company</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Company may terminate services if:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Client breaches these terms or fails to make payments</li>
              <li>Client engages in illegal or unethical activities</li>
              <li>Client provides false or misleading information</li>
              <li>Services become impossible or impractical to perform</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">8.3 Post-Termination</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Upon termination:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Final payment for all completed work is due</li>
              <li>Company will transfer all Client-owned deliverables</li>
              <li>Confidentiality obligations continue indefinitely</li>
              <li>Third-party accounts remain Client's responsibility</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">9.1 Service Limitations</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              To the fullest extent permitted by law:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Our total liability is limited to fees paid for the specific service</li>
              <li>We are not liable for indirect, consequential, or punitive damages</li>
              <li>We are not responsible for third-party platform failures</li>
              <li>We are not liable for business decisions made by the Client</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">9.2 Exclusions</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We disclaim all warranties except as explicitly stated, including:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Implied warranties of merchantability and fitness</li>
              <li>Warranties of non-infringement</li>
              <li>Guarantees of specific business outcomes</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Client agrees to indemnify and hold harmless NEXARA Agency Ltd. from any claims, damages, or expenses arising from:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Client's breach of these Terms</li>
              <li>Client's violation of any law or third-party rights</li>
              <li>Content or materials provided by the Client</li>
              <li>Client's use of the services</li>
            </ul>
          </section>

          {/* Force Majeure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">11. Force Majeure</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Neither party is liable for failure to perform due to circumstances beyond reasonable control, including:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Natural disasters, war, or civil unrest</li>
              <li>Government actions or regulations</li>
              <li>Internet outages or third-party service failures</li>
              <li>Pandemics or public health emergencies</li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">12. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">12.1 Good Faith Negotiation</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Both parties agree to first attempt to resolve disputes through good faith negotiation and communication.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">12.2 Governing Law</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              These Terms are governed by and construed in accordance with the laws of Bangladesh, without regard to conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">12.3 Jurisdiction</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Any legal proceedings shall be conducted in the courts of Dhaka, Bangladesh.
            </p>
          </section>

          {/* General Provisions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">13. General Provisions</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">13.1 Entire Agreement</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              These Terms, along with any service agreements, constitute the entire understanding between the parties and supersede all prior discussions or agreements.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">13.2 Severability</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">13.3 Waiver</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Failure to enforce any provision does not constitute a waiver of that provision or any other provision of these Terms.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">13.4 Assignment</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Neither party may assign these Terms without prior written consent, except that the Company may assign to affiliates or successors.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
            <div className="bg-dark-lighter rounded-2xl p-6 border border-white/10">
              <p className="text-gray-300 leading-relaxed mb-4">
                For questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-3">
                <p className="text-gray-300">
                  <span className="text-primary font-semibold">Email:</span> legal@nexara.agency
                </p>
                <p className="text-gray-300">
                  <span className="text-primary font-semibold">Phone:</span> +8801797-242610
                </p>
                <p className="text-gray-300">
                  <span className="text-primary font-semibold">Address:</span> 1st Floor, House: 21, Road: 3, Banani DOHS, Dhaka- 1206, Bangladesh
                </p>
                <p className="text-gray-300">
                  <span className="text-primary font-semibold">Business Hours:</span> Sunday - Thursday, 9:00 AM - 6:00 PM (BST)
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
            <div className="bg-primary/10 rounded-xl p-4 inline-block">
              <p className="text-gray-300 text-xs">
                <strong>Legal Notice:</strong> This document is a legal agreement. Consult with legal counsel if you have questions about your rights and obligations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsCondition;
