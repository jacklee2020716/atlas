import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { absoluteRoutes } from '@/config/routes'
import { AssetType, useAsset } from '@/providers/assets'
import { Button } from '@/shared/components/Button'
import { GridItem, LayoutGrid } from '@/shared/components/LayoutGrid'
import { SkeletonLoader } from '@/shared/components/SkeletonLoader'
import { VideoPlayer } from '@/shared/components/VideoPlayer'
import { SvgActionPlay } from '@/shared/icons/ActionPlay'
import { SvgActionSoundOff } from '@/shared/icons/ActionSoundOff'
import { SvgActionSoundOn } from '@/shared/icons/ActionSoundOn'

import {
  ButtonsContainer,
  ButtonsSpaceKeeper,
  Container,
  GradientOverlay,
  InfoContainer,
  Media,
  MediaWrapper,
  PlayerContainer,
  SoundButton,
  StyledChannelLink,
  Title,
  TitleContainer,
  TitleSkeletonLoader,
} from './VideoHero.style'
import { useVideoHero } from './VideoHeroData'

const VIDEO_PLAYBACK_DELAY = 1250

export const VideoHero: React.FC = () => {
  const coverVideo = useVideoHero()

  const [videoPlaying, setVideoPlaying] = useState(false)
  const [soundMuted, setSoundMuted] = useState(true)
  const { url: thumbnailPhotoUrl } = useAsset({
    entity: coverVideo?.video,
    assetType: AssetType.THUMBNAIL,
  })

  const handlePlaybackDataLoaded = () => {
    setTimeout(() => {
      setVideoPlaying(true)
    }, VIDEO_PLAYBACK_DELAY)
  }

  const handleSoundToggleClick = () => {
    setSoundMuted(!soundMuted)
  }

  return (
    <Container>
      <MediaWrapper>
        <Media>
          <PlayerContainer>
            {coverVideo && (
              <VideoPlayer
                videoStyle={{ objectFit: 'cover' }}
                fluid
                isInBackground
                muted={soundMuted}
                playing={videoPlaying}
                posterUrl={thumbnailPhotoUrl}
                onDataLoaded={handlePlaybackDataLoaded}
                onPlay={() => setVideoPlaying(true)}
                onPause={() => setVideoPlaying(false)}
                onEnd={() => setVideoPlaying(false)}
                src={coverVideo?.coverCutMediaUrl}
              />
            )}
          </PlayerContainer>
          <GradientOverlay />
        </Media>
      </MediaWrapper>
      <InfoContainer isLoading={!coverVideo}>
        <StyledChannelLink
          variant="secondary"
          id={coverVideo?.video.channel.id}
          overrideChannel={coverVideo?.video.channel}
          avatarSize="small"
        />
        <LayoutGrid>
          <GridItem colSpan={{ base: 12, compact: 10, small: 8, medium: 5, xlarge: 4, xxlarge: 3 }}>
            <TitleContainer>
              {coverVideo ? (
                <>
                  <Link to={absoluteRoutes.viewer.video(coverVideo.video.id)}>
                    <Title variant="h2">{coverVideo.coverTitle}</Title>
                  </Link>
                </>
              ) : (
                <>
                  <TitleSkeletonLoader width={380} height={60} />
                  <SkeletonLoader width={300} height={20} bottomSpace={4} />
                  <SkeletonLoader width={200} height={20} />
                </>
              )}
            </TitleContainer>
          </GridItem>
        </LayoutGrid>
        <ButtonsSpaceKeeper>
          {coverVideo && (
            <ButtonsContainer>
              <Button
                size="large"
                to={absoluteRoutes.viewer.video(coverVideo ? coverVideo.video.id : '')}
                icon={<SvgActionPlay />}
              >
                Play
              </Button>
              <SoundButton size="large" variant="secondary" onClick={handleSoundToggleClick}>
                {!soundMuted ? <SvgActionSoundOn /> : <SvgActionSoundOff />}
              </SoundButton>
            </ButtonsContainer>
          )}
        </ButtonsSpaceKeeper>
      </InfoContainer>
    </Container>
  )
}
