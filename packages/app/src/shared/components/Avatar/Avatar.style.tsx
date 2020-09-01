import { makeStyles, StyleFn } from '../../utils'
import { colors, spacing } from '../../theme'

export type AvatarStyleProps = {
  size?: 'small' | 'default' | 'large'
}

const container: StyleFn = (_, { size = 'default' }) => {
  const width = size === 'small' ? spacing.xs : size === 'default' ? spacing.m : spacing.xl
  return {
    borderRadius: 999,
    minWidth: width,
    backgroundColor: colors.gray[400],
    color: colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& > span': {
      textTransform: 'uppercase',
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  }
}

const img: StyleFn = () => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 999,
})

export const useCSS = (props: AvatarStyleProps) => ({
  container: makeStyles([container])(props),
  img: makeStyles([img])(props),
})
