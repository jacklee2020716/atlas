import React, { useState, useRef, useEffect } from 'react'
import { css, SerializedStyles } from '@emotion/core'
import { animated, useSpring } from 'react-spring'
import useResizeObserver from 'use-resize-observer'
import { useCSS, CarouselStyleProps } from './Carousel.style'
import NavButton from '../NavButton'

type CarouselProps = {
  children: React.ReactNode
  containerCss: SerializedStyles
  leftControlCss: SerializedStyles
  rightControlCss: SerializedStyles
  onScroll: (direction: 'left' | 'right') => void
} & CarouselStyleProps

const Carousel: React.FC<Partial<CarouselProps>> = ({
  children,
  containerCss,
  leftControlCss,
  rightControlCss,
  onScroll = () => {},
}) => {
  const [scroll, setScroll] = useSpring(() => ({
    transform: `translateX(0px)`,
  }))
  const [x, setX] = useState(0)
  const { width: containerWidth = NaN, ref: containerRef } = useResizeObserver<HTMLDivElement>()
  const elementsRefs = useRef<(HTMLDivElement | null)[]>([])
  const [childrensWidth, setChildrensWidth] = useState(0)
  useEffect(() => {
    if (Array.isArray(children)) {
      elementsRefs.current = elementsRefs.current.slice(0, children.length)
      const childrensWidth = elementsRefs.current.reduce(
        (accWidth, el) => (el != null ? accWidth + el.clientWidth : accWidth),
        0
      )
      setChildrensWidth(childrensWidth)
    }
  }, [children])
  const styles = useCSS({})

  function handleScroll(direction: 'left' | 'right') {
    if (containerWidth == null) {
      return
    }
    let scrollAmount
    switch (direction) {
      case 'left': {
        // Prevent overscroll on the left
        scrollAmount = x + containerWidth >= 0 ? 0 : x + containerWidth
        onScroll('left')
        break
      }
      case 'right': {
        // Prevent overscroll on the right
        scrollAmount =
          x - containerWidth <= -(childrensWidth - containerWidth)
            ? -(childrensWidth - containerWidth)
            : x - containerWidth
        onScroll('right')
        break
      }
    }
    setX(scrollAmount)
    setScroll({
      transform: `translateX(${scrollAmount}px)`,
    })
  }

  if (!Array.isArray(children)) {
    return <>{children}</>
  }
  return (
    <div css={[styles.container, containerCss]}>
      <div css={styles.outerItemsContainer} ref={containerRef}>
        <animated.div style={scroll} css={styles.innerItemsContainer}>
          {children.map((element, idx) => (
            <div
              key={`Carousel-${idx}`}
              ref={(el) => {
                elementsRefs.current[idx] = el
                return el
              }}
            >
              {element}
            </div>
          ))}
        </animated.div>
      </div>
      <NavButton
        outerCss={[
          styles.navLeft,
          css`
            opacity: ${x === 0 ? 0 : 1};
          `,
          leftControlCss,
        ]}
        direction="left"
        onClick={() => {
          handleScroll('left')
        }}
      />
      <NavButton
        outerCss={[
          styles.navRight,
          css`
            opacity: ${x === -(childrensWidth - containerWidth) ? 0 : 1};
          `,
          rightControlCss,
        ]}
        direction="right"
        onClick={() => {
          handleScroll('right')
        }}
      />
    </div>
  )
}

export default Carousel
