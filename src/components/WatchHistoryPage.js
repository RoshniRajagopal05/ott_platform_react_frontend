import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const WatchHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
  const token = localStorage.getItem("authToken"); 
  axios.get("http://127.0.0.1:8000/api/watchhistory/", {
    headers: {
      Authorization: `Token ${token}`,
    }
  })
  .then(res => {
    setHistory(res.data);
    console.log(res.data);
})

  .catch(err => console.error("Error fetching watch history:", err));
}, [history]);



  return (
      <>
      <Navbar />
      <div className="container mt-4">
      <h2 className="text-center mb-4">Watch History</h2>
      <div className="row">
        {history.length === 0 ? (
          <p className="text-center">No watch history yet.</p>
        ) : (
          history.map(item => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card">
                <img
                  src={`http://127.0.0.1:8000/${item.movie.thumbnail}`}
                  className="card-img-top"
                  alt={item.movie.title} />
                <div className="card-body">
                  <h5 className="card-title">{item.movie.title}</h5>
                  <p className="card-text">
                    Watched on: {new Date(item.watched_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div></>
  );
};

export default WatchHistoryPage;
