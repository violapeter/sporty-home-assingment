import React from 'react'
import type { SeasonBadge as SeasonBadgeType } from 'shared-types'

interface SeasonBadgeProps {
  open: boolean
  onClose: () => void
  loading: boolean
  seasonBadge: SeasonBadgeType
}

export const SeasonBadge = ({
  seasonBadge,
  open,
  loading,
  onClose,
}: SeasonBadgeProps) => {
  const ref = React.useRef<HTMLDialogElement>(null)

  React.useEffect(() => {
    if (open && ref.current) {
      ref.current.showModal()
    }
  }, [open])

  const handleClose = () => {
    onClose()
    if (ref.current) {
      ref.current.close()
    }
  }

  return (
    <dialog className="SeasonBadgeDisplay" ref={ref}>
      <button className="SeasonBadgeDisplay__CloseButton" onClick={handleClose}>
        ×
      </button>
      <div className="SeasonBadgeDisplay__Content">
        {loading ? (
          <div className="SeasonBadgeDisplay__Loading Loading">Loading...</div>
        ) : (
          seasonBadge && (
            <img
              className="SeasonBadgeDisplay__Image"
              src={seasonBadge.badge}
              alt={seasonBadge.season}
            />
          )
        )}
      </div>
    </dialog>
  )
}
