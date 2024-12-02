import React, { useState, useRef } from 'react';
import './App.css';
import html2canvas from 'html2canvas';
const myImage = process.env.PUBLIC_URL + '/spirit-ticket.PNG';


function App() {
  const [text1, setText1] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedImageURL, setGeneratedImageURL] = useState(''); // Holds the generated image URL
  const imageRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = () => {
    html2canvas(imageRef.current, {
      scale: 1, // Prevent excessive scaling
      useCORS: true, // Handle cross-origin images
      width: 1280, // Match the container width
      height: 427, // Match the container height
    }).then((canvas) => {
      const imgURL = canvas.toDataURL('image/png');
      setGeneratedImageURL(imgURL); // Save the generated image URL to state
    });
  };

  return (
    <div className="App">
      <div className="input-container">
        <input
          type="text"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          placeholder="Enter text"
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={generateImage}>Generate</button>
      </div>

      <div className="image-container" ref={imageRef}>
        <img src={myImage} alt="Main" className="overlay-image" />
        {uploadedImage && (
          <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
        )}
        <div className="text-overlay">{text1}</div>
      </div>

      {generatedImageURL && (
        <div className="generated-image-container">
          <p style={{ marginTop: '20px', fontSize: '18px', color: 'black' }}>
            Save the image below:
          </p>
          <img src={generatedImageURL} alt="Generated" />
        </div>
      )}
    </div>
  );
}

export default App;
