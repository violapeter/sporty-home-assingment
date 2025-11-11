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
}: SeasonBadgeProps) => (
  <dialog open={open}>
    <button onClick={onClose}>x</button>
    {loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        {seasonBadge && seasonBadge.badge && (
          <img src={seasonBadge.badge} alt={seasonBadge.season} />
        )}
      </div>
    )}
  </dialog>
)
