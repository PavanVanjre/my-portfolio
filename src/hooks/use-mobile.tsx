import * as React from "react"

const MOBILE_BREAKPOINT = 1024
const EXTRA_LARGE_BREAKPOINT = 1680

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsExtraLarge() {
  const [isExtraLarge, setIsExtraLarge] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${EXTRA_LARGE_BREAKPOINT}px)`)
    const onChange = () => {
      setIsExtraLarge(window.innerWidth >= EXTRA_LARGE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsExtraLarge(window.innerWidth >= EXTRA_LARGE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isExtraLarge
}
