import '../css/detect.css'
import { useState } from 'react'
import AccuracyPopup from './accuracypop'
import axios from 'axios'

export default function Detect() {
  const [image, setImage] = useState('')
  const [showImg, setShowImg] = useState('')
  const [show, setShow] = useState(false)
  const [showAccuracy, setShowAccuracy] = useState(false)
  const [accuracyData, setAccuracyData] = useState(null);
  const [predictedDisease, setPredictedDisease] = useState(''); // State to hold accuracy data
  const [cause, setCause] = useState(''); // State to hold accuracy data
  const [solution, setSolution] = useState(''); // State to hold accuracy data
  const [loading, setLoading] = useState(false)

  const handlePredict = async (e) => {
    e.preventDefault();
    setShow(true);
    setLoading(true);
    setShowImg(URL.createObjectURL(image));

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://192.168.222.145:8000/api/upload_image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Extract predicted disease from the response
      const { predictedDisease } = response.data.plant_disease.name;
      setPredictedDisease(response.data.plant_disease.name);
      setCause(response.data.plant_disease.cause);
      setSolution(response.data.plant_disease.solution);
    } catch (error) {
      console.error('Error predicting disease:', error);
    }
    finally {
      setLoading(false); // Set loading to false when receiving response
    }
  };

  const handleShowAccuracy = () => {
    setShowAccuracy(true);
    fetchAccuracyData(); // Fetch accuracy data when showing the accuracy popup
  };

  const fetchAccuracyData = async () => {
    try {
      // Simulated accuracy data
      const data = { accuracy: '90%' };
      setAccuracyData(data);
    } catch (error) {
      console.error('Error fetching accuracy data:', error);
    }
  };

  return (
    <>
      <div className="upload_container">
        <div className="uploadhead">
          <h1>Plant Disease Detection</h1>
        </div>
        <div className="file_choose">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])} />
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
          {showImg ? (
            <div className="uploaded_original_img">
              {loading && <div className='loading-spinner'></div>} {/* Loading animation */}
              {showImg && !loading && <img src={showImg} alt="uploaded_image" />}
            </div>
          ) : (
            <canvas className="blank_canvas" />
          )}
          <div className='information'>
            
            <div className="predicted_disease">
              Predicted Disease: {predictedDisease}
            </div>
            <div className="predicted_disease">
              Cause: {cause}
            </div>
            <div className="predicted_disease">
              Cure: {solution}
            </div>
          </div>
        </div>
        <button
          className='accuracy-btn'
          onClick={handleShowAccuracy}
        >
          Show Accuracy
        </button>
        {showAccuracy && <AccuracyPopup accuracyData={accuracyData} onClose={() => setShowAccuracy(false)} />}
      </div>
    </>
  )
}
