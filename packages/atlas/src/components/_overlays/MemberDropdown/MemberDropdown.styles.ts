import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { animated } from 'react-spring'

import { Avatar } from '@/components/Avatar'
import { Text } from '@/components/Text'
import { cVar, media, sizes, zIndex } from '@/styles'

const paddingStyles = css`
  padding: ${sizes(6)} ${sizes(4)};
`

export const Container = styled.div`
  position: fixed;
  right: ${sizes(4)};
  top: 0;
  width: 280px;
  height: 0;
  z-index: ${zIndex.nearTransactionBar};

  ${media.md} {
    right: ${sizes(8)};
  }
`

export const InnerContainer = styled.div<{ isActive: boolean; containerHeight: number }>`
  width: 280px;
  position: relative;
  max-height: calc(100vh - ${sizes(4)} - var(--size-topbar-height));
  height: ${({ containerHeight }) => containerHeight}px;
  transform: translateY(
    ${({ isActive, containerHeight }) =>
      isActive ? 'var(--size-topbar-height)' : `calc(-${containerHeight}px + var(--size-topbar-height)) `}
  );
  transition: transform ${cVar('animationTransitionMedium')}, height ${cVar('animationTransitionMedium')};
  will-change: height, transform;
  box-shadow: ${cVar('effectElevation24Layer2')}, ${cVar('effectElevation24Layer1')};
  border-radius: 0 0 ${cVar('radiusMedium')} ${cVar('radiusMedium')};
  background-color: ${cVar('colorBackgroundStrong')};
  overflow-y: auto;
  overflow-x: hidden;
`

export const StyledAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
`

export const BlurredBG = styled.div<{ url?: string | null }>`
  position: relative;
  width: 280px;
  height: 100%;

  &::before {
    position: absolute;
    width: inherit;
    height: inherit;
    background-image: url(${({ url }) => url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    content: '';
  }
`

export const Filter = styled.div`
  position: absolute;
  backdrop-filter: blur(32px);
  background: ${cVar('colorBackgroundOverlay')};
  width: 280px;
  height: 100%;
`

export const MemberInfoContainer = styled.div`
  position: relative;
  display: grid;
  gap: ${sizes(4)};
  ${paddingStyles}
`

export const MemberHandleText = styled(Text)`
  word-break: break-word;
`

export const SectionContainer = styled.div`
  border-top: 1px solid ${cVar('colorBorderMutedAlpha')};
  padding: ${sizes(2)} 0;
`

export const ChannelsSectionTitle = styled(Text)`
  padding: ${sizes(2)} ${sizes(4)};
  display: block;
`

export const SwitchMemberItemListContainer = styled.div`
  padding: ${sizes(2)} 0;
`

export const UserBalance = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
  align-items: center;
  gap: 5px;
  margin-top: ${sizes(2)};
`

export const BalanceContainer = styled.div`
  margin-top: ${sizes(1)};
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  gap: 8px;
`

export const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: ${cVar('colorBorderMutedAlpha')};
`

export const TextLink = styled(Text)`
  text-decoration: none;
  cursor: pointer;
  display: flex;

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-left: ${sizes(1)};

    path {
      fill: ${cVar('colorCoreNeutral200Lighten')};
    }
  }
`

export const AnimatedContainer = styled(animated.div, {
  shouldForwardProp: (prop) => prop !== 'isAnimatingSwitchMember',
})<{
  isAnimatingSwitchMember: boolean
}>`
  position: absolute;
  height: 100%;
  width: 280px;
  will-change: transform, opacity;
  overflow-y: ${({ isAnimatingSwitchMember }) => (isAnimatingSwitchMember ? 'hidden' : 'auto')};
  overflow-x: hidden;
`
