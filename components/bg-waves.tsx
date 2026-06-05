export function BgWaves() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[1] h-[60vh] overflow-hidden" aria-hidden>
      <svg viewBox="0 0 1440 600" fill="none" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
        <path
          d="M0 420C240 340 480 480 720 400C960 320 1200 460 1440 380L1440 600L0 600Z"
          fill="#3B1E4D"
          opacity="0.2"
          filter="url(#wave-blur)"
        />
        <path
          d="M0 460C200 380 440 520 720 440C1000 360 1240 480 1440 420L1440 600L0 600Z"
          fill="#6E4A7E"
          opacity="0.15"
          filter="url(#wave-blur)"
        />
        <path
          d="M0 500C300 440 600 540 900 480C1200 420 1350 520 1440 470L1440 600L0 600Z"
          fill="#3B1E4D"
          opacity="0.25"
          filter="url(#wave-blur)"
        />
        <path
          d="M0 530C180 490 420 560 720 510C1020 460 1260 540 1440 500L1440 600L0 600Z"
          fill="#6E4A7E"
          opacity="0.18"
          filter="url(#wave-blur2)"
        />
        <defs>
          <filter id="wave-blur"><feGaussianBlur stdDeviation="30" /></filter>
          <filter id="wave-blur2"><feGaussianBlur stdDeviation="50" /></filter>
        </defs>
      </svg>
    </div>
  )
}
