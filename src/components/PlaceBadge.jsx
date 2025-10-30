function styleFor(place) {
  const p = Number(place);

  if (p === 1) {
    return {
      bg: '#2dd161ff',
      fg: '#0b0b0b'
    };
  }
  if (p === 2) {
    return {
      bg: '#d2d2d2ff', // silverish
      fg: '#0b0b0b'
    };
  }
  if (p === 3) {
    return {
      bg: '#ffd34fff', // yellowish/bronze-ish
      fg: '#0b0b0b'
    };
  }
  return {
    bg: '#d64b4b',   // reddish (others)
    fg: '#0b0b0b',
    border: 'rgba(0,0,0,.22)'
  };
}

export default function PlaceBadge({ place, isFirst, isLast }) {
  const { bg, fg } = styleFor(place);
  const style = {
    background: bg,
    color: fg,
    fontWeight: 900,
    borderRadius: '0px',
    display: 'inline-block',
    minWidth: '90px',
    minHeight: '90px',
    margin: '0%',
    textAlign: 'center',
    fontSize: '28px',
    lineHeight: '90px'
  };

  if (isFirst) style.borderTopLeftRadius = '10px';
  if (isLast) style.borderBottomLeftRadius = '10px';

  return (
    <span
      className="place-badge"
      aria-label={`Placed #${place}`}
      style={style}
    >
      #{place}
    </span>
  );
}
