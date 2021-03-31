import { ReactComponent as UnstyledFullLogo } from '@/assets/full-logo.svg'
import { Text } from '@/shared/components'
import { breakpoints, colors, sizes, transitions, typography, zIndex } from '@/shared/theme'
import isPropValid from '@emotion/is-prop-valid'
import styled from '@emotion/styled'
import { Link, LinkProps } from 'react-router-dom'

export const EXPANDED_SIDENAVBAR_WIDTH = 360
export const NAVBAR_LEFT_PADDING = 24

type ExpandableElementProps = {
  expanded?: boolean
}

type SidebarNavProps = {
  isStudio?: boolean
} & ExpandableElementProps

type SubItemProps = {
  subitemsHeight?: number
} & ExpandableElementProps

type SidebarNavLinkProps = {
  content: string
} & SidebarNavProps &
  LinkProps

export const SidebarNav = styled.nav<SidebarNavProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: ${zIndex.header};
  width: ${({ expanded }) => (expanded ? `${EXPANDED_SIDENAVBAR_WIDTH}px` : 'var(--sidenav-collapsed-width)')};
  transition: width ${transitions.timings.regular} ${transitions.easing};

  display: grid;
  grid-template-rows: auto auto 1fr auto;

  overflow: hidden;
  color: ${colors.white};
  background-color: ${({ isStudio }) => (isStudio ? colors.gray[800] : colors.gray[700])};
`

export const LogoLink = styled(Link)`
  display: flex;
  margin-top: 24px;
  margin-left: 80px;
  text-decoration: none;
  @media screen and (min-width: ${breakpoints.medium}) {
    margin-left: 86px;
  }
`

export const Logo = styled(UnstyledFullLogo)`
  height: ${sizes(8)};
`

export const StudioText = styled(Text)`
  color: ${colors.gray[300]};
  font-family: ${typography.fonts.headers};
  margin-left: 6px;
`

export const SidebarNavList = styled.ul`
  margin-top: 56px;
  list-style: none;
  width: ${EXPANDED_SIDENAVBAR_WIDTH}px;
  padding: 0;
`

export const SidebarNavFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${NAVBAR_LEFT_PADDING}px;
`

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  button {
    margin-top: ${sizes(4)};
  }
`

export const SidebarNavItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const SidebarNavLink = styled(Link, { shouldForwardProp: isPropValid })<SidebarNavLinkProps>`
  padding: ${sizes(5)} ${NAVBAR_LEFT_PADDING}px;
  color: ${colors.white};
  text-decoration: none;
  display: flex;
  position: relative;
  align-items: center;
  &:hover {
    background-color: ${({ isStudio }) => (isStudio ? colors.transparentWhite[4] : 'rgba(0, 0, 0, 0.12)')};
  }
  &:focus {
    background-color: ${({ isStudio }) => (isStudio ? colors.transparentWhite[6] : colors.transparentBlack[24])};
  }
  &:active {
    background-color: ${({ isStudio }) => (isStudio ? colors.transparentWhite[32] : colors.transparentBlack[54])};
  }
  > svg {
    @media screen and (min-width: ${breakpoints.medium}) {
      transform: translateY(${({ expanded }) => (expanded ? 0 : -8)}px);
      transition: transform ${transitions.timings.regular} ${transitions.easing};
    }
  }
  > span {
    margin-left: ${sizes(8)};
    font-weight: bold;
    font-family: ${typography.fonts.headers};
    font-size: ${typography.sizes.h5};
    line-height: 1;
  }
  &[data-active='true'] {
    background-color: ${({ isStudio }) => (isStudio ? colors.transparentWhite[6] : colors.transparentBlack[24])};
  }
  :after {
    @media screen and (min-width: ${breakpoints.medium}) {
      content: ${({ content }) => `'${content}'`};
      position: absolute;
      font-size: 12px;
      color: white;
      transition: opacity ${transitions.timings.regular} ${transitions.easing};
      opacity: ${({ expanded }) => (expanded ? 0 : 1)};
      left: calc(var(--sidenav-collapsed-width) / 2);
      transform: translateX(-50%);
      bottom: 0;
      margin-bottom: 10px;
    }
  }
`

export const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${zIndex.header};
  background-color: rgba(0, 0, 0, 0.5);
`
export const SubItemsWrapper = styled.div<SubItemProps>`
  padding-left: calc(${typography.sizes.icon.xlarge} + ${sizes(8)});
  transition: height ${transitions.timings.regular} ${transitions.easing};
  overflow: hidden;
  height: ${({ expanded, subitemsHeight }) => (expanded ? subitemsHeight || 0 : 0)}px;
  > ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    list-style: none;
  }
`

export const SubItem = styled.li`
  font-size: ${typography.sizes.body2};
  font-family: ${typography.fonts.base};
  margin-top: ${sizes(8)};
  :first-of-type {
    margin-top: ${sizes(6)};
  }
`

export const LegalLink = styled(Link)`
  margin-top: ${sizes(8)};
  padding: ${sizes(4)} 0 ${sizes(6)};
  color: ${colors.gray[300]};
  text-decoration: none;
  font-family: ${typography.fonts.headers};
  font-size: ${typography.sizes.subtitle2};
  border-top: 1px solid ${colors.gray[300]};
  &:hover {
    color: ${colors.gray[400]};
  }
  &:focus {
    color: ${colors.gray[400]};
  }
  &:active {
    color: ${colors.gray[500]};
  }
`
