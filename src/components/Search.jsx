export default function Search({value,onChange,placeholder='Search'}){
  return (
    <div className="search">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21l-5.2-5.2M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>
    </div>
  )
}
