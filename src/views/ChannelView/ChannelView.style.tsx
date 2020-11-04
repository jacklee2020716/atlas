import styled from '@emotion/styled'
import { Avatar } from '@/shared/components'
import { fluidRange } from 'polished'
import theme from '@/shared/theme'

type ChannelHeaderProps = {
  coverPhotoURL: string | null
}
export const Header = styled.section<ChannelHeaderProps>`
  background-image: linear-gradient(0deg, #000000 10.85%, rgba(0, 0, 0, 0) 88.35%),
    ${(props) => `url(${props.coverPhotoURL})`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  height: 430px;
  padding: 0 ${theme.sizes.b8}px;
  margin: 0 -${theme.sizes.b8}px;
`
export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  padding-top: ${theme.sizes.b10}px;
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: start;
  }
`
export const Title = styled.h1`
  font-weight: bold;
  ${fluidRange({ prop: 'fontSize', fromSize: '34px', toSize: '40px' })};
  max-width: 320px;
  display: inline-block;
  margin: 0;
`

export const VideoSection = styled.section`
  margin-top: -100px;
`

export const StyledAvatar = styled(Avatar)`
  max-width: 136px;
  max-height: 136px;
  width: 136px;
  height: 136px;
  margin-right: ${theme.sizes.b6}px;
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 128px;
    height: 128px;
  }
`
