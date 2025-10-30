import { getSpecialty } from '../data/taxonomy'

export default function Tag({ children }) {
  const spec = getSpecialty(children)
  return (
    <span
      className="tag"
      style={{ background: spec.bg, color: spec.fg, borderColor: 'transparent' }}
    >
      <i className={spec.icon} style={{ marginRight: 8 }} aria-hidden="true" />
      {children}
    </span>
  )
}
