// ENQUIRY PAGE — useRef (uncontrolled) + useState (controlled) + form validation
import { useRef, useState } from "react";

function Enquiry() {
  // CONTROLLED component — phone validated via useState
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // UNCONTROLLED components — accessed via useRef
  const nameRef = useRef(null);
  const messageRef = useRef(null);

  function validate() {
    const errs = {};
    if (!nameRef.current?.value.trim()) errs.name = "Name is required.";
    if (!phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      errs.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!messageRef.current?.value.trim()) errs.message = "Message is required.";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="page form-page">
        <div className="success-box">
          <h2>Enquiry Submitted</h2>
          <p>We will contact you at {phone} shortly.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page form-page">
      <h2 className="page-title">Pet Enquiry</h2>
      <p className="form-sub">Fill in your details and we will get back to you.</p>

      <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
        {/* Uncontrolled input via useRef */}
        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input id="name" ref={nameRef} type="text" placeholder="Your name" />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Controlled input via useState */}
        <div className="field">
          <label htmlFor="phone">Mobile Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        {/* Uncontrolled textarea via useRef */}
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea id="message" ref={messageRef} rows={4} placeholder="Which pet are you interested in?" />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>

        <button type="submit" className="btn-primary full-width">Submit Enquiry</button>
      </form>
    </main>
  );
}

export default Enquiry;
