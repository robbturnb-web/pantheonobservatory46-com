/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Restore access to the Observatory</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={eye}>◉</Text>
          <Text style={brand}>PANTHEON OBSERVATORY</Text>
        </Section>
        <Container style={inner}>
          <Heading style={h1}>Restore your signal</Heading>
          <Text style={text}>
            We received a request to reset your password. Click below to choose
            a new one and re-enter the Observatory.
          </Text>
          <Section style={buttonWrap}>
            <Button style={button} href={confirmationUrl}>Reset Password</Button>
          </Section>
          <Text style={footer}>
            If you didn't request this, you can safely ignore this transmission.
            Your password will not be changed.
          </Text>
        </Container>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '"Space Grotesk", "Helvetica Neue", Arial, sans-serif',
  margin: 0,
  padding: '40px 0',
}
const container = {
  maxWidth: '560px',
  margin: '0 auto',
  borderRadius: '16px',
  overflow: 'hidden' as const,
  border: '1px solid #ece9f5',
}
const header = {
  background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 60%, #8b5cf6 100%)',
  padding: '28px 32px',
  textAlign: 'center' as const,
}
const eye = { fontSize: '32px', color: '#ffffff', margin: '0 0 6px', letterSpacing: '4px' }
const brand = {
  fontSize: '11px',
  letterSpacing: '4px',
  color: '#e9d5ff',
  fontWeight: 'bold' as const,
  margin: 0,
}
const inner = { padding: '36px 32px 32px' }
const h1 = {
  fontSize: '26px',
  fontWeight: 'bold' as const,
  color: '#1a0b2e',
  margin: '0 0 18px',
  letterSpacing: '-0.5px',
}
const text = { fontSize: '15px', color: '#4b4763', lineHeight: '1.65', margin: '0 0 18px' }
const buttonWrap = { textAlign: 'center' as const, margin: '28px 0 24px' }
const button = {
  backgroundColor: '#8b5cf6',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  borderRadius: '12px',
  padding: '14px 28px',
  textDecoration: 'none',
  display: 'inline-block',
}
const footer = { fontSize: '12px', color: '#9b96b3', margin: '24px 0 0', lineHeight: '1.6' }
