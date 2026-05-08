import React, { useState } from 'react';
import { CATS } from '../utils/constants';
import ImageUploader from './ImageUploader';

// ─── EDIT MODAL ───────────────────────────────────────────────────────────────
function EditModal({ product, onSave, onClose, toast }) {
  const [form, setForm] = useState({ ...product });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function save() {
    const parsedPrice = parseFloat(form.price);
    const parsedStock = parseInt(form.stock, 10);
    const parsedOrig = form.orig === '' ? null : parseFloat(form.orig);

    if (!form.name.trim()) {
      toast('Product name is required.', 'err');
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      toast('Enter a valid price.', 'err');
      return;
    }
    if (!form.desc.trim()) {
      toast('Product description is required.', 'err');
      return;
    }
    if (isNaN(parsedStock) || parsedStock < 0) {
      toast('Enter valid stock quantity.', 'err');
      return;
    }
    if (!form.emoji.trim()) {
      toast('Emoji/visual is required.', 'err');
      return;
    }

    onSave({
      ...form,
      price: parsedPrice,
      orig: parsedOrig === null || isNaN(parsedOrig) ? null : parsedOrig,
      stock: parsedStock,
    });
  }

  return (
    <div className="ov" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{maxHeight:'90vh',overflowY:'auto'}}>
        <div className="mh">
          <h3>{product._id ? 'Edit product' : 'Add product'}</h3>
          <button className="cls" onClick={onClose}>✕</button>
        </div>
        <div className="fg" style={{marginBottom:14}}>
          <label>Product image</label>
          <ImageUploader value={form.image || ''} onChange={v => set('image', v)} />
        </div>
        <div className="form-row">
          <div className="fg"><label>Name</label><input value={form.name} onChange={e => set('name', e.target.value)} /></div>
          <div className="fg"><label>Category</label>
            <select value={form.cat} onChange={e => set('cat', e.target.value)}>
              {CATS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="fg"><label>Price</label><input type="number" value={form.price} onChange={e => set('price', e.target.value)} /></div>
          <div className="fg"><label>Original price</label><input type="number" value={form.orig || ''} onChange={e => set('orig', e.target.value)} /></div>
          <div className="fg"><label>Stock</label><input type="number" value={form.stock} onChange={e => set('stock', e.target.value)} /></div>
          <div className="fg"><label>Emoji</label><input value={form.emoji} maxLength={4} onChange={e => set('emoji', e.target.value)} /></div>
        </div>
        <div className="form-row">
          <div className="fg full"><label>Description</label><textarea value={form.desc} onChange={e => set('desc', e.target.value)} /></div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="submit-btn" onClick={save}>Save changes</button>
          <button className="del-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;