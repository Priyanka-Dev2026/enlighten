import RevealText from '@components/ui/RevealText'
import MagneticButton from '@components/ui/MagneticButton'

export default function Contact() {
  return (
    <section id="contact" className="px-8 py-32">
      <div className="mx-auto max-w-5xl text-center">
        <RevealText as="h2" className="text-[clamp(2rem,6vw,5rem)] font-medium leading-tight">
          Let&apos;s work together
        </RevealText>
        <div className="mt-12">
          <MagneticButton>
            <a
              href="mailto:hello@enlighten.studio"
              className="inline-block rounded-full border border-white/20 px-10 py-4 text-sm uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
            >
              Get in Touch
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
