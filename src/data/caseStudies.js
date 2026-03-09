export const CASE_STUDIES = [
  {
    slug: 'alam-by-tulsi-patel',
    tag: 'Case Study',
    date: '2025',
    readTime: '4 mins',
    title: 'Alam by Tulsi: Whizz of Indian Silhouettes Global Presence',
    image: '/images/insight-alam.webp',
    intro:
      "In one of our recent projects, Enlighten's team had the opportunity to collaborate with the brand Alam by Tulsi Patel. The core USP of Alam by Tulsi Patel is that it celebrates India's rich textile traditions and intricate artistry, rooted in Gujarati culture, particularly in marodi embroidery.",
    body: [
      {
        type: 'heading',
        text: 'Problem Statement',
      },
      {
        type: 'paragraph',
        text: "The brand was looking to expand its presence beyond India to international markets where the Indian diaspora is strongly present. The founders needed a thoughtfully designed e-commerce website that could present its collections clearly while offering a smooth experience for users exploring and purchasing from international markets.",
      },
      {
        type: 'heading',
        text: 'Solutions We Provided',
      },
      {
        type: 'list',
        items: [
          "The site structure was thoughtfully planned to present collections clearly across categories, making browsing intuitive.",
          "The navigation and checkout flow were simplified so users can explore, choose, and make a purchase in fewer steps.",
          "The design retains the essence of handcrafted Indian style while subtly blending in a contemporary look and feel.",
          "Built on Shopify to support smooth inventory handling and secure global payments.",
          "Post-launch, Enlighten's team also ran digital campaigns that significantly boosted their visibility and reach among the Indian diaspora.",
        ],
      },
    ],
    attribution: null,
    quote: null,
    cta: { label: 'Visit Website', href: 'https://shorturl.at/efXTU' },
  },
  {
    slug: 'kanta-enterprises',
    tag: 'Case Study',
    date: '2025',
    readTime: '4 mins',
    title: 'Kanta Enterprises: B2B Branding Through Strategic Marketing Initiatives',
    image: '/images/insight-kanta.webp',
    intro:
      "Operating in the B2B segment of bulk manufacturing, exporting, and global supply of fragrance and flavour products, essential oils, carrier oils, and perfumery compounds, our client Kanta Enterprises Pvt Ltd sought our services to expand their global reach to clientele.",
    body: [
      {
        type: 'heading',
        text: 'Problem Statement',
      },
      {
        type: 'paragraph',
        text: "As our client deals in the B2B segment, the lens of marketing shifts to generating high-quality leads continually as well as building a brand value that their clients trust. This project was purely aligned on authentically showcasing Kanta's unique value propositions and business processes through well-strategized marketing efforts.",
      },
      {
        type: 'heading',
        text: 'Solutions We Provided',
      },
      {
        type: 'paragraph',
        text: "We're proud to be the digital backbone for Kanta Enterprises Pvt. Ltd since 2022. Our collaboration has been an inspiring blend of strategy, creativity, and continuous learning. Here are the services we provided:",
      },
      {
        type: 'list',
        items: [
          "Website Development",
          "Social Media Marketing",
          "LinkedIn B2B Lead Generation",
          "SEO Optimization",
          "Product-Portfolio Design",
          "Brochure & Collateral Creation",
          "Offline Design Solutions for Global Exhibitions",
        ],
      },
    ],
    attribution: null,
    quote: null,
    cta: { label: 'Visit Website', href: '#' },
  },
  {
    slug: 'young-founders-lab',
    tag: 'Case Study',
    date: '2025',
    readTime: '4 mins',
    title: "Young Founder's Lab: Fresh, Modern UI/UX for Entrepreneurship Training",
    image: '/images/insight-yfl.webp',
    intro:
      "Young Founder's Lab (YFL) is a unique blend of a start-up incubator and a professional development program. The company was founded with the vision to equip young professionals with training and mentorship by industry leaders to build real, revenue-generating ventures.",
    body: [
      {
        type: 'heading',
        text: 'Problem Statement',
      },
      {
        type: 'paragraph',
        text: "The UI/UX of their previously created website was not functional, and the visitor footfall was below the benchmark. For any website, UI/UX becomes the foremost priority because it is the connective string between the audience and a brand. If the UI/UX is not strong enough, then for visitors it would be like navigating through a cluttered pile of books to fetch the one they need.",
      },
      {
        type: 'heading',
        text: 'Solutions We Provided',
      },
      {
        type: 'paragraph',
        text: "We partnered with YFL to design a smart UI/UX strategy focused on user experience. Our team prepared blueprints/prototypes for the website on Figma. Post the UI/UX, the development was executed on the Squarespace platform. The end output was an engaging, fresh, intuitive, and impactful website, which our clients appreciated profoundly.",
      },
      {
        type: 'paragraph',
        text: "The fresh UI/UX not only enhanced user experience but also drove remarkable organic growth in SERP rankings and lead generation. Most importantly, the ROI kept climbing steadily, ensuring lasting impact.",
      },
    ],
    attribution: null,
    quote: null,
    cta: { label: 'Visit Website', href: 'https://shorturl.at/efXTU' },
  },
]

export function getCaseStudyBySlug(slug) {
  return CASE_STUDIES.find((cs) => cs.slug === slug) ?? null
}
