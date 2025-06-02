import { createLazyFileRoute } from '@tanstack/react-router'

import { HistoryPage } from '@/components/history'

export const Route = createLazyFileRoute('/history')({
  component: HistoryRoute,
})

function HistoryRoute() {
  return <HistoryPage />
}
