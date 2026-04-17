import useSEO from '@/hooks/useSEO'
import SmoothScroll from '@components/layout/SmoothScroll'
import CustomCursor from '@components/layout/CustomCursor'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'

export default function PrivacyPolicyPage() {
  useSEO({
    title: 'Privacy Policy',
    description: 'Privacy Policy for Enlighten Creatives — learn how we collect, use, and protect your personal information.',
  })

  return (
    <SmoothScroll autoStart>
      <CustomCursor />
      <Navbar variant="dark" />
      <main
        id="main-content"
        style={{ backgroundColor: '#ffffff', fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        <section className="min-h-screen px-[48px] pt-[180px] pb-[120px] max-lg:px-5 max-lg:pt-[140px] max-lg:pb-[80px] max-sm:px-4 max-sm:pt-[120px] max-sm:pb-[60px]">
          <div className="max-w-[900px] mx-auto">
            <h1
              className="text-[56px] font-medium leading-[1.1] tracking-[-2px] text-[#202020] mb-[60px] max-lg:text-[40px] max-sm:text-[32px] max-sm:mb-[40px]"
              style={{ fontFamily: "'Sentient', serif" }}
            >
              Privacy Policy
            </h1>

            <p className="text-[14px] text-[#888] mb-[48px] max-sm:mb-[32px]">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="flex flex-col gap-[40px] text-[17px] leading-[1.7] text-[#444] max-sm:gap-[28px] max-sm:text-[15px]">
              <div>
                <h2 className="text-[24px] font-medium text-[#202020] mb-[16px] tracking-[-0.5px] max-sm:text-[20px]">
                  1. Introduction
                </h2>
                <p>
                  Welcome to Enlighten Creatives (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your
                  personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose,
                  and safeguard your information when you visit our website{' '}
                  <a href="https://enlightencreatives.com" className="text-[#c96b00] underline hover:no-underline">
                    enlightencreatives.com
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="text-[24px] font-medium text-[#202020] mb-[16px] tracking-[-0.5px] max-sm:text-[20px]">
                  2. Information We Collect
                </h2>
                <p className="mb-[12px]">We may collect the following types of information:</p>
                <ul className="list-disc pl-[24px] flex flex-col gap-[8px]">
                  <li><strong>Personal Information:</strong> Name and email address when you submit a form on our website.</li>
                  <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, browser type, and device information, collected through Google Analytics 4 and Google Tag Manager.</li>
                  <li><strong>Cookies &amp; Tracking Technologies:</strong> We use cookies and similar technologies to enhance your browsing experience and analyse website traffic.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-[24px] font-medium text-[#202020] mb-[16px] tracking-[-0.5px] max-sm:text-[20px]">
                  3. How We Use Your Information
                </h2>
                <ul className="list-disc pl-[24px] flex flex-col gap-[8px]">
                  <li>To respond to your enquiries and communicate with you.</li>
                  <li>To analyse website usage and improve our services.</li>
                  <li>To send newsletters or updates if you have opted in.</li>
                  <li>To comply with legal obligations.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-[24px] font-medium text-[#202020] mb-[16px] tracking-[-0.5px] max-sm:text-[20px]">
                  4. Google Analytics &amp; Google Tag Manager
                </h2>
                <p>
                  We use Google Analytics 4 (GA4) and Google Tag Manager (GTM) to collect anonymised data about how visitors
                  use our website. This data helps us understand user behaviour and improve our website. Google may use cookies
                  to collect this information. You can opt out of Google Analytics by installing the{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c96b00] underline hover:no-underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="text-[24px] font-medium text-[#202020] mb-[16px] tracking-[-0.5px] max-sm:text-[20px]">
                  5. Sharing Your Information
                </h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share information with
                  trusted service providers (such as Google Analytics) who assist us in operating our website, provided they
                  agree to keep your information confidential.
                </p>
              </div>

              <div>
                <h2 className="text-[24px] font-medium text-[#202020] mb-[16px] tracking-[-0.5px] max-sm:text-[20px]">
                  6. Data Security
                </h2>
                <p>
                  We implement appropriate technical and organisational measures to protect your personal information.
                  However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-[24px] font-medium text-[#202020] mb-[16px] tracking-[-0.5px] max-sm:text-[20px]">
                  7. Your Rights
                </h2>
                <p className="mb-[12px]">You have the right to:</p>
                <ul className="list-disc pl-[24px] flex flex-col gap-[8px]">
                  <li>Access the personal data we hold about you.</li>
                  <li>Request correction or deletion of your personal data.</li>
                  <li>Opt out of marketing communications at any time.</li>
                  <li>Withdraw consent for data processing where applicable.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-[24px] font-medium text-[#202020] mb-[16px] tracking-[-0.5px] max-sm:text-[20px]">
                  8. Third-Party Links
                </h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices
                  or content of those sites. We encourage you to read their privacy policies before providing any personal information.
                </p>
              </div>

              <div>
                <h2 className="text-[24px] font-medium text-[#202020] mb-[16px] tracking-[-0.5px] max-sm:text-[20px]">
                  9. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with a
                  revised &quot;Last updated&quot; date. We encourage you to review this page periodically.
                </p>
              </div>

              <div>
                <h2 className="text-[24px] font-medium text-[#202020] mb-[16px] tracking-[-0.5px] max-sm:text-[20px]">
                  10. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:connect@enlightencreatives.com" className="text-[#c96b00] underline hover:no-underline">
                    connect@enlightencreatives.com
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  )
}
