import Tag from './Tag'

export default function MemberCard({ m }) {
  return (
    <div className="member-list-item">
      {/* 1. Avatar */}
      <img src={m.avatar} alt={m.name} className="member-avatar" />

      {/* 2. Name & Moto */}
      <div className="member-info">
        <h3>
          {m.name}
          {m.isCaptain && (
            <i className="fa-solid fa-crown" style={{ color: '#ffd700', fontSize: '12px' }} title="Captain"></i>
          )}
        </h3>
        <div className="moto">{m.moto}</div>
      </div>

      {/* 3. Tags (Specialties) */}
      <div className="member-tags">
        {m.tags.map(t => <Tag key={t}>{t}</Tag>)}
      </div>

      {/* 4. Social Links */}
      <div className="member-links">
        {m.github && <a href={m.github} target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>}
        {m.linkedin && <a href={m.linkedin} target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>}
        {m.facebook && <a href={m.facebook} target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>}
      </div>
    </div>
  )
}

