import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'
import { getActiveCoupons } from '../../utils/api'

interface FestiveSpecialProps {
  eyebrow?: string
  note?: string
  image?: string
  category?: string
}

export function FestiveSpecial({
  eyebrow = 'Flat 15% Off',
  note = 'On all jewellery',
  image = '/images/festive_jewellery.png',
  category = 'all',
}: FestiveSpecialProps) {
  const [promoText, setPromoText] = useState({ eyebrow, note })

  useEffect(() => {
    async function fetchPromoCoupon() {
      try {
        const coupons = await getActiveCoupons()
        // Find an active coupon that applies globally to all products
        const globalCoupon = coupons.find(
          (c) =>
            c.isActive &&
            (!c.applicableProducts || c.applicableProducts.length === 0) &&
            (!c.excludedProducts || c.excludedProducts.length === 0)
        )

        if (globalCoupon) {
          const discountStr =
            globalCoupon.discountType === 'percentage'
              ? `Flat ${globalCoupon.discountValue}% Off`
              : `Flat ₹${globalCoupon.discountValue} Off`
          
          const promoNote = `Use code: ${globalCoupon.code} (Min purchase: ₹${globalCoupon.minPurchase || 0})`
          setPromoText({
            eyebrow: discountStr,
            note: promoNote,
          })
        }
      } catch (err) {
      }
    }
    fetchPromoCoupon()
  }, [])

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="relative overflow-hidden bg-black">
        <img
          src={image}
          alt=""
          className="absolute inset-y-0 right-0 h-full w-[62%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="relative flex min-h-[300px] items-center md:min-h-[380px]">
          <div className="w-full px-8 py-12 md:px-14 md:py-0">
            <h2 className="font-serif text-4xl leading-tight text-white md:text-6xl">
              Festive Special
            </h2>
            <p className="mt-5 text-lg font-bold uppercase tracking-wide text-white md:text-2xl">
              {promoText.eyebrow}
            </p>
            <p className="mt-1 text-sm text-white/80 md:text-base">{promoText.note}</p>

            <div className="mt-8">
              <Link to={`/products?category=${category}`}>
                <Button className="!px-8 !py-3 cursor-pointer">Shop Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
