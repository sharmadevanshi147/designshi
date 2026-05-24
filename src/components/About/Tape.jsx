/**
 * Tape — single centred pennant-flag strip that sits straddling
 * the top edge of the About card (matching the Figma screenshot).
 * White/cream fill, very subtle, no rotation.
 */
export default function Tape({ className = '' }) {
  return (
    <svg
      width="88"
      height="54"
      viewBox="0 0 88 54"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {/* Pennant shape: rectangle top, V-point at bottom */}
      <path
        d="M 2,0 L 86,0 L 86,38 L 44,54 L 2,38 Z"
        fill="rgba(245, 242, 236, 0.96)"
        stroke="rgba(200,192,178,0.35)"
        strokeWidth="0.8"
      />
      {/* Subtle top highlight */}
      <line
        x1="4" y1="1.5" x2="84" y2="1.5"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
      />
    </svg>
  )
}
