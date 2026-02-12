import Layout from '../components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-gray-400 text-lg">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Welcome to NEXARA Agency Ltd. ("we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website nexara.agency and use our digital marketing services.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We are committed to protecting your personal data and ensuring transparency in our data practices. This policy applies to all users of our website, clients, partners, and individuals whose information we collect in the course of our business operations.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.1 Personal Information</h3>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Full name, email address, phone number</li>
              <li>Company name, job title, and business contact information</li>
              <li>Billing address and payment information</li>
              <li>Communication preferences and marketing consent</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.2 Technical Information</h3>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>IP address, browser type, and device information</li>
              <li>Operating system and browser version</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Pages visited, time spent, and click patterns</li>
              <li>Referral source and search terms used</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.3 Business Information</h3>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Company registration details and business size</li>
              <li>Industry sector and target market information</li>
              <li>Marketing budgets and campaign requirements</li>
              <li>Performance metrics and analytics data</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.1 Service Delivery</h3>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Providing digital marketing services and consultations</li>
              <li>Developing and implementing marketing strategies</li>
              <li>Managing advertising campaigns and SEO optimization</li>
              <li>Creating content and managing social media presence</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.2 Communication</h3>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Responding to inquiries and providing customer support</li>
              <li>Sending service updates and performance reports</li>
              <li>Marketing communications (with consent)</li>
              <li>Newsletter subscriptions and promotional content</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.3 Legal and Security</h3>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Compliance with legal obligations and regulations</li>
              <li>Fraud prevention and security monitoring</li>
              <li>Dispute resolution and legal proceedings</li>
              <li>Protecting our rights, property, and safety</li>
            </ul>
          </section>

          {/* Data Sharing and Disclosure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.1 Service Providers</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We share information with trusted third-party service providers who assist in our operations, including:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Payment processors and financial institutions</li>
              <li>Cloud hosting and IT infrastructure providers</li>
              <li>Analytics and marketing automation tools</li>
              <li>Advertising platforms and social media networks</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.2 Legal Requirements</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may disclose your information when required by law or to protect our rights:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Court orders, subpoenas, or legal processes</li>
              <li>Government regulatory requirements</li>
              <li>Protection against fraud or security threats</li>
              <li>Prevention of illegal activities</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure servers with firewalls and access controls</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Employee training on data protection practices</li>
              <li>Limited access to personal information on need-to-know basis</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but strive to use commercially reasonable means to protect your information.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.1 Access and Correction</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              You have the right to access and update your personal information. Contact us to:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Review what personal data we hold about you</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Update contact details and preferences</li>
              <li>Request deletion of unnecessary data</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.2 Data Portability</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              You can request a copy of your data in a structured, machine-readable format for transfer to another service provider.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.3 Marketing Preferences</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking Technologies</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">7.1 Essential Cookies</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Required for basic website functionality, including security, authentication, and shopping cart features.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">7.2 Analytics Cookies</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Help us understand how visitors interact with our website by collecting and reporting information anonymously.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">7.3 Marketing Cookies</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Used to deliver relevant advertisements and track campaign effectiveness across different websites and platforms.
            </p>

            <p className="text-gray-300 leading-relaxed mt-6">
              You can control cookie preferences through your browser settings or our cookie consent banner.
            </p>
          </section>

          {/* International Data Transfers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Your information may be transferred to and processed in countries other than Bangladesh. We ensure adequate protection through:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Standard contractual clauses with service providers</li>
              <li>Adequacy decisions from relevant authorities</li>
              <li>Binding corporate rules for intra-group transfers</li>
              <li>Compliance with applicable data protection laws</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">9. Data Retention</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We retain your information only as long as necessary for the purposes outlined in this policy:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Client data: Duration of service relationship plus 7 years</li>
              <li>Prospect data: 2 years from last interaction</li>
              <li>Website analytics: 26 months (Google Analytics default)</li>
              <li>Financial records: 7 years as required by law</li>
              <li>Employment records: 7 years after termination</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 18, we will take steps to delete such information immediately.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. We will notify you of significant changes by:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
              <li>Emailing the address you provided</li>
              <li>Posting a notice on our website</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending notifications through our client portal</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
            <div className="bg-dark-lighter rounded-2xl p-6 border border-white/10">
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-3">
                <p className="text-gray-300">
                  <span className="text-primary font-semibold">Email:</span> privacy@nexara.agency
                </p>
                <p className="text-gray-300">
                  <span className="text-primary font-semibold">Phone:</span> +8801797-242610
                </p>
                <p className="text-gray-300">
                  <span className="text-primary font-semibold">Address:</span> 1st Floor, House: 21, Road: 3, Banani DOHS, Dhaka- 1206, Bangladesh
                </p>
                <p className="text-gray-300">
                  <span className="text-primary font-semibold">Data Protection Officer:</span> dpo@nexara.agency
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              This Privacy Policy is part of our commitment to transparency and data protection. 
              By using our services, you acknowledge that you have read and understood this policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
