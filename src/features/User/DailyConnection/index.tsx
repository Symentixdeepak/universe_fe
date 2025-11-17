import React from 'react'
import { useRouter } from 'next/router'
import DailyConnection from './components/DailyConnection'

const DailyConn = () => {
  const router = useRouter()

  const getConnectionIds = (): string[] => {
    const { connection } = router.query
    if (!connection) return []
    return Array.isArray(connection) ? connection : [connection]
  }

  const getCurrentCount = (): number => {
    const { count } = router.query
    return count ? parseInt(count as string, 10) : 0
  }

  const removeFirstConnectionAndNavigate = () => {
    const connectionIds = getConnectionIds()
    const currentCount = getCurrentCount()
    
    if (connectionIds.length <= 1) {
      // If only one or no connections left, redirect to my-universe
      router.push('/user/my-universe')
    } else {
      // Remove the first connection and navigate with remaining ones
      const remainingIds = connectionIds.slice(1)
      const newCount = currentCount + 1
      const queryString = remainingIds.map(id => `connection=${id}`).join('&')
      router.push(`/user/daily-connections?${queryString}&count=${newCount}&total=${router.query.total}`, undefined, { shallow: true })
    }
  }

  const onAccept = () => {
    // Handle accepting the connection
    console.log("Accepted Daily Connection")
    removeFirstConnectionAndNavigate()
  }

  const onDecline = () => {
    // Handle declining the connection
    console.log("Declined Daily Connection")
    removeFirstConnectionAndNavigate()
  }

  return (
    <DailyConnection onAccept={onAccept} onDecline={onDecline}/>
  )
}

export default DailyConn