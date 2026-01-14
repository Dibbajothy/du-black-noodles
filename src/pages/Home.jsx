import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import data from '../data/data.json'
import PlaceBadge from '../components/PlaceBadge'
import Tag from '../components/Tag'



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


export default function Home() {
  const { teamName, flagline } = data;

  // --- Logic to get LATEST items ---
  const latestWriteups = (data.writeups || []).slice(0, 2); // Get first 2 writeups

  // --- Logic to get LATEST gallery items ---
  const sortedGallery = useMemo(() => {
    const galleryItems = data.gallery || [];
    // Create a copy before sorting
    return [...galleryItems].sort((a, b) => {
      // Convert date strings (e.g., "July 7, 2023") to Date objects
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      // Sort in descending order (newest first)
      return dateB - dateA;
    });
  }, [data.gallery]); // Re-sort only if data.gallery changes

  // Now, slice the *sorted* gallery to get the latest 3 items
  const latestGallery = sortedGallery.slice(0, 3);

  // --- Logic to get LATEST contests ---
  const sortedContests = useMemo(() => {
    const parseDate = (dateStr) => {
      // Handles DD/MM/YY
      const [day, month, year] = (dateStr || '01/01/01').split('/');
      return new Date(Number(year) + 2000, Number(month) - 1, Number(day));
    };
    return [...(data.contests || [])].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  }, [data.contests]);

  const recentContests = sortedContests.slice(0, 3); // Get top 3 latest contests

  return (
    <>
      {/* 1. HERO SECTION (Kept from before) */}
      <div className="hero" style={{ padding: '100px 16px' }}>
        <h1 className="noodle-fill">{teamName}</h1>
        <div className="flag" style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#9bd979' }}>
          {flagline}
        </div>
        <Link to="/team" className="btn" style={{ marginTop: '24px' }}>
          Meet The Team
        </Link>
      </div>


      <section className="container" style={{ marginTop: '48px' }}>
        <h2 className="h2" style={{ fontSize: '32px' }}>Recent Contests</h2>
        {recentContests.length > 0 ? (
          // Using the same structure as Contests.jsx
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
                {recentContests.map((c, i) => (
                  <ContestRow
                    key={i}
                    c={c}
                    index={i}
                    isFirst={i === 0}
                    isLast={i === recentContests.length - 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card" style={{ padding: 20, color: 'var(--muted)', textAlign: 'center' }}>
            No contests posted yet.
          </div>
        )}
      </section>


      <section className="container">
        <h2 className="h2" style={{ fontSize: '32px' }}>Latest Writeups</h2>
        {latestWriteups.length > 0 ? (
          <div className="grid" style={{ marginTop: 16 }}>
            {latestWriteups.map((p, i) => (
              // Using the same structure as Blog.jsx
              <div key={i} className="card span-12">
                We        <BlogCard post={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: 20, color: 'var(--muted)', textAlign: 'center' }}>
            Team      No writeups posted yet.
          </div>
        )}
      </section>


      {/* 4. GALLERY PREVIEW */}
      <section className="container" style={{ marginTop: '48px' }}>
        <h2 className="h2" style={{ fontSize: '32px' }}>Recent Moments</h2>
        {latestGallery.length > 0 ? (
          // Using the same gallery grid from Gallery.jsx
          <div className="gallery-grid">
            {latestGallery.map((item) => (
              <Link to="/gallery" key={item.id} className="gallery-item">
                <img src={item.imageUrl} alt={item.caption} />
                <div className="gallery-caption-overlay">
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>{item.caption}</div>
                  <div className="small">{item.date}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: 20, color: 'var(--muted)', textAlign: 'center' }}>
            No moments posted yet.
          </div>
        )}
        {/* "View Full Gallery" button removed as requested */}
      </section>


    </>
  );
}
