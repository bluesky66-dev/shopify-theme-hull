import React, { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import cx from 'classnames'

import { useSiteContext } from '@lib/context'

const CursorFollow = ({ cursorContent, children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: null, y: null })

  const { isHovering } = useSiteContext()

  const onMouseEnter = useCallback(() => setIsVisible(true), [])
  const onMouseLeave = useCallback(() => setIsVisible(false), [])
  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY })
  }, [])

  useEffect(() => {
    if (!isVisible) {
      setCoords({ x: null, y: null })
    }
  }, [isVisible])

  return (
    <m.div
      onHoverStart={onMouseEnter}
      onHoverEnd={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      {children}
      <AnimatePresence exitBeforeEnter>
        {isVisible && coords.x !== null && (
          <m.div
            initial={{ x: coords.x, y: coords.y, opacity: 0, scale: 0.6 }}
            animate={{
              x: coords.x,
              y: coords.y,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.19, 1.0, 0.22, 1.0],
              opacity: {
                duration: 0.2,
                ease: 'linear',
              },
              scale: {
                duration: 0.3,
              },
            }}
            className={cx('cursor', { 'is-hovering': isHovering })}
          >
            <div className="cursor--content">{cursorContent}</div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}

export default CursorFollow
