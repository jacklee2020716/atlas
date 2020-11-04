import React, { useState, useMemo } from 'react'
import styled from '@emotion/styled'
import { spacing, typography, sizes } from '@/shared/theme'
import { RouteComponentProps, navigate } from '@reach/router'
import { useQuery } from '@apollo/client'

import { SEARCH } from '@/api/queries'
import { Search, SearchVariables } from '@/api/queries/__generated__/Search'
import { TabsMenu } from '@/shared/components'
import { VideoGrid, ChannelGallery, VideoBestMatch, VideoGallery } from '@/components'
import routes from '@/config/routes'
import ChannelGrid from '@/components/ChannelGrid'

type SearchViewProps = {
  search?: string
} & RouteComponentProps
const tabs = ['all results', 'videos', 'channels']

const SectionHeader = styled.h5`
  margin: 0 0 ${spacing.m};
  font-size: ${typography.sizes.h5};
`
const SearchView: React.FC<SearchViewProps> = ({ search = '' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { data, loading } = useQuery<Search, SearchVariables>(SEARCH, { variables: { query_string: search } })

  const getChannelsAndVideos = (loading: boolean, data: Search | undefined) => {
    if (loading || !data?.search) {
      return { channels: [], videos: [] }
    }
    const results = data.search
    const videos = results.flatMap((result) => (result.item.__typename === 'Video' ? [result.item] : []))
    const channels = results.flatMap((result) => (result.item.__typename === 'Channel' ? [result.item] : []))
    return { channels, videos }
  }

  const { channels, videos: allVideos } = useMemo(() => getChannelsAndVideos(loading, data), [loading, data])

  if (loading || !data) {
    return <p>Loading...</p>
  }
  if (!data.search) {
    return <p>Something went wrong...</p>
  }

  const [bestMatch, ...videos] = allVideos
  return (
    <Container>
      <TabsMenu tabs={tabs} onSelectTab={setSelectedIndex} initialIndex={0} />
      {bestMatch && selectedIndex === 0 && (
        <VideoBestMatch video={bestMatch} onClick={() => navigate(routes.video(bestMatch.id))} />
      )}
      {videos.length > 0 && selectedIndex !== 2 && (
        <div>
          <SectionHeader>Videos</SectionHeader>
          {selectedIndex === 0 ? <VideoGallery videos={videos} /> : <VideoGrid videos={videos} />}
        </div>
      )}
      {channels.length > 0 && selectedIndex !== 1 && (
        <div>
          <SectionHeader>Channels</SectionHeader>
          {selectedIndex === 0 ? (
            <ChannelGallery channels={channels} />
          ) : (
            <ChannelGrid channels={channels} repeat="fill" />
          )}
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin: ${sizes.b4} 0;
  & > * {
    margin-bottom: ${sizes.b12}px;
  }
`

export default SearchView
