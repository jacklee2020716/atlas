import React from 'react'
import { Button } from '../components'
import { text, withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs],
}

export const Primary = () => (
  <>
    <Button onClick={() => action('Button Clicked')}>{text('Button Text', 'Regular')}</Button>
    <Button size="small" onClick={() => action('Button Clicked')}>
      Small
    </Button>
    <Button size="smaller" onClick={() => action('Button Clicked')}>
      Smaller
    </Button>
  </>
)

export const Secondary = () => (
  <>
    <Button variant="secondary" onClick={() => action('Button Clicked')}>
      Regular
    </Button>
    <Button variant="secondary" size="small">
      Small
    </Button>
    <Button variant="secondary" size="smaller">
      Has no onClik
    </Button>
  </>
)

export const PrimaryFullSize = () => <Button full>Primary Full Size</Button>

export const SecondaryFullSize = () => (
  <Button full variant="secondary">
    Secondary Full Size
  </Button>
)

export const PrimaryWithIcon = () => (
  <>
    <Button icon="block">Regular</Button>
    <Button icon="block" size="small">
      Small
    </Button>
    <Button icon="block" size="smaller">
      Smaller
    </Button>
  </>
)

export const SecondaryWithIcon = () => (
  <>
    <Button variant="secondary" icon="block">
      Regular
    </Button>
    <Button variant="secondary" icon="block" size="small">
      Small
    </Button>
    <Button variant="secondary" icon="block" size="smaller">
      Smaller
    </Button>
  </>
)

export const PrimaryWithoutText = () => (
  <>
    <Button icon="block" />
    <Button icon="block" size="small" />
    <Button icon="block" size="smaller" />
  </>
)

export const SecondaryWithoutText = () => (
  <>
    <Button variant="secondary" icon="block" />
    <Button variant="secondary" icon="block" size="small" />
    <Button variant="secondary" icon="block" size="smaller" />
  </>
)

export const Disabled = () => (
  <>
    <Button disabled={true} onClick={() => action('Clicked a disabled button, this should not happen.')}>
      Disabled
    </Button>
    <Button disabled={true} icon="block">
      Disabled with icon
    </Button>
    <Button disabled={true} icon="block" />
  </>
)
