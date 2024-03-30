import '../css/detect.css'
import { useState } from 'react'
import AccuracyPopup from './accuracypop'

export default function Detect() {
  const [image, setImage] = useState('')
  const [showImg, setShowImg] = useState('')
  const [show, setShow] = useState(false)
  const [showAccuracy,setShowAccuracy] = useState(false)
  const [accuracyData, setAccuracyData] = useState(null); // State to hold accuracy data

  const handlePredict = (e) => {
    e.preventDefault()
    setShow(true)
    setShowImg(image)
  }

  const handleShowAccuracy = ()=>{
    setShowAccuracy(true);
    fetchAccuracyData(); // Fetch accuracy data when showing the accuracy popup
  }

  const fetchAccuracyData = async () => {
    // try {
    //   const response = await fetch('your_backend_endpoint_url');
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch accuracy data');
    //   }
    //   const data = await response.json();
    //   setAccuracyData(data);
    // } catch (error) {
    //   console.error('Error fetching accuracy data:', error);
    // }

    const mockAccuracyData = {
      labels: ['Class 1', 'Class 2', 'Class 3', 'Class 4'],
      data: [80, 65, 70, 90],
    };
    setAccuracyData(mockAccuracyData);
  };

  return (
    <>
      <div className="upload_container">
          <div className="upload_head">
            <h1>Leaf Disease Detection</h1>
          </div>
            <div className="file_choose">
              <input
                type="file"
                onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
              <button
                className='predict_btn'
                onClick={handlePredict}
              >
                Predict Leaf Disease
              </button>
            </div>
            <div className={`${show ? 'show' : 'hidden'} uploaded_img`}>
              <h1 className="uploaded_img_head">
                Original Image
              </h1>
              <div className="uploaded_original_img">
                <img src={showImg} alt="uploaded_image" />
              </div>
              <div className='information'>
              <button
                className='accuracy-btn'
                onClick={handleShowAccuracy}
                >
                  Show Accuracy
                </button>
                {showAccuracy && <AccuracyPopup accuracyData={accuracyData}onClose={() =>setShowAccuracy(false)}/>}
              <div className="predicted_disease">
                Predicted Disease: {"Adfnadi"}
              </div>
              </div>
              
            </div>
          </div>
         
    </>
  )
}