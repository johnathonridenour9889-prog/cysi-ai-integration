export function BrandMark() {
  return (
    <span className="cs-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64" role="presentation">
        <path className="cs-mark__frame" d="M12 13h27l8 8v7h-8v-4l-4-4H20v24h15l4-4v-4h8v7l-8 8H12z" />
        <path className="cs-mark__signal" d="M26 28h26M26 36h18" />
        <circle className="cs-mark__node" cx="53" cy="28" r="3" />
      </svg>
    </span>
  );
}
