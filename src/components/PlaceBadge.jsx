function styleFor(place) {
  const p = Number(place);

  if (p === 1) {
    return {
      bg: '#2dd161ff',
      fg: '#0b0b0b',
      icon: 'fa-solid fa-trophy',
      iconColor: '#ffd700'
    };
  }
  if (p === 2) {
    return {
      bg: '#d2d2d2ff', // silverish
      fg: '#0b0b0b',
      icon: 'fa-solid fa-medal',
      iconColor: '#c0c0c0'
    };
  }
  if (p === 3) {
    return {
      bg: '#ffd34fff', // yellowish/bronze-ish
      fg: '#0b0b0b',
      icon: 'fa-solid fa-medal',
      iconColor: '#cd7f32'
    };
  }
  return {
    bg: '#d64b4b',   // reddish (others)
    fg: '#0b0b0b',
    border: 'rgba(0,0,0,.22)',
    icon: null,
    iconColor: null
  };
}

export default function PlaceBadge({ place, isFirst, isLast }) {
  const { bg, fg, icon, iconColor } = styleFor(place);
  const p = Number(place);

  const style = {
    background: bg,
    color: fg,
    fontWeight: 900,
    borderRadius: '0px',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '90px',
    minHeight: '90px',
    margin: '0%',
    textAlign: 'center',
    gap: '4px'
  };

  if (isFirst) style.borderTopLeftRadius = '10px';
  if (isLast) style.borderBottomLeftRadius = '10px';

  return (
    <span
      className="place-badge"
      aria-label={`Placed #${place}`}
      style={style}
    >
      {icon && (
        <i
          className={icon}
          style={{
            fontSize: p === 1 ? '24px' : '20px',
            color: iconColor,
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
          }}
        ></i>
      )}
      <span style={{ fontSize: '24px', lineHeight: '1' }}>#{place}</span>
    </span>
  );
}

