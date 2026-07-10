

export function PrivacyPolicy() {
  return (
    <div className="bg-[#fffaf3] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-[#BD8A3C]/20 p-8 sm:p-12">
        <h1 className="font-serif text-3xl sm:text-4xl text-maroon font-bold mb-6 text-center border-b border-[#BD8A3C]/20 pb-4">
          Privacy Policy
        </h1>

        <p className="text-text-dark text-center italic mb-8">
          At Rang Ethnics, we value your privacy and are committed to protecting your personal information.
        </p>

        <div className="space-y-8 text-text-dark text-base leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon mb-3">1. Information we collect</h2>
            <p className="mb-2">When you place an order or create an account, we may collect information such as:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Shipping and billing address</li>
              <li>Payment details (processed securely through our payment partners)</li>
            </ul>
            <p>
              We may also collect information such as your IP address, browser type, and device information to improve your shopping experience.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon mb-3">2. How we use your Information</h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process and deliver your orders.</li>
              <li>Provide customer support.</li>
              <li>Send order updates and tracking information.</li>
              <li>Improve our website and services.</li>
              <li>Send promotional emails, SMS, or WhatsApp messages (only if you have opted in).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon mb-3">3. Your Consent</h2>
            <p>
              By using our website and placing an order, you agree to the collection and use of your information as described in this Privacy Policy.
              You may unsubscribe from promotional emails or messages at any time by contacting us or using the unsubscribe option provided.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon mb-3">4. Sharing your information</h2>
            <p className="mb-2">We do not sell or rent your personal information.</p>
            <p className="mb-2">Your information may be shared only with trusted third-party service providers such as:</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Payment gateways</li>
              <li>Shipping and courier partners</li>
              <li>Website hosting and technical service providers</li>
            </ul>
            <p>
              These partners only receive the information necessary to complete your order or provide their services.
              We may also disclose your information if required by law.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon mb-3">5. WordPress</h2>
            <p>
              Our website is powered by WordPress, which provides a secure e-commerce platform for processing your orders.
              Payment information is processed securely through WordPress and its payment partners using industry-standard security measures,
              including PCI-DSS compliance.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon mb-3">6. Security</h2>
            <p>
              We take reasonable precautions to protect your personal information.
              Your payment details are encrypted using secure technology, and we follow industry best practices to keep your information safe.
              However, no method of online transmission or storage is 100% secure.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon mb-3">7. Cookies</h2>
            <p className="mb-2">Our website uses cookies to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Keep items in your shopping cart.</li>
              <li>Remember your preferences.</li>
              <li>Improve website performance.</li>
              <li>Understand how visitors use our website.</li>
            </ul>
            <p className="mt-2 text-sm italic">You can disable cookies through your browser settings if you prefer.</p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon mb-3">8. Age Requirement</h2>
            <p>
              By using this website, you confirm that you are at least 18 years old or have the consent of a parent or legal guardian.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon mb-3">9. Changes to the policy</h2>
            <p>
              We may update this Privacy Policy from time to time.
              Any changes will be posted on this page and will become effective immediately after they are published.
            </p>
          </section>

          {/* Contact us */}
          <section className="bg-[#fffaf3] p-6 rounded-md border border-[#BD8A3C]/20 text-center">
            <h2 className="font-serif text-xl font-bold text-maroon mb-3">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or would like to access, update, or delete your personal information, please contact us.
            </p>
            <div className="space-y-1 font-semibold text-maroon">
              <p>Rang Ethnics</p>
              <p>Email: <a href="mailto:aditibhatt2@gmail.com" className="underline hover:text-gold">aditibhatt2@gmail.com</a></p>
              <p>WhatsApp: <a href="https://wa.me/917984037909" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold">7984037909</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
