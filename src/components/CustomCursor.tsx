'use client'

import { useEffect, useRef } from 'react'

interface MousePosition {
  x: number
  y: number
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef<MousePosition>({ x: 0, y: 0 })
  const isMouseOverLink = useRef(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
        
        // Follower follows with delay
        setTimeout(() => {
          if (followerRef.current) {
            followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
          }
        }, 100)
      }
    }

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('cursor-click')
      }
    }

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('cursor-click')
      }
    }

    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, input, textarea, select, [data-cursor="pointer"]')) {
        if (cursorRef.current && followerRef.current) {
          cursorRef.current.classList.add('cursor-link')
          followerRef.current.classList.add('cursor-link')
        }
        isMouseOverLink.current = true
      } else {
        if (cursorRef.current && followerRef.current) {
          cursorRef.current.classList.remove('cursor-link')
          followerRef.current.classList.remove('cursor-link')
        }
        isMouseOverLink.current = false
      }
    }

    const handleMouseEnter = () => {
      document.addEventListener('mousemove', handleLinkHover)
    }

    const handleMouseLeave = () => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.classList.remove('cursor-link')
        followerRef.current.classList.remove('cursor-link')
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    // Hide default cursor on desktop
    if (window.innerWidth > 768) {
      document.body.style.cursor = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      <style jsx>{`
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
        }

        .cursor-dot {
          width: 8px;
          height: 8px;
          background: var(--color-accent);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, background 0.3s;
        }

        .cursor-follower {
          width: 32px;
          height: 32px;
          border: 2px solid var(--color-accent);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s;
          opacity: 0.5;
        }

        .cursor-link.cursor-dot {
          width: 16px;
          height: 16px;
          background: var(--color-accent-bright);
        }

        .cursor-link.cursor-follower {
          width: 48px;
          height: 48px;
          border-color: var(--color-accent-bright);
          opacity: 0.8;
        }

        .cursor-click.cursor-dot {
          width: 4px;
          height: 4px;
        }

        .cursor-click.cursor-follower {
          width: 24px;
          height: 24px;
          opacity: 0.3;
        }

        /* Hide on mobile */
        @media (max-width: 768px) {
          .custom-cursor {
            display: none;
          }
        }
      `}</style>
      
      <div ref={cursorRef} className="custom-cursor cursor-dot" />
      <div ref={followerRef} className="custom-cursor cursor-follower" />
    </>
  )
}