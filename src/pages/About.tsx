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
      className="relative min-h-[581px] bg-[#fffaf3] bg-[url('/images/about_photo.png')] bg-cover bg-[75%_center] bg-no-repeat md:bg-right"
    >
      <div className="relative mx-auto flex min-h-[581px] max-w-7xl items-start px-4 pt-10 pb-12 md:px-8 md:pt-[100px] md:pb-16">
        <div className="flex min-h-[373px] w-full max-w-[558px] flex-col">
          <h1 className="font-serif text-[48px] font-normal leading-none tracking-normal text-maroon sm:text-[60px] md:text-[72px]">
            About Us
          </h1>
          <img
            src="/about_about.svg"
            alt=""
            className="mt-4 h-[19px] w-[166px]"
          />
          <h2 className="mt-7 font-serif text-xl font-bold leading-snug text-maroon sm:text-2xl md:mt-8 md:text-[28px] md:leading-tight">
            Rooted in Tradition.
            <br />
            Crafted for Generations.
          </h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-text-dark md:text-base">
            <p>
              At Rang Ethnics, we celebrate the beauty of heritage through timeless jewellery
              and clothing.
            </p>
            <p>
              Every piece we create is a blend of traditional artistry and modern elegance,
              designed to make you feel unique, every day.
            </p>
          </div>
        </div>
      </div>
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
      <OurStory />
    </div>
  )
}
