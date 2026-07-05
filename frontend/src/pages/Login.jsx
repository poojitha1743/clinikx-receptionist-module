import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveToken } from '../utils/auth';

const s = {
  page:   { minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, padding:'2rem', background:'#fff' },
  title:  { color:'#5B6EF5', fontWeight:500, fontSize:28, margin:0 },
  input:  { width:320, padding:'12px 20px', border:'2px solid #7B68EE', borderRadius:50, fontSize:15, textAlign:'center', outline:'none', color:'#5B4ECC' },
  btn:    { background:'#C5A8E8', border:'none', borderRadius:50, padding:'12px 48px', fontSize:15, cursor:'pointer', color:'#3d2b6e' },
  otpBox: { width:60, height:68, border:'2px solid #7B68EE', borderRadius:10, fontSize:22, textAlign:'center', outline:'none' },
  error:  { color:'red', fontSize:13 },
};

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp]     = useState(['','','','']);
  const [step, setStep]   = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();

  const sendOTP = async () => {
    if (phone.length !== 10) return setError('Enter a valid 10-digit number');
    setLoading(true); setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', { phone_number: phone });
      setStep(2);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to send OTP');
    }
    setLoading(false);
  };

  const onChange = (i, v) => {
    if (!/^\d*$/.test(v)) return;
    const o = [...otp]; o[i] = v; setOtp(o);
    if (v && i < 3) refs[i + 1].current.focus();
  };

  const submit = async () => {
    const val = otp.join('');
    if (val.length !== 4) return setError('Enter the 4-digit OTP');
    setLoading(true); setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        phone_number: phone,
        otp: val,
      });
      saveToken(res.data.token);
      const role = res.data.user.role;
      if (role === 'super_admin')  navigate('/super-admin');
      if (role === 'clinic_admin') navigate('/clinic-admin');
      if (role === 'doctor')       navigate('/doctor');
      if (role === 'receptionist') navigate('/receptionist');
    } catch (e) {
      setError(e.response?.data?.message || 'Invalid OTP');
    }
    setLoading(false);
  };

  return (
    <div style={s.page}>
      <h1 style={s.title}>Login page</h1>

      <input
        style={s.input}
        type="tel"
        maxLength={10}
        placeholder="Enter your mobile number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={step === 2}
      />

      <button style={s.btn} onClick={sendOTP} disabled={loading || step === 2}>
        {loading && step === 1 ? 'Sending...' : 'Get OTP'}
      </button>

      {step === 2 && (
        <>
          <div style={{ display: 'flex', gap: 12 }}>
            {otp.map((d, i) => (
              <input
                key={i}
                ref={refs[i]}
                style={s.otpBox}
                type="tel"
                maxLength={1}
                value={d}
                onChange={(e) => onChange(i, e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Backspace' && !d && i > 0 && refs[i - 1].current.focus()
                }
              />
            ))}
          </div>

          <button style={s.btn} onClick={submit} disabled={loading}>
            {loading ? 'Verifying...' : 'Submit'}
          </button>

          <span
            style={{ color: '#7B68EE', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => { setStep(1); setOtp(['', '', '', '']); setError(''); }}
          >
            Change number
          </span>
        </>
      )}

      {error && <p style={s.error}>{error}</p>}
    </div>
  );
}