
import { useEffect, useState } from 'react';
import './App.css';
import {FaAngleDoubleRight} from 'react-icons/fa'

const url="https://course-api.com/react-tabs-project";
function App() {
  const [loading,setLoading]=useState(true);
  const[jobs,setJobs]=useState([]);
  const[value,setValue]=useState(0);

  const fetchjobs=async()=>{
    try {

      const response=await fetch(url);
      const jobsdata=await response.json();
      setJobs(jobsdata);
      setLoading(false);
      
    } catch (error) {
      
      console.log(error);
      setLoading(false);

    }
  }

  useEffect(()=>{
    fetchjobs();
  },[])

  if(loading)
  {
    return <section className='section loading'>
      <h1>Loading...</h1>
    </section>
  }
  const{company,duties,dates,title}=jobs[value];
  return (
    <section className='section'>
      <div className='title'>
        <h2>Experience</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
      {/*btn Container */}
      <div className='.btn-container'>
        {
          jobs.map((item,index)=>{
            return <button key={item.id} onClick={()=>setValue(index)}
            className={`job-btn ${index===value && 'active-btn'}`}
            >
              {item.company}
            </button>
          })
        }
      </div>

      <article className='job-info'>
        <h3>{title}</h3>
        <h4>{company}</h4>
        <p className='job-date'>{dates}</p>
        {
          duties.map((duty,index)=>{
            return <div className='job-desc' key={index}>
              <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight>
              <p>{duty}</p>
            </div>
          })
        }
      </article>
      </div>
    </section>
  );
}

export default App;
