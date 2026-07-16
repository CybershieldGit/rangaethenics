import { DecorativeDivider } from '../components/ui/DecorativeDivider'
import { OurStory } from '../components/home/OurStory'
import { FlourishDivider } from '../components/about/FlourishDivider'
import { SectionHeading } from '../components/about/SectionHeading'
import { WhyChooseUs } from '../components/about/WhyChooseUs'

const promiseImages = [
  { src: '/images/our_promis1.png', alt: 'Artisan crafting jewellery' },
  { src: '/images/our_promis2.png', alt: 'Traditional weaving on a loom' },
  { src: '/images/our_promis3.png', alt: 'Hand block printing on fabric' },
]

const categories = [
  {
    title: 'Jewellery',
    description:
      'Our oxidised jewellery is meticulously handcrafted by skilled artisans. Inspired by timeless heritage, each design carries a story of tradition, elegance, and individuality.',
    image: '/images/Necklaces.png',
  },
  {
    title: 'Clothing',
    description:
      "Our clothing celebrates India's rich textiles and artisanal craftsmanship. From elegant ethnic wear to everyday styles, each piece is crafted for comfort, quality, and effortless grace.",
    image: '/images/sarees.png',
  },
]

function AboutHero() {
  return (
    <section
      aria-label="About Us"
      className="relative h-[50vh] md:h-auto md:min-h-[820px] max-h-[340px] md:max-h-[820px] overflow-hidden bg-[#fffaf3]"
    >
      <picture>
        <source media="(max-width: 767px)" srcSet="/images/mobile_aboutus_hero_section.jpg" />
        <img
          src="/images/about_photo.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[75%_center] md:object-right"
        />
      </picture>

      <div className="relative z-10 flex h-full items-start md:items-center pt-[40px] md:pt-[100px] pb-12">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="max-w-xl lg:max-w-2xl flex flex-col">
            <h1 className="font-serif text-[24px] w-[220px] md:w-auto leading-[1.1] text-maroon md:text-6xl lg:text-7xl font-normal">
              About Us
            </h1>
            <img
              src="/about_about.svg"
              alt=""
              className="my-[17px] md:mt-4 h-2 md:h-[19px] max-w-[108px] md:max-w-[166px] w-auto"
            />
            <h2 className="mt-2 md:mt-8 font-serif text-xs md:text-[28px] font-bold leading-snug text-maroon md:leading-tight">
              Rooted in Tradition.
              <br />
              Crafted for Generations.
            </h2>
            <div className="mt-4 md:mt-5 space-y-4 text-[12px] md:text-base leading-relaxed text-text-dark font-normal">
              <p className="w-[200px] md:w-auto">
                At Rang Ethnics, we celebrate the beauty of heritage through timeless jewellery
                and clothing.
              </p>
              <p className="w-[200px] md:w-auto">
                Every piece we create is a blend of traditional artistry and modern elegance,
                designed to make you feel unique, every day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom fade gradient for mobile only */}
      <div
        className="absolute inset-x-0 bottom-0 z-[5] h-[230px] md:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 250, 243, 0) 0%, rgba(255, 250, 243, 0.6) 50%, #fffaf3 100%)',
        }}
      />
    </section>
  )
}

function OurStoryIntro() {
  return (
    <section className="bg-[#fffaf3] py-10 md:py-14">
      <div className="mx-auto flex min-h-[226px] max-w-7xl flex-col items-center gap-4 px-4 text-center md:px-8">
        <SectionHeading title="Our Story" align="center" showDivider={false} />
        <p className="w-full text-base leading-relaxed text-text-dark md:text-lg">
          Rang Ethnics began with a simple belief—to keep our heritage alive through craftsmanship
          and creativity. From intricately handcrafted oxidised jewellery to thoughtfully designed
          clothing, our journey is about preserving traditions while embracing contemporary style
          and comfort. Each creation reflects our passion for authenticity, quality, and the
          artisans who bring our vision to life.
        </p>
        <img src="/historical_seperator.svg" alt="" className="mx-auto h-4 w-auto" />
      </div>
    </section>
  )
}

function AboutCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-6 md:px-8 md:pb-16">
      <div className="grid gap-5 md:grid-cols-2 ">
        {categories.map((category) => (
          <div key={category.title} className="text-center md:text-start bg-[#F4E8D7]">
            <div className="px-[30px] py-[30px] pb-[26px]">
              <h3 className="font-serif text-2xl font-bold text-maroon md:text-3xl">
                {category.title}
              </h3>
              <FlourishDivider className="mt-3 justify-center md:justify-start" />
              <p className="mt-5 text-sm leading-relaxed text-text md:text-base">
                {category.description}
              </p>
            </div>
            <div className="mt-8 overflow-hidden">
              <img
                src={category.image}
                alt={category.title}
                className="h-64 w-full object-cover md:h-72"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function AboutPromise() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 md:px-8 md:pt-14">
      <SectionHeading title="Our Promise" />
      <p className="mx-auto mt-5 max-w-2xl text-start text-base leading-relaxed text-text md:mx-0 md:text-left md:text-lg">
        We are committed to preserving heritage, empowering artisans, and delivering products
        that you will cherish for years to come.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {promiseImages.map((image) => (
          <div key={image.src} className="aspect-[4/3] overflow-hidden">
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function About() {
  return (
    <div className="bg-[#fffaf3]">
      <AboutHero />
      <OurStoryIntro />
      <AboutCategories />
      <DecorativeDivider className="py-4 md:py-4 mb-[-30px]" />
      <div className="bg-[#BD8A3C0A]">
        <AboutPromise />
        <WhyChooseUs />
      </div>
      <DecorativeDivider className="py-6" />
      <OurStory buttonText="Explore Collections" to="/products?category=all" />
    </div>
  )
}
