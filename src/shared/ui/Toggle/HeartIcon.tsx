export interface HeartIconProps {
  filled: boolean
}

export function HeartIcon({ filled }: HeartIconProps) {
  if (filled) {
    return (
      <svg width="20" height="18" viewBox="0 0 24 24" fill="#abd27a" aria-hidden="true">
        <path d="M11.645 20.91a.75.75 0 00.71 0C12.7 20.7 22 15.665 22 8.735 22 5.5 19.373 3 16.25 3c-1.86 0-3.505.94-4.5 2.393C10.755 3.94 9.11 3 7.25 3 4.127 3 1.5 5.5 1.5 8.735c0 6.93 9.3 11.965 9.645 12.175z" />
      </svg>
    )
  }

  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#253017"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11.645 20.91a.75.75 0 00.71 0C12.7 20.7 22 15.665 22 8.735 22 5.5 19.373 3 16.25 3c-1.86 0-3.505.94-4.5 2.393C10.755 3.94 9.11 3 7.25 3 4.127 3 1.5 5.5 1.5 8.735c0 6.93 9.3 11.965 9.645 12.175z" />
    </svg>
  )
}
