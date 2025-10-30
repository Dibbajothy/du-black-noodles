import { useState, useMemo } from 'react'
import data from '../data/data.json'
import BlogCard from '../components/BlogCard'
import Search from '../components/Search'

export default function Blog(){
  const [q, setQ] = useState('')
  const posts = useMemo(()=>{
    const term = q.trim().toLowerCase()
    if(!term) return data.writeups
    return data.writeups.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.tags.join(' ').toLowerCase().includes(term) ||
      (p.excerpt || '').toLowerCase().includes(term)
    )
  }, [q])

  return (
    <section className="container">
      <h2 className="h2">Writeups</h2>
      <div className="sub">Blogs about our CTFs</div>
      <div className="card" style={{ padding: 10 }}>
        <Search value={q} onChange={setQ} placeholder="Search articles" />
      </div>

      {/* Check if there are any posts. If not, show a message. */}
      {posts.length > 0 ? (
        <div className="grid" style={{ marginTop: 16}}>
          {posts.map((p, i) => (
            <div key={i} className="card span-12">
              <BlogCard post={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ marginTop: 16, padding: '40px 20px', textAlign: 'center', color: 'var(--muted)' }}>
          {/* Show a different message depending on if the user is searching or not */}
          {q ? `No writeups found for "${q}"` : 'No writeups posted yet.'}
        </div>
      )}

    </section>
  )
}
