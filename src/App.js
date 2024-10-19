import React, { useState } from 'react';

const API_URL = 'https://smm-swkt.onrender.com/api/order'; // Replace with your actual Render backend URL

function App() {
  const [formData, setFormData] = useState({
    service: '',
    link: '',
    quantity: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setResult({
        status: 'success',
        order: data.order,
        message: 'Order placed successfully!'
      });
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Social Media Services</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="service">Service ID:</label>
          <input
            id="service"
            type="number"
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="link">Social Media Link:</label>
          <input
            id="link"
            type="url"
            value={formData.link}
            onChange={(e) => setFormData({...formData, link: e.target.value})}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {result && <p style={{color: 'green'}}>{result.message}</p>}
    </div>
  );
}

export default App;
