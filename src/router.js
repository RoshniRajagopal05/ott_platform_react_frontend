import { createBrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import ChangePassword from "./components/ChangePassword";
import MovieListingPage from "./components/MovieListingPage";
import MovieDetailsPage from "./components/MovieDetailsPage";
import MyWatchlistPage from "./components/MyWatchlistPage"; 
import WatchHistoryPage from './components/WatchHistoryPage';



const router = createBrowserRouter([
  { path: "/landingpage", element: <LandingPage /> },
  { path: "/", element: <Signup /> },
  { path: "/login", element: <Login /> },
  
  { path: "/change-password", element: <ChangePassword /> },
  { path: "/movielisting", element: <MovieListingPage /> },
  { path: "/moviedetails/:id", element: <MovieDetailsPage /> },
  { path: "/mywatchlist", element: <MyWatchlistPage /> },
  { path: "/watchhistory", element: <WatchHistoryPage/> },
  


]);

export default router;
