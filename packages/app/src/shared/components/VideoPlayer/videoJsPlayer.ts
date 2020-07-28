import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import { RefObject, useEffect, useRef, useState } from 'react'
import 'video.js/dist/video-js.css'

export type VideoJsConfig = {
  src: string
  width?: number
  height?: number
  fluid?: boolean
  fill?: boolean
}

type VideoJsPlayerHook = (config: VideoJsConfig) => [VideoJsPlayer | null, RefObject<HTMLVideoElement>]
export const useVideoJsPlayer: VideoJsPlayerHook = ({ fill, fluid, height, src, width }) => {
  const playerRef = useRef<HTMLVideoElement>(null)
  const [player, setPlayer] = useState<VideoJsPlayer | null>(null)

  useEffect(() => {
    const videoJsOptions: VideoJsPlayerOptions = {
      controls: true,
    }

    const playerInstance = videojs(playerRef.current, videoJsOptions)
    setPlayer(playerInstance)

    return () => {
      playerInstance.dispose()
    }
  }, [])

  useEffect(() => {
    if (!player) {
      return
    }

    player.src({
      src,
      type: 'video/mp4',
    })
  }, [player, src])

  useEffect(() => {
    if (!player || !width) {
      return
    }

    player.width(width)
  }, [player, width])

  useEffect(() => {
    if (!player || !height) {
      return
    }

    player.height(height)
  }, [player, height])

  useEffect(() => {
    if (!player) {
      return
    }

    player.fluid(Boolean(fluid))
  }, [player, fluid])

  useEffect(() => {
    if (!player) {
      return
    }

    // @ts-ignore @types/video.js is outdated and doesn't provide types for some newer video.js features
    player.fill(Boolean(fill))
  }, [player, fill])

  return [player, playerRef]
}
