import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAxios } from '../utils/auth';


const s = {
  page:     { minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:18, padding:'2rem', background:'#fff' },
  title:    { fontSize:24, fontWeight:600, margin:0, color:'#1f1f1f' },
  subtitle: { fontSize:13, color:'#666', margin:0, marginBottom:6 },
  row:      { display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center' },
  input:    { width:280, padding:'12px 16px', border:'1px solid #ccc', borderRadius:8, fontSize:14, outline:'none' },
  btn:      { background:'#6c4fd6', color:'#fff', border:'none', borderRadius:50, padding:'12px 60px', fontSize:15, cursor:'pointer', marginTop:10 },
  error:    { color:'red', fontSize:13 },
};

export default function Registration() {
  const [form, setForm] = useState({
    name: '',
    phone_number: '',
    clinic_name: '',
    city: '',
    area: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  // "Next" button handler
  const handleNext = async () => {
    setError('');
    const { name, phone_number, clinic_name, city, area } = form;

    if (!name || !phone_number || !clinic_name || !city || !area) {
      return setError('Please fill in all fields');
    }
    if (phone_number.length !== 10) {
      return setError('Enter a valid 10-digit phone number');
    }

    setLoading(true);
    try {
      const res = await authAxios.post('/clinics/register', form);
      // Pass the new clinic_id forward to the subscription page
      navigate('/subscription', { state: { clinic_id: res.data.clinic_id } });
    } catch (e) {
      setError(e.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={s.page}>
      <h1 style={s.title}>Registration form</h1>
      <p style={s.subtitle}>Please fill the below details</p>

      <div style={s.row}>
        <input style={s.input} placeholder="Name" value={form.name} onChange={handleChange('name')} />
        <input style={s.input} placeholder="Phone number" type="tel" maxLength={10}
          value={form.phone_number} onChange={handleChange('phone_number')} />
      </div>

      <div style={s.row}>
        <input style={s.input} placeholder="Clinic name" value={form.clinic_name} onChange={handleChange('clinic_name')} />
        <input style={s.input} placeholder="City" value={form.city} onChange={handleChange('city')} />
      </div>

      <div style={s.row}>
        <input style={s.input} placeholder="Area" value={form.area} onChange={handleChange('area')} />
      </div>

      <button style={s.btn} onClick={handleNext} disabled={loading}>
        {loading ? 'Please wait...' : 'Next'}
      </button>

      {error && <p style={s.error}>{error}</p>}
    </div>
  );
}
