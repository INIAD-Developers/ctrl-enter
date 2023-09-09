import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import type { CSSProperties } from 'react'
import React, { useEffect, useState } from 'react'
import { getConfig } from 'src/utils/config'

export const config: PlasmoCSConfig = {
  matches: ['https://meet.google.com/*']
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = document.querySelector<HTMLElement>(
    'div:has(> div > span > button[role="button"]):has(> div > div > label > span + textarea)'
  ) as Element
  return textbox
}

export const getShadowHostId = () => 'ctrl-enter-meet'

const styles: CSSProperties = {
  textAlign: 'right',
  margin: '-12px 0 8px',
  fontWeight: 'bold',
  color: '#9999',
  fontSize: '0.7rem',
  padding: '0 15px',
  boxSizing: 'border-box',
  width: '100%'
}

const PlasmoInline = () => {
  const [config, setConfig] = useState<boolean>()

  const fetchConfig = async () => {
    const config = await getConfig()
    setConfig(config.meet)
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  chrome.storage.onChanged.addListener(() => {
    fetchConfig()
  })
  return (
    <div style={{ width: '100%' }}>
      {config !== undefined && (
        <p style={styles}>{`${config ? 'Ctrl + ' : ''}Enter で送信`}</p>
      )}
      <div />
    </div>
  )
}

export default PlasmoInline
