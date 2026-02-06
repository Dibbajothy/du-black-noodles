// import React, { useState } from 'react';
// import data from '../data/data.json'

// export default function Gallery() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const galleryItems = data.gallery || [];

//   const openModal = (item) => {
//     setSelectedImage(item);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <section className="container">
//       <h2 className="h2">Gallery</h2>
//       <div className="sub">Our team, our moments</div>

//       {galleryItems.length > 0 ? (
//         <div className="gallery-grid">
//           {galleryItems.map((item) => (
//             <div
//               key={item.id}
//               className="gallery-item"
//               onClick={() => openModal(item)}
//             >
//               <img src={item.imageUrl} alt={item.caption} />
//               <div className="gallery-caption-overlay">
//                 <div style={{ fontWeight: 700, marginBottom: '4px' }}>{item.caption}</div>
//                 <div className="small">{item.date}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="card" style={{ marginTop: 16, padding: '40px 20px', textAlign: 'center', color: 'var(--muted)' }}>
//           No gallery images posted yet.
//         </div>
//       )}

//       {/* Modal Lightbox */}
//       {selectedImage && (
//         <div className="gallery-modal-overlay" onClick={closeModal}>
//           <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
//             <img src={selectedImage.imageUrl} alt={selectedImage.caption} />
//             <div className="gallery-modal-caption">
//               {selectedImage.caption}
//             </div>
//             <button className="gallery-modal-close" onClick={closeModal}>
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


import React, { useState, useMemo } from 'react';
// Assuming data.json is in src/data/data.json
// If it's elsewhere, you might need to adjust the path (e.g., ../data/data.json)
import data from '../data/data.json';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Sort the gallery items by date, newest first
  const sortedGallery = useMemo(() => {
    const galleryItems = data.gallery || [];
    // Create a copy before sorting
    return [...galleryItems].sort((a, b) => {
      // Convert date strings to Date objects for correct comparison
      // Handles dates like "July 7, 2023"
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      // Sort in descending order (newest first)
      return dateB - dateA;
    });
  }, [data.gallery]); // Re-sort only if data.gallery changes

  const openModal = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="container">
      <h2 className="h2">Gallery</h2>
      <div className="sub">Our team, our moments</div>

      {sortedGallery.length > 0 ? (
        <div className="gallery-grid">
          {sortedGallery.map((item) => (
            <div
              key={item.id}
              className="gallery-item"
              onClick={() => openModal(item)}
            >
              <img src={item.imageUrl} alt={item.caption} loading="lazy" />
              <div className="gallery-caption-overlay">
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>{item.caption}</div>
                <div className="small">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ marginTop: 16, padding: '40px 20px', textAlign: 'center', color: 'var(--muted)' }}>
          No gallery images posted yet.
        </div>
      )}

      {/* Modal Lightbox */}
      {selectedImage && (
        <div className="gallery-modal-overlay" onClick={closeModal}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.imageUrl} alt={selectedImage.caption} />
            <div className="gallery-modal-caption">
              {selectedImage.caption}
            </div>
            <button className="gallery-modal-close" onClick={closeModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

