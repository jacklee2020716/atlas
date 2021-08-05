import React, { FC, Fragment, useState } from 'react'

import { GetVideosConnectionDocument, GetVideosConnectionQuery, GetVideosConnectionQueryVariables } from '@/api/queries'
import { ChannelPreview } from '@/components/ChannelPreview'
import { useInfiniteGrid } from '@/components/InfiniteGrids/useInfiniteGrid'
import { VideoPreview } from '@/components/VideoPreview'
import { Grid } from '@/shared/components'

type ChannelWithVideosProps = {
  channelId?: string
}

const INITIAL_VIDEOS_PER_ROW = 4
const INITAL_ROWS = 1

export const ChannelWithVideos: FC<ChannelWithVideosProps> = ({ channelId }) => {
  const [videosPerRow, setVideosPerRow] = useState(INITIAL_VIDEOS_PER_ROW)
  const { displayedItems, placeholdersCount } = useInfiniteGrid<
    GetVideosConnectionQuery,
    GetVideosConnectionQuery['videosConnection'],
    GetVideosConnectionQueryVariables
  >({
    query: GetVideosConnectionDocument,
    isReady: !!channelId,
    skipCount: 0,
    queryVariables: {
      where: {
        channelId_eq: channelId,
        isPublic_eq: true,
        isCensored_eq: false,
      },
    },
    targetRowsCount: INITAL_ROWS,
    dataAccessor: (rawData) => rawData?.videosConnection,
    itemsPerRow: videosPerRow,
  })

  const placeholderItems = Array.from({ length: placeholdersCount }, () => ({ id: undefined }))
  const gridContent = (
    <>
      {[...displayedItems, ...placeholderItems]?.map((video, idx) => (
        <VideoPreview id={video.id} key={`channels-with-videos-${idx}`} showChannel />
      ))}
    </>
  )

  return (
    <>
      <ChannelPreview id={channelId} variant="secondary" />
      <Grid onResize={(sizes) => setVideosPerRow(sizes.length)}>{gridContent}</Grid>
    </>
  )
}
