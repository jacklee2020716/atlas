import { create } from '@storybook/theming/create'
import { colors } from '../theme'

export default create({
  base: 'dark',

  colorPrimary: '#4038FF',
  colorSecondary: 'deepskyblue',

  // UI
  appBg: colors.black,
  appContentBg: '#272D33',
  appBorderColor: '#424E57',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#DAE2EB',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors

  barBg: '#272D33',
  barTextColor: '#7B8A95',
  barSelectedColor: 'white',

  // Form colors
	inputBg: 'white',
  inputBorder: '#272D33',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: '@joystream/components',
  brandUrl: 'https://joystream.org',
  brandImage:
    'https://raw.githubusercontent.com/Joystream/design/master/logo/logo/PNG/Logo-horisontal-basic-white-1x.png',
})
