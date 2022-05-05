import React from 'react'
import { CSSTransition } from 'react-transition-group'

import { Text } from '@/components/Text'
import { useBottomNavStore } from '@/providers/bottomNav'
import { usePersonalDataStore } from '@/providers/personalData'
import { transitions } from '@/styles'

import { CookieEmoticon, StyledAnchor, StyledDialog } from './CookiePopover.styles'

export const CookiePopover: React.FC = () => {
  const { cookiesAccepted, setCookiesAccepted } = usePersonalDataStore((state) => ({
    cookiesAccepted: state.cookiesAccepted,
    setCookiesAccepted: state.actions.setCookiesAccepted,
  }))
  const open = useBottomNavStore((state) => state.open)
  return (
    <CSSTransition
      in={cookiesAccepted === undefined}
      timeout={200}
      classNames={transitions.names.modal}
      mountOnEnter
      unmountOnExit
      appear
    >
      <StyledDialog
        bottomNavOpen={open}
        size="compact"
        title={
          <>
            <CookieEmoticon>🍪</CookieEmoticon>We use cookies
          </>
        }
        primaryButton={{
          text: 'Accept',
          onClick: () => setCookiesAccepted(true),
        }}
        secondaryButton={{
          text: 'Decline',
          onClick: () => setCookiesAccepted(false),
          variant: 'tertiary',
          textOnly: true,
        }}
      >
        <Text variant="t200" secondary>
          We use cookies and other tracking technologies to store your preferences, persist local storage of Keys and
          Membership, and to provide analytics.{' '}
          <StyledAnchor href="https://www.joystream.org/privacy-policy/">You can read more about it here.</StyledAnchor>
        </Text>
      </StyledDialog>
    </CSSTransition>
  )
}
