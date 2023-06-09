import { FC } from 'react'

import { Tooltip, TooltipProps } from '@/components/Tooltip'
import { isMobile } from '@/utils/browser'

import { IconWrapper, InformationWrapper, StyledSvgActionInformative, TouchableWrapper } from './Information.styles'

export type InformationProps = TooltipProps & {
  className?: string
}

export const Information: FC<InformationProps> = ({ className, ...tooltipProps }) => {
  return (
    <InformationWrapper>
      <Tooltip {...tooltipProps} offsetY={8} offsetX={8} hideOnClick={false}>
        <TouchableWrapper
          onClick={(event) => {
            if (isMobile()) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          isMobile={isMobile()}
        >
          <IconWrapper className={className}>
            <StyledSvgActionInformative />
          </IconWrapper>
        </TouchableWrapper>
      </Tooltip>
    </InformationWrapper>
  )
}
