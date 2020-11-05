import React from 'react'
import styled from '@emotion/styled'
import useResizeObserver from 'use-resize-observer'
import { spacing, breakpoints } from '../../theme'

const toPx = (n: number | string) => (typeof n === 'number' ? `${n}px` : n)

type ContainerProps = Required<Pick<GridProps, 'gap' | 'maxColumns' | 'minWidth' | 'repeat'>>

const Container = styled.div<ContainerProps>`
  display: grid;
  gap: ${(props) => toPx(props.gap)};
  grid-template-columns: repeat(
    auto-${(props) => props.repeat},
    minmax(min(${(props) => toPx(props.minWidth)}, 100%), 1fr)
  );
  @media (min-width: ${toPx(breakpoints.xlarge)}) {
    grid-template-columns: repeat(${(props) => props.maxColumns}, 1fr);
  }
`

type GridProps = {
  gap?: number | string
  className?: string
  maxColumns?: number
  minWidth?: number | string
  repeat?: 'fit' | 'fill'
  onResize?: (sizes: number[]) => void
}

const Grid: React.FC<GridProps> = ({
  className,
  gap = spacing.xl,
  onResize,
  repeat = 'fit',
  maxColumns = 6,
  minWidth = 300,
  ...props
}) => {
  const { ref: gridRef } = useResizeObserver<HTMLDivElement>({
    onResize: () => {
      if (onResize && gridRef.current) {
        const computedStyles = window.getComputedStyle(gridRef.current)
        const columnSizes = computedStyles.gridTemplateColumns.split(' ').map(parseFloat)
        onResize(columnSizes)
      }
    },
  })

  return (
    <Container
      {...props}
      className={className}
      ref={gridRef}
      gap={gap}
      minWidth={minWidth}
      maxColumns={maxColumns}
      repeat={repeat}
    />
  )
}

type BreakpointsToMatchGridArg = {
  breakpoints: number
  minItemWidth: number
  gridColumnGap?: number
  viewportContainerDifference?: number
}
//  This will generate the Array of breakpoints at which the Grid adds one element
export function breakpointsOfGrid({
  breakpoints = 0,
  minItemWidth,
  gridColumnGap = 0,
  viewportContainerDifference = 0,
}: BreakpointsToMatchGridArg) {
  return Array(breakpoints)
    .fill(null)
    .map((_, n) => (n + 1) * minItemWidth + n * gridColumnGap + viewportContainerDifference)
}

export default Grid
