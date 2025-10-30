import Tag from './Tag'
export default function BlogCard({post}){
  return (
    <a className="card" href={post.url || '#'} target={post.url ? '_blank' : '_self'} rel="noreferrer">
      <div style={{display:'flex', gap:14, alignItems:'center'}}>
        <div style={{fontSize:13,color:'var(--muted)'}}>{post.date}</div>
        <div style={{fontWeight:800, fontSize:18}}>{post.title}</div>
      </div>
      <div className="tags" style={{marginTop:8}}>
        {post.tags.map(t => <Tag key={t}>{t}</Tag>)}
      </div>
      <div style={{opacity:.85, marginTop:8}}>{post.excerpt}</div>
    </a>
  )
}
