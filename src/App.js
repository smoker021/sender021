import React, { useState } from 'react';

const EmailSender = () => {
  const [numberOfEmails, setNumberOfEmails] = useState(90); // تعداد پیش‌فرض ایمیل‌ها
  const [delay, setDelay] = useState(300000); // تأخیر پیش‌فرض: 5 دقیقه (300,000 میلی‌ثانیه)
  const [recipientEmail, setRecipientEmail] = useState(''); // ایمیل گیرنده
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSendEmails = async () => {
    if (!recipientEmail || !subject || !body) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject,
          body,
          count: numberOfEmails,
          delay,
        }),
      });

      if (response.ok) {
        alert('Emails sent successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to send emails: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('An error occurred while sending emails.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Email Sender</h1>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Recipient Email:</label>
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          style={styles.input}
          placeholder="Enter recipient email"
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Number of Emails:</label>
        <input
          type="number"
          value={numberOfEmails}
          onChange={(e) => setNumberOfEmails(Number(e.target.value))}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Delay (ms):</label>
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={styles.input}
          placeholder="Enter email subject"
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={styles.textarea}
          placeholder="Enter email body"
        />
      </div>
      <button onClick={handleSendEmails} style={styles.sendButton}>
        Send Emails
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    minHeight: '100px',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
  },
};

export default EmailSender;
