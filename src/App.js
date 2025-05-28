import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://csvtoedibe.onrender.com/convert', {
      method: 'POST',
      body: formData,
    });

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'output.edi';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>CSV to EDI Converter</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Convert & Download EDI
      </button>
    </div>
  );
}

export default App;