/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetChannel
// ====================================================

export interface GetChannel_channel_videos_media_location_HTTPVideoMediaLocation {
  __typename: "HTTPVideoMediaLocation";
  host: string;
  port: number | null;
}

export interface GetChannel_channel_videos_media_location_JoystreamVideoMediaLocation {
  __typename: "JoystreamVideoMediaLocation";
  dataObjectID: string;
}

export type GetChannel_channel_videos_media_location = GetChannel_channel_videos_media_location_HTTPVideoMediaLocation | GetChannel_channel_videos_media_location_JoystreamVideoMediaLocation;

export interface GetChannel_channel_videos_media {
  __typename: "VideoMedia";
  pixelHeight: number;
  pixelWidth: number;
  location: GetChannel_channel_videos_media_location;
}

export interface GetChannel_channel_videos_channel {
  __typename: "Channel";
  id: string;
  avatarPhotoURL: string;
  handle: string;
}

export interface GetChannel_channel_videos {
  __typename: "Video";
  id: string;
  title: string;
  description: string;
  views: number;
  duration: number;
  thumbnailURL: string;
  publishedOnJoystreamAt: GQLDate;
  media: GetChannel_channel_videos_media;
  channel: GetChannel_channel_videos_channel;
}

export interface GetChannel_channel {
  __typename: "Channel";
  id: string;
  handle: string;
  avatarPhotoURL: string;
  coverPhotoURL: string;
  totalViews: number;
  videos: GetChannel_channel_videos[] | null;
}

export interface GetChannel {
  channel: GetChannel_channel | null;
}

export interface GetChannelVariables {
  id: string;
}
