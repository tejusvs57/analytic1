import React, { useState } from 'react';

const FileUploadParamSelector = ({ allParameters, onParamsSelected }) => {
  const [uploadedParams, setUploadedParams] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();

    // Support CSV or newline-separated parameters
    let parsed = text.includes(',') ? text.split(',') : text.split('\n');
    parsed = parsed.map(p => p.trim()).filter(Boolean);

    // Optional: Validate against all known parameters
    const validParams = parsed.filter(p => allParameters.includes(p));
    setUploadedParams(validParams);
    onParamsSelected(validParams);
  };


  const handleFileUpload1 = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const text = await file.text();
  let parsed = text.includes(',') ? text.split(',') : text.split('\n');
  parsed = parsed.map(p => p.trim()).filter(Boolean);

  // Convert names to IDs using parameterMap
  const paramIds = parsed
    .map(name => parameterMap[name])
    .filter(id => id !== undefined); // Remove unmatched names

  if (paramIds.length === 0) {
    alert("No valid parameters found.");
    return;
  }

  setUploadedParams(parsed);
  onParamsSelected(paramIds); // Send IDs to backend
};


  return (
    <div>
      <label htmlFor="paramFile">Upload parameter list (.csv or .txt):</label>
      <input
        type="file"
        accept=".csv,.txt"
        id="paramFile"
        onChange={handleFileUpload}
      />
      {uploadedParams.length > 0 && (
        <div>
          <h4>✅ {uploadedParams.length} parameters selected:</h4>
          <ul>
            {uploadedParams.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploadParamSelector;
