import React, { useRef } from 'react';

// ─── IMAGE UPLOADER ───────────────────────────────────────────────────────────
function ImageUploader({ value, onChange }) {
  const ref = useRef();
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target.result);
    reader.readAsDataURL(file);
  }
  return (
    <div className="img-upload-box" onClick={() => ref.current.click()}>
      <input ref={ref} type="file" accept="image/*" onChange={handleFile} onClick={e=>e.stopPropagation()} />
      {value ? (
        <>
          <img src={value} alt="preview" className="img-upload-preview" />
          <button className="img-clear" onClick={e=>{e.stopPropagation();onChange('');}}> ✕</button>
        </>
      ) : (
        <div className="img-upload-placeholder">
          <div className="img-upload-icon">🖼️</div>
          <div className="img-upload-label">Click to upload product image</div>
          <div className="img-upload-hint">PNG, JPG, WEBP · max 5MB</div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;