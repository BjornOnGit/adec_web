const Logo = ({ className }) => {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#1A365D" />
        <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="#F59E0B" strokeWidth="4" />
        <path d="M40,20 L40,80" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <path d="M60,20 L60,80" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <path d="M20,40 L80,40" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <path d="M20,60 L80,60" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="50" r="10" fill="#F59E0B" />
      </svg>
    )
  }
  
  export default Logo
  