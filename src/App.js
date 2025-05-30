import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [ediFormat, setEdiFormat] = useState('204');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  

  const handleFormatChange = (e) => {
    setEdiFormat(e.target.value);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', ediFormat); // Include selected EDI format

    const response = await fetch('https://csvtoedibe.onrender.com/convert', {
      method: 'POST',
      body: formData,
    });

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `output_${ediFormat}.edi`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>CSV to EDI Converter</h2>
      
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <br /><br />
      
      <label>
        Select EDI Format:
        <select value={ediFormat} onChange={handleFormatChange} style={{ marginLeft: 10 }}>
          <option value="204">EDI 204</option>
          <option value="210">EDI 210</option>
          <option value="214">EDI 214</option>
          <option value="990">EDI 990</option>
        </select>
      </label>
      <br /><br />
      
      <button onClick={handleUpload} disabled={!file}>
        Convert & Download EDI
      </button>
    </div>
  );
}

export default App;
