import axios from 'axios';
import { useState } from 'react'

function App() {
  const [zone,setZone] = useState('central');
  const [organization_id, setOrganization_id] = useState('');
  const [total_distance, setTotal_distance]  = useState('');
  const [item_type, setItem_type] = useState('perishable');
  const [total,setTotal]= useState(0);
  axios.defaults.baseURL = 'http://localhost:8080';
  const handleSubmit = async (ev)=>{
    ev.preventDefault();
    try{
       await axios.post('/calculate-price',{
        zone,
        organization_id,
        total_distance,
        item_type
      }).then((res)=>{
        console.log(res.data);
        setTotal(res.data.total_price);
      })
    }
    catch(e){
      alert('Enter valid data');
    }
  }

  return (
    <>
    <div className='flex flex-col justify-center items-center'>
    <div className ='mt-[100px]  text-2xl'>
          Total Price: {total} cents
    </div>
    <form onSubmit={handleSubmit} className=' rounded-2xl bg-blue-300 flex flex-col w-[400px] h-[400px]   justify-evenly items-center' action="">
       <select className='p-2 rounded-md outline-none'  value={zone}  onChange={(e)=>setZone(e.target.value)} id="zone">
        <option value="central">Central</option>
        <option value="eastern">Eastern</option>
        <option value="southern">Southern</option>
        <option value="northern">Northern</option>
      </select>
        <label htmlFor="">Organization  ID</label>
        <input className='p-2 rounded-lg' value={organization_id} onChange={(e)=> setOrganization_id(e.target.value)} item_type="number" />
        <label htmlFor="">Total total_distance</label>
        <input className='p-2 rounded-lg' value={total_distance} onChange={(e)=> setTotal_distance(e.target.value)} item_type="number" />
         <select  className='p-2 rounded-md outline-none' value={item_type}   onChange={(e)=> setItem_type(e.target.value)} id="item_type">
          <option value="perishable">perishable</option>
          <option value="non-perishable">non-perishable</option>
       </select>
        <button className='bg-green-500 p-3'>Submit</button>
       </form>
        
     </div>

     
    
    </>
  )
}

export default App
