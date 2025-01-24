import React, { useState, useEffect } from 'react';

const EmailSender = () => {
  const [emails, setEmails] = useState(['']);
  const [numberOfEmails, setNumberOfEmails] = useState(90);
  const [remainingEmails, setRemainingEmails] = useState(numberOfEmails);
  const [delay, setDelay] = useState(300000);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1000);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeRemaining]);

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleChangeEmail = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const handleSendEmails = async () => {
    if (emails.some((email) => !email) || !subject || !body) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSending(true);
    setTimeRemaining(delay * numberOfEmails); // Set total time remaining

    try {
      const response = await fetch('https://sender021.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emails,
          subject,
          body,
          count: numberOfEmails,
          delay,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRemainingEmails(remainingEmails - data.sentCount);
        alert('Emails sent successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to send emails: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('An error occurred while sending emails.');
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Email Sender</h1>

      {emails.map((email, index) => (
        <div key={index} style={styles.inputGroup}>
          <label style={styles.label}>Recipient Email {index + 1}:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleChangeEmail(index, e.target.value)}
            style={styles.input}
            placeholder="Enter recipient email"
          />
          {emails.length > 1 && (
            <button
              onClick={() => handleRemoveEmail(index)}
              style={styles.removeButton}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button onClick={handleAddEmail} style={styles.addButton}>
        Add Email
      </button>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Number of Emails:</label>
        <input
          type="number"
          value={numberOfEmails}
          onChange={(e) => {
            setNumberOfEmails(Number(e.target.value));
            setRemainingEmails(Number(e.target.value));
          }}
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
      <div style={styles.inputGroup}>
        <label style={styles.label}>Time Remaining:</label>
        <div>{formatTime(timeRemaining)}</div>
      </div>
      <button onClick={handleSendEmails} style={styles.sendButton} disabled={isSending}>
        {isSending ? 'Sending...' : 'Send Emails'}
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
  addButton: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  removeButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default EmailSender;