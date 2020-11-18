import React, { useRef } from 'react'

import { useGlider, GliderProps } from '../Glider'

import { Container, GliderContainer, Arrow, Track } from './Carousel.style'

type CarouselProps = {
  trackPadding?: string
  className?: string
} & GliderProps

const Carousel: React.FC<CarouselProps> = ({
  children,
  trackPadding = '0',
  className = '',
  slidesToShow = 'auto',
  ...gliderOptions
}) => {
  const nextArrowRef = useRef<HTMLButtonElement>(null)
  const prevArrowRef = useRef<HTMLButtonElement>(null)
  const { ref, getContainerProps, getGliderProps, getTrackProps, getPrevArrowProps, getNextArrowProps } = useGlider<
    HTMLDivElement
  >({
    slidesToShow,
    arrows: { prev: prevArrowRef.current, next: nextArrowRef.current },
    ...gliderOptions,
  })
  return (
    <Container {...getContainerProps({ className })}>
      <Arrow {...getPrevArrowProps<React.ComponentProps<typeof Arrow>>({ icon: 'chevron-left' })} ref={prevArrowRef} />
      <GliderContainer {...getGliderProps()} ref={ref}>
        <Track {...getTrackProps({ trackPadding })}>{children}</Track>
      </GliderContainer>
      <Arrow {...getNextArrowProps<React.ComponentProps<typeof Arrow>>({ icon: 'chevron-right' })} ref={nextArrowRef} />
    </Container>
  )
}
export default Carousel
