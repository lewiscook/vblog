import React, { useState } from 'react'

const FONT_MIN = 0.9
const FONT_MAX = 1.6
const FONT_STEP = 0.1

export default function StoryWrapper({ children }) {
  const [fontSize, setFontSize] = useState(1.1)

  return (
    <div style={{ '--story-font-size': `${fontSize}rem` }}>
      {children}

      <div style={{
        position: 'fixed',
        bottom: 28,
        right: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: '#16161e',
        border: '1px solid #2a2418',
        borderRadius: 8,
        padding: '6px 10px',
        zIndex: 200,
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
      }}>
        <button
          onClick={() => setFontSize(f => Math.max(FONT_MIN, parseFloat((f - FONT_STEP).toFixed(1))))}
          disabled={fontSize <= FONT_MIN}
          style={{
            background: 'transparent',
            border: '1px solid #3a3020',
            borderRadius: 4,
            color: fontSize <= FONT_MIN ? '#3a3020' : '#c8a84b',
            cursor: fontSize <= FONT_MIN ? 'not-allowed' : 'pointer',
            fontFamily: "'Calibri', sans-serif",
            fontWeight: 700,
            fontSize: '0.85rem',
            padding: '3px 9px',
            lineHeight: 1,
          }}
        >
          A−
        </button>
        <span style={{ color: '#6a6050', fontSize: '0.75rem', minWidth: 32, textAlign: 'center', fontFamily: "'Calibri', sans-serif" }}>
          {Math.round(fontSize * 100)}%
        </span>
        <button
          onClick={() => setFontSize(f => Math.min(FONT_MAX, parseFloat((f + FONT_STEP).toFixed(1))))}
          disabled={fontSize >= FONT_MAX}
          style={{
            background: 'transparent',
            border: '1px solid #3a3020',
            borderRadius: 4,
            color: fontSize >= FONT_MAX ? '#3a3020' : '#c8a84b',
            cursor: fontSize >= FONT_MAX ? 'not-allowed' : 'pointer',
            fontFamily: "'Calibri', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            padding: '3px 9px',
            lineHeight: 1,
          }}
        >
          A+
        </button>
      </div>
    </div>
  )
}
