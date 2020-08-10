/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFeaturedVideos
// ====================================================

export interface GetFeaturedVideos_featured_videos_media_location {
  __typename: 'HTTPVideoMediaLocation'
  host: string
  port: number | null
}

export interface GetFeaturedVideos_featured_videos_media {
  __typename: 'VideoMedia'
  location: GetFeaturedVideos_featured_videos_media_location
}

export interface GetFeaturedVideos_featured_videos_channel {
  __typename: 'Channel'
  id: string
  avatarPhotoURL: string
  handle: string
}

export interface GetFeaturedVideos_featured_videos {
  __typename: 'Video'
  id: string
  title: string
  description: string
  views: number
  duration: number
  thumbnailURL: string
  publishedOnJoystreamAt: GQLDate
  media: GetFeaturedVideos_featured_videos_media
  channel: GetFeaturedVideos_featured_videos_channel
}

export interface GetFeaturedVideos {
  featured_videos: GetFeaturedVideos_featured_videos[]
}
