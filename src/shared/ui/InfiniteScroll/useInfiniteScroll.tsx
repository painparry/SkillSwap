import { useCallback, useEffect, useRef } from 'react'

interface UseInfiniteScrollParams {
  onLoadMore: () => void
  hasMore: boolean
  isEnabled?: boolean
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

export const useInfiniteScroll = ({
  onLoadMore,
  hasMore,
  isEnabled = true,
  root = null,
  rootMargin = '100px',
  threshold = 0.1,
}: UseInfiniteScrollParams) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const targetRef = useRef<Element | null>(null)

  const disconnectObserver = useCallback(() => {
    observerRef.current?.disconnect()
    observerRef.current = null
  }, [])

  const setupObserver = useCallback(() => {
    const element = targetRef.current

    disconnectObserver()

    if (!element || !isEnabled || !hasMore) return
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) onLoadMore()
      },
      { root, rootMargin, threshold },
    )

    observer.observe(element)
    observerRef.current = observer
  }, [isEnabled, hasMore, root, rootMargin, threshold, onLoadMore])

  useEffect(() => {
    if (targetRef.current) {
      setupObserver()
    }
  }, [hasMore, isEnabled, setupObserver])

  const refCallback = useCallback(
    (node: Element | null) => {
      if (targetRef.current === node) return
      targetRef.current = node
      disconnectObserver()
      if (node) setupObserver()
    },
    [disconnectObserver, setupObserver],
  )

  useEffect(() => () => disconnectObserver(), [disconnectObserver])
  return refCallback
}
