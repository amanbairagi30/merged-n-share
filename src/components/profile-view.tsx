'use client'

import { useEffect, useRef } from 'react'

interface ProfileViewProps {
  userId: string
  currentUserId: string | undefined
}

export default function ProfileView({ userId, currentUserId }: ProfileViewProps) {
  const hasRecordedView = useRef(false)

  useEffect(() => {
    const recordView = async () => {
      if (hasRecordedView.current || userId === currentUserId) return

      try {
        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        })

        if (!response.ok) {
          throw new Error('Failed to record view')
        }

        const data = await response.json()
        console.log(data.message)
        hasRecordedView.current = true
      } catch (error) {
        console.error('Error recording view:', error)
      }
    }

    recordView()
  }, [userId, currentUserId])

  return null // This component doesn't render anything
}