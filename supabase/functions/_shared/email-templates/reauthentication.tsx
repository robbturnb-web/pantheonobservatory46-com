/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your Observatory verification code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={eye}>◉</Text>
          <Text style={brand}>PANTHEON OBSERVATORY</Text>
        </Section>
        <Container style={inner}>
          <Heading style={h1}>Confirm your identity</Heading>
          <Text style={text}>Use the code below to confirm your identity:</Text>
          <Text style={codeStyle}>{token}</Text>
          <Text style={footer}>
            This code will fade shortly. If you didn't request this, ignore this transmission.
          </Text>
        </Container>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

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
const inner = { padding: '36px 32px 32px', textAlign: 'center' as const }
const h1 = {
  fontSize: '26px',
  fontWeight: 'bold' as const,
  color: '#1a0b2e',
  margin: '0 0 18px',
  letterSpacing: '-0.5px',
}
const text = { fontSize: '15px', color: '#4b4763', lineHeight: '1.65', margin: '0 0 18px' }
const codeStyle = {
  fontFamily: '"Courier New", Courier, monospace',
  fontSize: '34px',
  fontWeight: 'bold' as const,
  color: '#8b5cf6',
  letterSpacing: '8px',
  background: '#f5f3ff',
  border: '1px solid #ddd6fe',
  borderRadius: '12px',
  padding: '16px 20px',
  margin: '0 0 28px',
}
const footer = { fontSize: '12px', color: '#9b96b3', margin: '24px 0 0', lineHeight: '1.6' }
