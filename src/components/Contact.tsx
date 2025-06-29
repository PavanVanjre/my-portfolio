import { motion } from 'framer-motion';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { getSectionData } from '@/lib/data';

export default function Contact() {
  const contactData = getSectionData('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Message is required');
      return false;
    }
    if (formData.message.trim().length < 10) {
      setErrorMessage('Message must be at least 10 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Using environment variables for EmailJS credentials
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // EmailJS service ID from environment
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // EmailJS template ID from environment
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: import.meta.env.VITE_CONTACT_EMAIL, // Contact email from environment
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // EmailJS public key from environment
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20" id="contact" role="region" aria-label="Contact section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" id="contact-title">
            {contactData.title.split(' ').slice(0, -1).join(' ')} <span className="gradient-text">{contactData.title.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" id="contact-subtitle">
            {contactData.subtitle}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
              role="complementary"
              aria-label="Contact information"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4" id="contact-heading">{contactData.heading}</h3>
                <p className="text-muted-foreground leading-relaxed" id="contact-description">
                  {contactData.description}
                </p>
              </div>

              <div className="space-y-4" role="list" aria-label="Contact methods">
                {contactData.contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4" role="listitem">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl" aria-hidden="true">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-medium" id={`contact-type-${index}`}>{info.type}</p>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`${info.type}: ${info.value}`}
                          id={`contact-link-${index}`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground" id={`contact-value-${index}`}>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-labelledby="contact-title">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2" id="name-label">
                    {contactData.form.name.label}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder={contactData.form.name.placeholder}
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-describedby="name-label"
                    aria-invalid={errorMessage && !formData.name ? 'true' : 'false'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" id="email-label">
                    {contactData.form.email.label}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder={contactData.form.email.placeholder}
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-describedby="email-label"
                    aria-invalid={errorMessage && !formData.email ? 'true' : 'false'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" id="message-label">
                    {contactData.form.message.label}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                    placeholder={contactData.form.message.placeholder}
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-describedby="message-label"
                    aria-invalid={errorMessage && !formData.message ? 'true' : 'false'}
                  ></textarea>
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm"
                    role="alert"
                    aria-live="assertive"
                    id="error-message"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 text-sm"
                    role="status"
                    aria-live="polite"
                    id="success-message"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-describedby={errorMessage ? 'error-message' : submitStatus === 'success' ? 'success-message' : undefined}
                  id="submit-button"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></div>
                      <span aria-live="polite">Sending...</span>
                    </div>
                  ) : (
                    contactData.form.submit
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
