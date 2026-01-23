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
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


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

    const token = localStorage.getItem("authToken");

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
        localStorage.removeItem('authToken');
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
     <>
     <Navbar />
     <div className="change-password-wrapper">
      <form className="change-password-form" onSubmit={handleSubmit}>
        <h2>Change Password</h2>

        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <div className="form-group">
          <div className="input-with-icon">
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required />
            <span onClick={() => setShowCurrent(!showCurrent)}>
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="form-group">
          <div className="input-with-icon">
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required />
            <span onClick={() => setShowNew(!showNew)}>
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="form-group">
          <div className="input-with-icon">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required />
            <span onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit">Update Password</button>
      </form>
    </div></>
  );
};

export default ChangePassword;

