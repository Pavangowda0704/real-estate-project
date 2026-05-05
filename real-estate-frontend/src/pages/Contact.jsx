function Contact() {
  return (
    <div className="section">
      <h2>Contact Us</h2>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Email:</strong> support@realestate.com</p>
          <p><strong>Address:</strong> Bangalore, Karnataka, India</p>

          <h3>Office Hours</h3>
          <p>Monday - Saturday</p>
          <p>9:00 AM - 6:00 PM</p>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Phone Number" required />
          <textarea placeholder="Your Message" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;