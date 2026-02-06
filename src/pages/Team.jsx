import data from '../data/data.json'
import MemberCard from '../components/MemberCard'

export default function Team() {
  return (
    <section className="container">
      <h2 className="h2">Members</h2>
      <div className="sub">We have very capable team members specialized in their field</div>
      <div className="member-list">
        {data.members.map((m, i) => (
          <MemberCard key={i} m={m} />
        ))}
      </div>
    </section>
  )
}
