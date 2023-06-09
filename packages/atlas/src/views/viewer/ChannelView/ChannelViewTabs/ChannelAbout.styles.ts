import styled from '@emotion/styled'

import { Avatar } from '@/components/Avatar'
import { LayoutGrid } from '@/components/LayoutGrid/LayoutGrid'
import { TextButton } from '@/components/_buttons/Button'
import { cVar, sizes } from '@/styles'

export const TextContainer = styled.div`
  display: grid;
  grid-gap: ${sizes(4)};
  padding-bottom: ${sizes(8)};
  margin-bottom: ${sizes(8)};
`

export const Details = styled.div`
  display: grid;
  gap: ${sizes(2)};
  padding-bottom: ${sizes(4)};
  border-bottom: 1px solid ${cVar('colorCoreNeutral600')};
  margin-bottom: ${sizes(4)};
`

export const DetailsMember = styled(Details)`
  display: flex;
  align-items: center;
`

export const MemberContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: ${sizes(2)};
`

export const StyledAvatar = styled(Avatar)`
  margin-right: ${sizes(2)};
`

export const StyledLayoutGrid = styled(LayoutGrid)`
  margin-bottom: 50px;
`

export const MemberLink = styled(TextButton)`
  justify-content: start;

  &,
  * {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
