import {HashRouter,Routes,Route} from 'react-router-dom'
import Navigition from "./nav.js"
import Create from './create.js';
import Deposite from './deposit.js';
import Widthdraw from './widthdraw.js'
import Alldata from './alldata.js';
import Home from './home.js';
import Login from './login.js';


export default function Badbank(){
    return(
        <>
        <HashRouter>
            {/* <userContext.Provider value={{"users":[{
     name:"sadaipandi",
     email:"sadaipandi@gmail.com",
     password:1234,
     balance:100
            }]}}> */}
        <Navigition />
       <Routes>
        <Route path='/Create' element={<Create />} />
        <Route path='/Deposite' element={<Deposite />} />
        <Route path='/Widthdraw' element={<Widthdraw />} />
        <Route path='/Alldata' element={<Alldata />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<Home />} />
       </Routes>
       {/* </userContext.Provider> */}
        </HashRouter>
        </>
    )
}