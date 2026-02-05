// import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const ChangePassword = () => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       alert("New password and confirm password do not match!");
//       return;
//     }

//     alert("Password updated successfully!");

//     setCurrentPassword('');
//     setNewPassword('');
//     setConfirmPassword('');
//   };

//   return (
//     <div className="change-password-wrapper">
//       <form className="change-password-form" onSubmit={handleSubmit}>
//         <h2>Change Password</h2>

//         <div className="form-group">
//           {/* <label>Current Password</label> */}
//           <div className="input-with-icon">
//             <input
//               type={showCurrent ? "text" : "password"}
//               placeholder="Enter current password"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               required
//             />
//             <span onClick={() => setShowCurrent(!showCurrent)}>
//               {showCurrent ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//         </div>

//         <div className="form-group">
//           {/* <label>New Password</label> */}
//           <div className="input-with-icon">
//             <input
//               type={showNew ? "text" : "password"}
//               placeholder="Enter New password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//             <span onClick={() => setShowNew(!showNew)}>
//               {showNew ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//         </div>

//         <div className="form-group">
//           {/* <label>Confirm Password</label> */}
//           <div className="input-with-icon">
//             <input
//               type={showConfirm ? "text" : "password"}
//               placeholder="Confirm password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//             <span onClick={() => setShowConfirm(!showConfirm)}>
//               {showConfirm ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//         </div>

//         <button type="submit">Update Password</button>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;




import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/glass-landing.css';



const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match!");
      setSuccessMessage('');
      return;
    }

    const token = localStorage.getItem("token");

     if (!token) {
       alert("You must be logged in to change your password.");
       navigate('/login');
      return;
    }


    try {
      await axios.post(
       'http://127.0.0.1:8000/api/changepassword/',
    {
        current_password: currentPassword,
         new_password: newPassword
    },
   {
       headers: {
       Authorization: `Token ${token}`
      }
    }
    );


      setSuccessMessage("Password updated successfully! Redirecting to login...");
      setErrorMessage('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // ✅ Clear auth and navigate to login after short delay
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }, 2000); // 2 second delay to show message

    } catch (error) {
      console.log("Error response:", error.response?.data);
      setErrorMessage(
        error.response?.data?.detail || 'Failed to update password. Please try again.'
      );
      setSuccessMessage('');
    }
  };

  return (
    <div className="glass-bg">
      <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', paddingTop: '100px' }}>
        <button className="back-btn" onClick={() => navigate('/landingpage')}>
          <FaArrowLeft /> Back to Home
        </button>
        <form className="change-password-form" onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(15px)', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Change Password</h2>

          {errorMessage && <p className="error" style={{ color: '#ff6b6b', textAlign: 'center' }}>{errorMessage}</p>}
          {successMessage && <p className="success" style={{ color: '#4ecdc4', textAlign: 'center' }}>{successMessage}</p>}

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white', fontSize: '16px' }}
              />
              <span onClick={() => setShowCurrent(!showCurrent)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'white' }}>
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white', fontSize: '16px' }}
              />
              <span onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'white' }}>
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: 'white', fontSize: '16px' }}
              />
              <span onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'white' }}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', background: 'linear-gradient(45deg, #667eea, #764ba2)', color: 'white', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s ease' }}>Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

