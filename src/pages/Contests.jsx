import data from '../data/data.json'
import PlaceBadge from '../components/PlaceBadge'
import Tag from '../components/Tag'
import { useMemo } from 'react';


function ContestRow({ c, index, isFirst, isLast }) {
  return (
    <tr>
      <td style={{ padding: 0, borderBottom: 'none', verticalAlign: 'middle' }}>
        <PlaceBadge place={c.place} isFirst={isFirst} isLast={isLast} />
      </td>

      <td className='tds'>
        <div style={{ fontWeight: 700 }}>{c.name}</div>
        <div className="small">{c.date}</div>
      </td>

      <td className='tds'>
        <div className="tags" style={{ margin: 0 }}>
          {c.type && <Tag>{c.type}</Tag>}
        </div>
      </td>

      <td className='tds' style={{ textAlign: 'right', fontWeight: 500 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          {c.rating.toFixed(2)}
          <i className="fa-regular fa-flag"></i>
        </span>
      </td>
    </tr>
  )
}


export default function Contests() {

  // --- MODIFICATION START ---
  // Sort contests by date (latest first) using useMemo
  const sortedContests = useMemo(() => {
    // Helper function to parse 'DD/MM/YY' string
    const parseDate = (dateStr) => {
      const [day, month, year] = dateStr.split('/');
      // Add 2000 to the 'YY' format. Month is 0-indexed in JS Dates.
      return new Date(Number(year) + 2000, Number(month) - 1, Number(day));
    };

    // Create a new sorted array (don't mutate the original)
    return [...data.contests].sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      
      // Sort in descending order (latest date first)
      return dateB - dateA;
    });
  }, [data.contests]); // Re-sort only if data.contests changes
  // --- MODIFICATION END ---

  return (
    <section className="section container">
      <h2 className="h2">Contests</h2>
      <div className="sub">CTFs we have participated</div>
      <div className="card">
        <table className="table">
          <thead className='tds'>
            <tr>
              <th style={{ width: '100px' }}>Place</th>
              <th style={{ width: '30%' }}>Name</th>
              <th style={{ width: '45%' }}>Type</th>
              <th style={{ width: '15%', textAlign: 'right' }} >Points</th>
            </tr>
          </thead>
          <tbody>
            {/* MODIFIED: Use sortedContests instead of data.contests */}
            {sortedContests.map((c, i) => (
              <ContestRow
                key={i}
                c={c}
                index={i}
                isFirst={i === 0}
                isLast={i === sortedContests.length - 1} // Use sorted length
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

