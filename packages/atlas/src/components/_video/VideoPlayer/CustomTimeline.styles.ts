import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { Text } from '@/components/Text'
import { cVar, media, transitions, zIndex } from '@/styles'

import { CustomControls, TRANSITION_DELAY } from './VideoPlayer.styles'

type ProgressControlProps = {
  elevated?: boolean
  isScrubbing?: boolean
}

// expand ProgressControl area when scrubbing
const scrubbingStyles = (elevated?: boolean) => css`
  height: 100vh;
  bottom: ${elevated ? 0 : '-200px'};
  padding-bottom: ${elevated ? `1.5em 1.5em` : '200px'};
`

export const ProgressControl = styled.div<ProgressControlProps>`
  padding: ${({ elevated }) => (elevated ? `1.5em 1em` : `0`)};
  position: absolute;
  height: 1.5em;
  z-index: ${zIndex.nearOverlay};
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: flex-end;

  @media (hover: hover) {
    cursor: pointer;
    padding: ${({ elevated }) => (elevated ? `1.5em 1.5em` : `0`)};
    ${({ isScrubbing, elevated }) => isScrubbing && scrubbingStyles(elevated)};

    :hover ${() => SeekBar} {
      height: 0.5em;
    }
    :hover ${() => PlayProgressThumb} {
      opacity: 1;
    }
    :hover ${() => MouseDisplayWrapper} {
      opacity: 1;
    }
    :hover ${() => MouseDisplayTooltip} {
      transform: translateY(-0.5em);
      opacity: 1;
    }
    :hover ~ ${CustomControls} {
      opacity: 0;
      transform: translateY(0.5em);
    }
  }

  :active {
    ${() => PlayProgressThumb} {
      ${({ isScrubbing }) => isScrubbing && `opacity: 1;`}
    }
  }

  ${() => MouseDisplayWrapper}, ${() => PlayProgressThumb} {
    ${({ isScrubbing }) => isScrubbing && `opacity: 1;`}
  }
  ${() => MouseDisplayTooltip} {
    ${({ isScrubbing }) => isScrubbing && `transform: translateY(-0.5em); opacity: 1;`}
  }
  ${() => SeekBar} {
    ${({ isScrubbing }) => isScrubbing && `height: 0.5em;`}
  }
  ~ ${CustomControls} {
    ${({ isScrubbing }) => isScrubbing && `opacity: 0; transform: translateY(0.5em);`}
  }
`

export const SeekBar = styled.div`
  position: relative;
  width: 100%;
  background-color: ${cVar('colorCoreNeutral400Lighten')};
  transition: height ${transitions.timings.player} ${TRANSITION_DELAY} ${transitions.easing};
  height: 0.5em;
  ${media.xs} {
    height: 0.25em;
  }
`

export const LoadProgress = styled.div`
  height: 100%;
  background-color: ${cVar('colorCoreNeutral400Lighten')};
`

export const MouseDisplayWrapper = styled.div`
  width: 100%;
  opacity: 0;
  transition: opacity 200ms ${transitions.easing};
`

export const MouseDisplay = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  background-color: ${cVar('colorCoreNeutral400Lighten')};
`

type MouseDisplayTooltipProps = {
  elevated?: boolean
}

export const MouseDisplayTooltip = styled.div<MouseDisplayTooltipProps>`
  pointer-events: none;
  user-select: none;
  opacity: 0;
  position: absolute;
  padding: ${({ elevated }) => (elevated ? `0` : `0 1em`)};
  bottom: 1.5em;
  transition: transform ${transitions.timings.player} ${TRANSITION_DELAY} ${transitions.easing},
    opacity ${transitions.timings.player} ${TRANSITION_DELAY} ${transitions.easing};
`

export const StyledTooltipText = styled(Text)`
  /* 14px */
  font-size: 0.875em;
  pointer-events: none;
  text-shadow: ${cVar('effectElevation1Layer1')};
  font-feature-settings: 'tnum' on, 'lnum' on;
`

export const PlayProgressWrapper = styled.div`
  width: 100%;
`

export const PlayProgress = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  background-color: ${cVar('colorCoreBlue500')};
  z-index: 1;
`

export const PlayProgressThumb = styled.button`
  border: none;
  opacity: 0;
  z-index: 1;
  content: '';
  padding: 0;
  position: absolute;
  box-shadow: ${cVar('effectElevation1Layer1')};
  border-radius: 100%;
  background: ${cVar('colorCoreBaseWhite')};
  transition: opacity ${transitions.timings.player} ${TRANSITION_DELAY} ${transitions.easing};
  top: -0.75em;
  height: 2em;
  width: 2em;
  ${media.xs} {
    cursor: pointer;
    top: -0.25em;
    height: 1em;
    width: 1em;
  }
`
