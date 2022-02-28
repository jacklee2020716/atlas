import React, { useMemo, useState } from 'react'
import useResizeObserver from 'use-resize-observer'

import { Member } from '@/components/NftTile'
import { Text } from '@/components/Text'
import {
  SvgActionBid,
  SvgActionBuyNow,
  SvgActionCancel,
  SvgActionChangePrice,
  SvgActionCopy,
  SvgActionJoyToken,
  SvgActionMore,
  SvgActionNotForSale,
  SvgActionSell,
} from '@/components/_icons'
import { SkeletonLoader } from '@/components/_loaders/SkeletonLoader'
import { ContextMenu, MenuItemProps } from '@/components/_overlays/ContextMenu'
import { cVar } from '@/styles'
import { formatNumberShort } from '@/utils/number'

import {
  CaptionSkeletonWrapper,
  Content,
  Details,
  DetailsContentWrapper,
  Header,
  KebabMenuButtonIcon,
  StyledAvatarGroup,
  Title,
} from './NftTileDetails.styles'

export type NftTileDetailsProps = {
  loading?: boolean
  owner?: Member
  creator?: Member
  role?: 'owner' | 'viewer'
  auction?: 'none' | 'minBid' | 'topBid' | 'waiting'
  buyNowPrice?: number | null
  minBid?: number | null
  topBid?: number | null
  title?: string | null
  hovered?: boolean
}

type TileSize = 'small' | 'medium'

type DetailsContent = {
  caption: string
  icon: React.ReactNode
  content: string | number
  secondary?: boolean
  tileSize?: TileSize
}

const SMALL_SIZE_WIDTH = 288

export const NftTileDetails: React.FC<NftTileDetailsProps> = ({
  loading,
  creator,
  owner,
  role,
  auction,
  minBid,
  topBid,
  buyNowPrice,
  title,
  hovered,
}) => {
  const [contentHovered, setContentHovered] = useState(false)
  const toggleContentHover = () => setContentHovered((prevState) => !prevState)
  const [tileSize, setTileSize] = useState<TileSize>()
  const { ref: contentRef } = useResizeObserver<HTMLDivElement>({
    box: 'border-box',
    onResize: (size) => {
      const { width } = size
      if (width) {
        if (tileSize !== 'small' && width < SMALL_SIZE_WIDTH) {
          setTileSize('small')
        }
        if (tileSize !== 'medium' && width >= SMALL_SIZE_WIDTH) {
          setTileSize('medium')
        }
      }
    },
  })

  const getContextMenuContent = useMemo(() => {
    const elements: MenuItemProps[] = [
      {
        icon: <SvgActionCopy />,
        title: 'Copy video URL',
      },
    ]
    if (role === 'owner') {
      if (auction === 'none' && !buyNowPrice) {
        elements.unshift({
          icon: <SvgActionSell />,
          title: 'Start sale',
        })
      } else {
        elements.unshift(
          {
            icon: <SvgActionCancel />,
            title: 'Remove from sale',
            destructive: true,
          },
          {
            icon: <SvgActionChangePrice />,
            title: 'Change price',
          }
        )
      }
    } else {
      if (auction !== 'none') {
        elements.unshift(
          ...(buyNowPrice
            ? [
                {
                  icon: <SvgActionBuyNow />,
                  title: 'Buy now',
                },
              ]
            : []),
          {
            icon: <SvgActionBid />,
            title: 'Place bid',
          }
        )
      } else {
        elements.unshift(
          ...(buyNowPrice
            ? [
                {
                  icon: <SvgActionBuyNow />,
                  title: 'Buy now',
                },
              ]
            : [])
        )
      }
    }
    return elements
  }, [auction, buyNowPrice, role])

  const DetailsContent: React.FC<DetailsContent> = React.memo(({ caption, icon, content, secondary }) => (
    <div>
      <Text variant={tileSize === 'medium' ? 't200' : 't100'} secondary>
        {caption}
      </Text>
      <DetailsContentWrapper secondary={secondary}>
        {icon}{' '}
        <Text variant={tileSize === 'medium' ? 'h300' : 'h200'} secondary={secondary}>
          {content}
        </Text>
      </DetailsContentWrapper>
    </div>
  ))
  DetailsContent.displayName = 'DetailsContent'

  const getDetails = useMemo(() => {
    if (loading) {
      return (
        <CaptionSkeletonWrapper>
          <SkeletonLoader width="17%" height={tileSize === 'medium' ? 20 : 16} bottomSpace={4} />
          <SkeletonLoader width="28%" height={tileSize === 'medium' ? 24 : 20} />
        </CaptionSkeletonWrapper>
      )
    }
    switch (auction) {
      case 'none':
        return (
          !buyNowPrice && (
            <DetailsContent caption="Status" content="Not for sale" icon={<SvgActionNotForSale />} secondary />
          )
        )
      case 'minBid':
        return (
          !!minBid && (
            <DetailsContent caption="Min bid" content={formatNumberShort(minBid)} icon={<SvgActionJoyToken />} />
          )
        )
      case 'topBid':
        return (
          !!topBid && (
            <DetailsContent caption="Top bid" content={formatNumberShort(topBid)} icon={<SvgActionJoyToken />} />
          )
        )
      case 'waiting':
        return <DetailsContent caption="Status" content="Place first bid" icon={<SvgActionJoyToken />} secondary />
    }
  }, [DetailsContent, auction, buyNowPrice, loading, minBid, tileSize, topBid])

  return (
    <Content
      ref={contentRef}
      loading={loading}
      onMouseEnter={toggleContentHover}
      onMouseLeave={toggleContentHover}
      tileSize={tileSize}
    >
      <Header>
        <StyledAvatarGroup
          avatarStrokeColor={
            contentHovered || hovered ? cVar('colorBackground', true) : cVar('colorBackgroundMuted', true)
          }
          loading={loading}
          avatars={[
            {
              url: creator?.assetUrl,
              tooltipText: creator?.name,
              onClick: creator?.onClick,
              loading: creator?.loading,
            },
            ...(owner
              ? [{ url: owner?.assetUrl, tooltipText: owner?.name, onClick: owner?.onClick, loading: owner.loading }]
              : []),
          ]}
        />
        <ContextMenu
          placement="bottom-end"
          disabled={loading}
          items={getContextMenuContent}
          trigger={
            <KebabMenuButtonIcon variant="tertiary" size="small" isActive={!loading}>
              <SvgActionMore />
            </KebabMenuButtonIcon>
          }
        />
      </Header>
      {loading ? (
        <SkeletonLoader width="55.6%" height={24} />
      ) : (
        <Title variant={tileSize === 'medium' ? 'h400' : 'h300'}>{title}</Title>
      )}
      <Details>
        {getDetails}
        {!loading && !!buyNowPrice && buyNowPrice > 0 && (
          <DetailsContent caption="Buy now" content={formatNumberShort(buyNowPrice)} icon={<SvgActionJoyToken />} />
        )}
      </Details>
    </Content>
  )
}
