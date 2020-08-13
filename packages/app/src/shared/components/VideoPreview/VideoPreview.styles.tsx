import styled from '@emotion/styled'
import { colors, spacing, typography } from '../../theme'
import Avatar from '../Avatar'
import { PlayIcon } from '../../icons'
import { HOVER_BORDER_SIZE } from './VideoPreviewBase.styles'

type CoverImageProps = Record<string, unknown>

type ChannelProps = {
  channelClickable: boolean
}

export const CoverImage = styled.img<CoverImageProps>`
  width: 100%;
  height: 100%;
  background: linear-gradient(${colors.gray[300]}, ${colors.gray[700]});
  background-size: cover;
  object-fit: cover;
`

export const CoverHoverOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;

  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  border: ${HOVER_BORDER_SIZE} solid ${colors.white};
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);

  display: flex;
  justify-content: center;
  align-items: center;
`

export const CoverPlayIcon = styled(PlayIcon)`
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: translateY(40px);
  width: 54px;
  height: 54px;
`

export const ProgressOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${spacing.xxs};
  background-color: ${colors.white};
`

export const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 0;
  background-color: ${colors.blue['500']};
`

export const CoverDurationOverlay = styled.div`
  position: absolute;
  bottom: ${spacing.xs};
  right: ${spacing.xs};
  padding: ${spacing.xxs} ${spacing.xs};
  background-color: ${colors.black};
  color: ${colors.white};
  font-size: ${typography.sizes.body2};
`

export const StyledAvatar = styled(Avatar)<ChannelProps>`
  width: 100%;
  height: 100%;
  cursor: ${({ channelClickable }) => (channelClickable ? 'pointer' : 'auto')};
`

export const TitleHeader = styled.h3`
  margin: 0;
  font-weight: ${typography.weights.bold};
  font-size: ${typography.sizes.h6};
  line-height: 1.25rem;
  color: ${colors.white};
  display: inline-block;
`

export const ChannelName = styled.span<ChannelProps>`
  font-size: ${typography.sizes.subtitle2};
  line-height: 1.25rem;
  display: inline-block;
  cursor: ${({ channelClickable }) => (channelClickable ? 'pointer' : 'auto')};
`

export const MetaText = styled.span`
  font-size: ${typography.sizes.subtitle2};
`
