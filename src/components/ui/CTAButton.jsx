/**
 * Reusable CTA button with the same hover animation as the Navbar.
 *
 * Props:
 *  - label: button text (string)
 *  - variant: 'light' | 'dark' (default 'light')
 *    light = semi-transparent white bg + white arrow (for dark sections)
 *    dark  = semi-transparent black bg + dark arrow (for light sections)
 *  - href: optional link destination
 *  - className: extra classes on wrapper
 */
export default function CTAButton({ label, variant = 'light', href, className = '' }) {
  const isLight = variant === 'light'

  const pillBg = isLight
    ? 'bg-[rgba(242,242,242,0.15)]'
    : 'bg-[rgba(0,0,0,0.58)]'

  const circleBg = isLight
    ? 'bg-[rgba(242,242,242,0.15)]'
    : 'bg-[rgba(0,0,0,0.58)]'

  const arrowColor = 'currentColor'

  const Tag = href ? 'a' : 'div'
  const linkProps = href ? { href } : {}

  return (
    <Tag
      {...linkProps}
      className={`group flex items-center cursor-pointer ${className}`}
      data-cursor-hover
    >
      {/* Pill label with text slide animation */}
      <span
        className={`${pillBg} rounded-[36px] px-[20px] h-[50px] flex items-center backdrop-blur-[1.95px]`}
      >
        <span
          className="relative block overflow-hidden text-[16px] uppercase tracking-[0.8px] text-white"
          style={{ fontFamily: "'Mylius Modern', sans-serif" }}
        >
          <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
            {label}
          </span>
          <span
            className="absolute left-0 top-full block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
            aria-hidden="true"
          >
            {label}
          </span>
        </span>
      </span>

      {/* Arrow circle with diagonal slide animation */}
      <span
        className={`${circleBg} size-[50px] shrink-0 rounded-full backdrop-blur-[1.95px] flex items-center justify-center text-white`}
      >
        <span className="relative block size-[12px] overflow-hidden">
          <svg
            className="absolute inset-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:-translate-x-full"
            width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.25 0.625V8.75C11.25 8.91576 11.1842 9.07473 11.0669 9.19194C10.9497 9.30915 10.7908 9.375 10.625 9.375C10.4592 9.375 10.3003 9.30915 10.1831 9.19194C10.0658 9.07473 10 8.91576 10 8.75V2.13363L1.06719 11.0672C0.949877 11.1845 0.790937 11.2503 0.625 11.2503C0.459063 11.2503 0.300123 11.1845 0.182812 11.0672C0.065502 10.9499 -0.000305176 10.7909 -0.000305176 10.625C-0.000305176 10.4591 0.065502 10.3001 0.182812 10.1828L9.11637 1.25H2.5C2.33424 1.25 2.17527 1.18415 2.05806 1.06694C1.94085 0.949731 1.875 0.790761 1.875 0.625C1.875 0.459239 1.94085 0.300269 2.05806 0.183058C2.17527 0.065848 2.33424 0 2.5 0H10.625C10.7908 0 10.9497 0.065848 11.0669 0.183058C11.1842 0.300269 11.25 0.459239 11.25 0.625Z" fill={arrowColor} />
          </svg>
          <svg
            className="absolute inset-0 translate-y-full translate-x-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-hover:translate-x-0"
            width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M11.25 0.625V8.75C11.25 8.91576 11.1842 9.07473 11.0669 9.19194C10.9497 9.30915 10.7908 9.375 10.625 9.375C10.4592 9.375 10.3003 9.30915 10.1831 9.19194C10.0658 9.07473 10 8.91576 10 8.75V2.13363L1.06719 11.0672C0.949877 11.1845 0.790937 11.2503 0.625 11.2503C0.459063 11.2503 0.300123 11.1845 0.182812 11.0672C0.065502 10.9499 -0.000305176 10.7909 -0.000305176 10.625C-0.000305176 10.4591 0.065502 10.3001 0.182812 10.1828L9.11637 1.25H2.5C2.33424 1.25 2.17527 1.18415 2.05806 1.06694C1.94085 0.949731 1.875 0.790761 1.875 0.625C1.875 0.459239 1.94085 0.300269 2.05806 0.183058C2.17527 0.065848 2.33424 0 2.5 0H10.625C10.7908 0 10.9497 0.065848 11.0669 0.183058C11.1842 0.300269 11.25 0.459239 11.25 0.625Z" fill={arrowColor} />
          </svg>
        </span>
      </span>
    </Tag>
  )
}
