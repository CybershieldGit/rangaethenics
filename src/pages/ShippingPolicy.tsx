

export function ShippingPolicy() {
  return (
    <div className="bg-[#fffaf3] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-[#BD8A3C]/20 p-8 sm:p-12">
        <h1 className="font-serif text-3xl sm:text-4xl text-maroon font-bold mb-6 text-center border-b border-[#BD8A3C]/20 pb-4">
          Shipping & Delivery Policy
        </h1>
        
        <div className="space-y-8 text-text-dark text-base leading-relaxed">
          {/* Shipping Time */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon mb-3">Shipping Time</h2>
            <p className="mb-3">Our shipping time depends on the product you order:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-maroon">Clothing & Jewellery:</strong> Orders are usually shipped within 2 to 14 working days.
              </li>
              <li>
                During sales or festive offers, shipping may take a little longer due to a higher number of orders.
              </li>
            </ul>
          </section>

          {/* Please Note */}
          <section className="bg-[#fffaf3] p-4 rounded-md border-l-4 border-gold">
            <h3 className="font-serif text-lg font-bold text-maroon mb-2">Please Note:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Working days are Monday to Saturday.</li>
              <li>Sundays and public holidays are not included in the shipping timeline.</li>
            </ul>
          </section>

          {/* Tracking */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon mb-3">Tracking your order</h2>
            <p>
              Once your order is shipped, we will send the tracking details to your registered email address.
              Please check your <span className="font-medium text-maroon">Spam/Junk</span> folder if you do not see the email in your inbox.
            </p>
          </section>

          {/* Shipping Charges */}
          <section>
            <h2 className="font-serif text-xl font-semibold text-maroon mb-3">Shipping Charges</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 bg-[#fffaf3] rounded border border-[#BD8A3C]/20">
                <span className="block text-sm text-text/70 mb-1">Orders below ₹2,000</span>
                <span className="text-lg font-bold text-maroon">Flat ₹150 Shipping Charge</span>
              </div>
              <div className="p-4 bg-[#fffaf3] rounded border border-[#BD8A3C]/20">
                <span className="block text-sm text-text/70 mb-1">Orders of ₹2,000 and above</span>
                <span className="text-lg font-bold text-maroon text-green-700">Free Shipping</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
