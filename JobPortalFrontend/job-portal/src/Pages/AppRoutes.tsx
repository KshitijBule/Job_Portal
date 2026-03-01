import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "../Header/Header"
import FindJobs from "./FindJobs"
import FindTalentPage from "./FindTalentPage"
import TalentProfilepage from './TalentProfilePage';
import PostJobPage from "./PostJobPage"
import JobDescPage from "./JobDescPage"
import ApplyJobPage from "./ApplyJobPage"
import Footer from "../Footer/Footer"
import HomePage from "./HomePage"
import ProfilePage from "./ProfilePage"
import SignUpPage from "./SignUpPage"
import JobHistoryPage from "./JobHistoryPage"
import PostedJobPage from "./PostedJobPage"
import CompanyPage from "./CompanyPage"
import { useSelector } from "react-redux";

const AppRoutes=()=>{
  const user = useSelector((state:any)=>state.user);
  return <BrowserRouter>
      <div className='relative'>
      <Header/>
      <Routes>
        <Route path='/find-jobs' element={<FindJobs/>}/>
        <Route path='/find-talent' element={<FindTalentPage/>}/>
        <Route path='/talent-profile' element={<TalentProfilepage/>}/>
        <Route path='/post-job' element={<PostJobPage/>}/>
        <Route path='/jobs' element={<JobDescPage/>}/>
        <Route path='/apply-job' element={<ApplyJobPage/>}/>
        <Route path='/company' element={<CompanyPage/>}/>
        <Route path='/posted-job' element={<PostedJobPage/>}/>
        <Route path='/job-history' element={<JobHistoryPage/>}/>
        <Route path='/signup' element={user?<Navigate to="/"/>:<SignUpPage/>}/>
        <Route path='/login' element={user?<Navigate to="/"/>:<SignUpPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path="/" element={<HomePage />} />
        
        <Route path='*' element={<HomePage/>}>

        </Route>
      </Routes>

      <Footer/>
      </div>
      </BrowserRouter>
}
export default AppRoutes;