'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Phone, Mail, MessageSquare, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { siteConfig } from '../data/site';
import { furnitureCategories } from '../data/furniture';
import '../styles/ContactForm.css';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const prefillProduct = searchParams.get('product') || '';
  const prefillCategory = searchParams.get('category') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Beds & Bedroom',
    message: '',
    company_website: '', // honeypot
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  // Handle URL query parameters prefill
  useEffect(() => {
    if (prefillProduct) {
      setFormData((prev) => ({
        ...prev,
        category: prefillProduct,
        message: `Hello S.S. Furniture, I am interested in inquiring about ${prefillProduct}. Please share dimensions, finish options, and showroom availability.`,
      }));
    } else if (prefillCategory) {
      const match = furnitureCategories.find((c) => c.id === prefillCategory);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          category: match.name,
        }));
      }
    }
  }, [prefillProduct, prefillCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus({ submitting: false, success: false, error: 'Please enter your full name.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setStatus({ submitting: false, success: false, error: 'Please enter a valid email address.' });
      return;
    }

    const phoneDigits = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!phoneDigits || phoneDigits.length < 8) {
      setStatus({ submitting: false, success: false, error: 'Please enter a valid phone number (at least 8-10 digits).' });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ submitting: false, success: false, error: 'Please enter your message (at least 10 characters).' });
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.');
      }

      setStatus({ submitting: false, success: true, error: null });
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'Beds & Bedroom',
        message: '',
        company_website: '',
      });
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'An unexpected error occurred. Please contact us directly by phone or WhatsApp.',
      });
    }
  };

  const categoriesList = furnitureCategories.filter((c) => c.id !== 'all');

  return (
    <div className="contact-grid">
      {/* Left Column: Direct Showroom Info */}
      <div className="contact-info-panel">
        <div>
          <span className="section-subtitle light">Direct Consultation</span>
          <h2 className="section-title light" style={{ marginBottom: '1rem' }}>
            Looking for Custom Furniture for Your Home?
          </h2>
          <p className="section-desc light" style={{ textAlign: 'justify' }}>
            Connect with <strong>S.S. Furniture</strong> for material inquiries, customized dimensions, and personal showroom guidance. Whether you need an individual statement piece or an entire apartment suite, we are glad to assist.
          </p>
        </div>

        {/* Click to Call Box */}
        <div className="contact-call-card">
          <div className="contact-call-icon">
            <Phone size={24} />
          </div>
          <div>
            <div className="contact-call-label">Call For Instant Inquiries</div>
            <a href={`tel:${siteConfig.rawPhone}`} className="contact-call-phone">
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Email Box */}
        <div className="contact-call-card">
          <div className="contact-call-icon" style={{ backgroundColor: 'rgba(197, 160, 89, 0.2)', color: 'var(--color-accent-gold)' }}>
            <Mail size={24} />
          </div>
          <div>
            <div className="contact-call-label">Email Showroom</div>
            <a href={`mailto:${siteConfig.email}`} className="contact-call-phone" style={{ fontSize: '1.1rem' }}>
              {siteConfig.email}
            </a>
          </div>
        </div>

        {/* WhatsApp Chat Box */}
        <div className="contact-call-card" style={{ borderColor: 'rgba(37, 211, 102, 0.3)' }}>
          <div className="contact-call-icon" style={{ backgroundColor: 'var(--color-whatsapp)', color: '#FFFFFF' }}>
            <MessageSquare size={24} />
          </div>
          <div>
            <div className="contact-call-label">Chat Directly via WhatsApp</div>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                'Hello S.S. Furniture, I would like to inquire about your furniture collections.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-call-phone"
              style={{ color: '#55EB86' }}
            >
              Start WhatsApp Chat
            </a>
          </div>
        </div>

        {/* Location Notice */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <MapPin size={20} style={{ color: 'var(--color-accent-gold)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                Showroom Location
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-light-muted)', lineHeight: 1.5 }}>
                {siteConfig.displayAddress}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Form */}
      <div className="contact-form-card">
        <h3 className="contact-form-title">Send a Furniture Enquiry</h3>
        <p className="contact-form-subtitle">
          Fill in your details below and our team will get back to you regarding your selected furniture pieces.
        </p>

        {status.error && (
          <div className="form-alert form-alert-error" role="alert">
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span>{status.error}</span>
          </div>
        )}

        {status.success && (
          <div className="form-alert form-alert-success" role="status">
            <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Enquiry Received!</strong> Thank you for contacting S.S. Furniture. We have sent a confirmation email to your address. You may also call us directly anytime at {siteConfig.phoneDisplay}.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot anti-spam field */}
          <div className="honeypot-field" aria-hidden="true">
            <label htmlFor="company_website">Company Website</label>
            <input
              type="text"
              id="company_website"
              name="company_website"
              value={formData.company_website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Your Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="e.g. Rajesh Sharma"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={80}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="e.g. rajesh@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={120}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={20}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Furniture Category / Interest
              </label>
              <select
                id="category"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
              >
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
                {prefillProduct && (
                  <option value={prefillProduct}>
                    {prefillProduct}
                  </option>
                )}
                <option value="Custom Furniture Sizing & Finishes">Custom Furniture Sizing &amp; Finishes</option>
                <option value="Complete Home Furniture Package">Complete Home Furniture Package</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Enquiry Details / Message <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              className="form-control"
              placeholder="Describe your furniture requirement, preferred wood stain, room measurements, or specific inquiries..."
              value={formData.message}
              onChange={handleChange}
              required
              maxLength={2500}
            />
          </div>

          <button
            type="submit"
            className="btn btn-accent form-submit-btn"
            disabled={status.submitting}
          >
            {status.submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Sending Enquiry...</span>
              </>
            ) : (
              <>
                <span>Send Furniture Enquiry</span>
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ContactForm() {
  return (
    <section className="section-padding contact-section" id="contact">
      <div className="container">
        <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center', padding: '2rem' }}>Loading enquiry form...</div>}>
          <ContactFormInner />
        </Suspense>
      </div>
    </section>
  );
}
