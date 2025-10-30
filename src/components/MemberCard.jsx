import Tag from './Tag'

export default function MemberCard({ m }) {
  return (
    <div className="card span-6">
      <div className="member memberCard">
        <img src={m.avatar} alt={m.name} />
        <div>
          <h3>{m.name}</h3>
          <div className="moto">{m.moto}</div>
        </div>
        <div className="tags">{m.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
        <div className="links">
          {m.github && <a href={m.github} target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>}
          {m.facebook && <a href={m.facebook} target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>}
          {m.linkedin && <a href={m.linkedin} target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>}
        </div>
      </div>
    </div>
  )
}
