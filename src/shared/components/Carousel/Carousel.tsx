import React, { useState, useLayoutEffect, useRef } from 'react'
import { GliderProps, GliderMethods } from 'react-glider'

import { Container, StyledGlider, Arrow } from './Carousel.style'

import 'glider-js/glider.min.css'

type CarouselProps = {
  trackPadding?: string
} & GliderProps

type TrackProps = {
  className?: string
  padding?: string
}
const Track: React.FC<TrackProps> = ({ className = '', ...props }) => (
  <div className={`glider-track ${className}`} {...props} />
)

const RightArrow = <Arrow name="chevron-right" />
const LeftArrow = <Arrow name="chevron-left" />

const Carousel: React.FC<CarouselProps> = ({
  children,
  trackPadding = '0',
  className,
  itemWidth = 300,
  slidesToShow = 'auto',
  ...gliderProps
}) => {
  //  The GliderMethods type only has methods and I need the full instance
  const gliderRef = useRef<GliderMethods & { ele: HTMLDivElement }>()
  const [arrows, setArrows] = useState<{ prev: HTMLButtonElement; next: HTMLButtonElement } | undefined>(undefined)

  useLayoutEffect(() => {
    if (gliderRef.current) {
      const glider = gliderRef.current.ele
      const prevArrow = glider.previousSibling as HTMLButtonElement
      const nextArrow = glider.nextSibling as HTMLButtonElement

      setArrows({ prev: prevArrow, next: nextArrow })
    }
  }, [])

  // This is needed because react-glider will render arrows only if the arrows option is undefined, so arrows won't display if you pass an object to StyledGlider
  React.useLayoutEffect(() => {
    if (gliderRef.current && arrows) {
      const { prev: prevArrow, next: nextArrow } = arrows
      const container = gliderRef.current.ele.parentElement
      if (container) {
        container.insertBefore(prevArrow, gliderRef.current.ele)
        container.appendChild(nextArrow)
      }
    }
  }, [arrows])

  return (
    <Container trackPadding={trackPadding} className={className}>
      <StyledGlider
        addTrack
        skipTrack
        hasArrows
        draggable
        ref={gliderRef as React.RefObject<GliderMethods>}
        iconLeft={LeftArrow}
        iconRight={RightArrow}
        itemWidth={itemWidth}
        slidesToShow={slidesToShow}
        // Akward conversion needed until this is resolved: https://github.com/hipstersmoothie/react-glider/issues/36
        arrows={(arrows as unknown) as { prev: string; next: string }}
        {...gliderProps}
      >
        <Track padding={trackPadding}>{children}</Track>
      </StyledGlider>
    </Container>
  )
}
export default Carousel
