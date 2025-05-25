import React, { useEffect, useState } from "react";
//import Checkboxlist from "../Checkboxlist";
import './Switch.css';
import { motion, AnimatePresence, color } from "framer-motion";
import { MdGeneratingTokens } from "react-icons/md";

import { GrClearOption } from "react-icons/gr";
import Collapsible from 'react-collapsible';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { RiResetLeftFill } from "react-icons/ri";
import { RxReset } from "react-icons/rx";
import { TiUpload } from "react-icons/ti";
import { FiUpload } from "react-icons/fi";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Button from '@mui/material/Button';

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircularProgress from '@mui/material/CircularProgress';


import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import { RestartAlt, RestartAltRounded } from "@mui/icons-material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateIcon from '@mui/icons-material/Update';
import RestoreIcon from '@mui/icons-material/Restore';

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Pagination from '@mui/material/Pagination';

import { BsSearch } from 'react-icons/bs';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { FaFilter } from "react-icons/fa";

import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './notification.css'; 
//import { Bell } from 'lucide-react'; 
import { IoMdNotificationsOutline } from "react-icons/io";

import dayjs from 'dayjs';

import {
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';

function Home(){

    const [data, setData] = useState(null);
    const [pdata,setPdata]=useState(null);
    const [testdevices,setTestdevices]=useState(null);
    const [devicemap,setDevicemap]=useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isActiveAll, setIsActiveAll] = useState(false);
  const [messages, setMessages] = useState([]);

  const [activeStates,setActiveStates]=useState(()=>{
    const initialActiveStates={};
    Object.keys(localStorage).forEach((key)=>{
        if(key.startsWith('Logging')){
            initialActiveStates[key.slice(7)]=localStorage.getItem(key)==='true';
        }
       
    });
    return initialActiveStates;
  });

  const [selectedOptions, setSelectedOptions] = useState(()=>{
        const initialtypes={};
        Object.keys(localStorage).forEach((key)=>{
            if(key.startsWith('type')){
                initialtypes[key.slice(4)]=localStorage.getItem(key);
            }
          
           
        });
        return initialtypes;
      });

  const [tokens, setTokens] = useState({});
  const [upload, setUpload] = useState({});

  const [time,setTime]=useState({});
  const [uploadtime,setUploadTime]=useState({});
  const now=new Date();

  const [isDisabled, setIsDisabled] = useState(false);
  const [value, setValue] = useState(100);
  const [valueAll, setValueAll] = useState(100);
  const [selectedOption, setSelectedOption] = useState('continuous'); // Default selected option
  const [selectedOptionAll, setSelectedOptionAll] = useState('continuous');
  // State to track the checked status of each checkbox
  const [checkedItems, setCheckedItems] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
        'Call Drop Failure': true,
        'Call Drop Success': true,
        'SMS Failure': true,
        'SMS Internal Failure': true,
        'SMS Success': true,
        'PDP Failure': true,
        'PDP Internal Failure': true,
        'PDP Success': true,
        'LTE ATTACH Failure': true,
        'LTE ATTACH Internal Failure': true,
        'LTE ATTACH Success': true,
        'SCG Failure': true,
        'SCG Success': true,
        'All Event': true,
  });
  
  const eventMap = {
        'Call Drop Failure': 0,
        'Call Drop Success': 1,
        'SMS Failure': 2,
        'SMS Internal Failure': 3,
        'SMS Success': 4,
        'PDP Failure': 5,
        'PDP Internal Failure': 6,
        'PDP Success': 7,
        'LTE ATTACH Failure': 8,
        'LTE ATTACH Internal Failure': 9,
        'LTE ATTACH Success': 10,
        'SCG Failure': 11,
        'SCG Success': 12,
        'All Event': 13,
  };
  
  const handleCheckboxChange = (name, isChecked) => {
    setCheckboxes(prevState => ({
      ...prevState,
      [name]: isChecked,
    }));
  };
  
  const handleOptionChange = async (event) => {
    let device=event.target.name; 
   
      setSelectedOptions({...selectedOptions,[event.target.name]:event.target.value });  
   
    let status = "START";
    if(!activeStates[device]) {
        status = "STOP";   
    }
    const deviceData = {
    	Device: device,
    	Logging: status,
    	Periodicity: value.toString(),
    	LoggingType: event.target.value,
    };
    loggingMessageSend(deviceData);
    localStorage.setItem(`type${event.target.name}`,event.target.value);
   

  };
  
  const handleOptionChangeAll = (event) => {
      setSelectedOptionAll(event.target.value);
  };
  
  const sendDataToServer = async (deviceData) => {
	  //const url = 'http://59.145.153.101:5010/updateDeviceInfo';
	  const url = 'https://192.168.58.2:30100/updateDeviceInfo';
	  try {
	    const response = await fetch(url, {
	      method: 'POST',
	      headers: {
		'Content-Type': 'application/json',
	      },
	      body: JSON.stringify(deviceData),
	    });

	    if (response.ok) {
	      const jsonResponse = await response.json();
	      console.log('Response:', jsonResponse);
	    } else {
	      console.error('Error:', response.statusText);
	    }
	  } catch (error) {
	    console.error('Error:', error.message);
	  }
  };
  
  useEffect(() => {

    const socket=new WebSocket('https://192.168.58.2:30100');

    socket.onopen=()=>{
      console.log('connected to websocket');
    }

    socket.onmessage=async(event)=>{
      const sdata=await JSON.parse( event.data);
      const action=sdata["action"];
      if(action==1){
        const{device,status,type}=JSON.parse(event.data);
        localStorage.setItem(`Logging${device}`,status);
        console.log('Device id: ' + device + ' loggingType: ' + (type ? 'event' : 'continuous')+' status: '+ (status ? 'on' : 'off'));
        checklast(device);
        
        if(type==false){
            localStorage.setItem(`type${device}`,'continuous');
            // setSelectedOptions({...selectedOptions,[device]:'continuous' });  
            setSelectedOptions( (prevoption)=>{
              const updatedOption={
                ... prevoption,[device]:'continuous',
              };
              
            //  console.log('option updated');
              return updatedOption;   
            });

          // console.log('selectoption map : ');
          // console.log(selectedOptions)
        }
        else{
            localStorage.setItem(`type${device}`,'event');
            // setSelectedOptions({...selectedOptions,[device]:'event' });  
          //   setSelectedOptions((prevstate)=>({
          //   ... prevstate,[device]:'event',
          // }));
          setSelectedOptions( (prevoption)=>{
            const updatedOption={
              ... prevoption,[device]:'event',
            };
            
           // console.log('option updated');
            return updatedOption;   
          });

          // console.log('selectoption map : ');
          // console.log(selectedOptions)
        }

        //setActiveStates({...activeStates,[device]:status });
        // setActiveStates((prevstate)=>({
        //   ... prevstate,[device]:status,
        // }));

        setActiveStates( (prevoption)=>{
          const updatedOption={
            ... prevoption,[device]:status,
          };
          
         // console.log('status updated');
          return updatedOption;   
        });

        toast['info'](`state updated ${device} `);

        const n_message=`State Updated ${device} `;

        let n_object={};

        n_object.type='info';
        n_object.message=n_message;


        setMessages((prev) => [
          { id: Date.now(), ...n_object },
          ...prev.slice(0, 9), // Keep only last 10
        ]);


        console.log(activeStates)
      //  console.log('state map : ');
        console.log('updated ');
      }
      else if(action == 2){
        const device=await sdata["device"];
        console.log(device);

        setTokens((prevstate)=>({
          ... prevstate,[device]:true,
        }));

        // setTokens({...tokens,d :true });
        // setTokens({...tokens,[device]:true });

      //   tokens.forEach((values, keys) => {
      //     console.log(values, keys);
      // });

        // console.log(typeof(tokens));
        // console.log(typeof(activeStates));
        // console.log(typeof(selectedOptions));
      }
      else if(action==3){
        const device=await sdata["device_serial_no"];
        const state=await sdata["state"];
        console.log(`action=${action} device = ${device} state=${state}` );

        if(state==1){
          setUpload((prevstate)=>({
            ... prevstate,[device]:true,
          }));
          toast['info'](`upload started  ${device} `);

          const n_message=`upload started for ${device} `;

          let n_object={};

          n_object.type='info';
          n_object.message=n_message;


          setMessages((prev) => [
            { id: Date.now(), ...n_object },
            ...prev.slice(0, 9), // Keep only last 10
          ]);
        
        }
        else {

          setTimeout(()=>{
            setUpload((prevstate)=>({
              ... prevstate,[device]:false,
            }));
  
            if(state==0){
              lastupload(device);
              toast.success(`upload success for ${device} `);
              console.log(`${device}: upload success`);
              const n_message=`upload success  ${device} `;

                let n_object={};

                 n_object.type='success';
                 n_object.message=n_message;

                 setMessages((prev) => [
                  { id: Date.now(), ...n_object },
                  ...prev.slice(0, 9), // Keep only last 10
                ]);
            }
            else{
              toast.error(`upload success for ${device} `);
              console.log(`${device}: upload failed `)

              let n_object={};
              const n_message=`upload failed  ${device} `;

              n_object.type='error';
              n_object.message=n_message;

              setMessages((prev) => [
               { id: Date.now(), ...n_object },
               ...prev.slice(0, 9), // Keep only last 10
             ]);
  
            }
          },5000);
        
        }
      }
    }

    socket.onclose=()=>{
      console.log('websocket disconnected');
    }


    initToken();
    fetchData();
     //fetchDashboarddata1();
    // fetchDashboarddata2();
    // fetchDashboarddata3();

    return()=>{
      socket.close();
    };

  },[]);

  
  const handleItemClick = (device) => {
    //console.log("Handle Item Click - Start");
    if(selectedItem != device) {
    	const storedCheckboxes = localStorage.getItem(device);
        if(storedCheckboxes) {
            setCheckboxes(JSON.parse(storedCheckboxes));
        }
        else {
            setCheckboxes(JSON.parse(localStorage.getItem("default")));
        }
        const key = "Logging" + device;
        const status = localStorage.getItem(key);
        if(status) {
            //console.log("Before Status = " + status + " and isActive = " + isActive);
            //setIsActive(status);
            //console.log("Status = " + status + " and isActive = " + isActive);
            setIsActive(status === 'true');
            setIsDisabled(!(status === 'true'));
        }
        else {
            setIsActive(true);
            //setIsDisabled(false);
        }
     
        setSelectedItem(device);
    } 
    
   
    else{
        setSelectedItem(null);
    }
   
    //console.log("Handle Item Click - End");
  };
  
  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  } 

  
  
  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  }
  
  const handleUpdateClick = (device) => {
    console.log("Device = " + device);
    {/*console.log("Event ID = " + inputValue1);
    console.log("Parameter Mask = " + inputValue2);
    const deviceData = {
      Device: device,
      EventID: inputValue1,
      ParameterMask: inputValue2
    }; 
    sendDataToServer(deviceData); */}
    const checkedCheckboxes = Object.keys(checkboxes).filter(
      checkbox => checkboxes[checkbox]
    )
    const checkedIndices = checkedCheckboxes.map((checkbox,index) => eventMap[checkbox]);
    const checkedIndicesString = checkedIndices.join();
    const deviceData = {
      Device: device,
      Events: checkedIndicesString
    };
    sendDataToServer(deviceData);
    localStorage.setItem(device,JSON.stringify(checkboxes));
  }

  const initToken=async()=>{
    try{
      const response = await fetch(`https://192.168.58.2:30100/token`);
      
      const deviceMa = await response.json();
      // console.log(await deviceMap);
      console.log('init token called' );

      if(deviceMa){
        const deviceinfo=new Map(Object.entries( deviceMa['deviceObject']));
        console.log(deviceinfo);

        deviceinfo.forEach((value,key)=>{
         // console.log(`${key} : ${value}`);
        // setTokens({...tokens,[key]:true });
         setTokens((prevstate)=>({
          ... prevstate,[key]:true,
        }));
        });
      }
    
    

      
    }
    catch(error){
      console.error("Error getting token status " + error);
    }
  }

  //initToken();

  const getToken=async(device)=>{
    try{
      const response = await fetch(`https://192.168.58.2:30100/token/${device}`);
      
    
     // console.log(response);
     console.log( 'get token called '+ device)
      

      const status=response.status;
      console.log(status);

     // console.log(response.response);

      if(status==200){
        alert('token  found');
        setTokens({...tokens,[device]:true });

      }
      else if(status==201){
        alert('token not found');
        setTokens({...tokens,[device]:false });
      }

     
      
    }
    catch(error){
      console.error("Error getting token status " + error);
    }
  }

  const eraseToken=async(device)=>{
    try{
      console.log(`erase token called for ${device} `);
      const response = await fetch(`https://192.168.58.2:30100/delete-token/${device}`);
      const status=response.status;
      console.log(status);
      setTokens({...tokens,[device]:false });

     // console.log(response.response);

      // if(status==200){
      //   alert('token  found');
      //   setTokens({...tokens,[device]:true });

      // }
      // else if(status==201){
      //   alert('token not found');
      //   setTokens({...tokens,[device]:false });
      // }

      
    }
    catch(error){
      console.error("Error getting token status " + error);
    }

  }

  const reset=async(device)=>{
    try{
      const response = await fetch(`https://192.168.58.2:30100/reset-data/${device}`);
      const status=response.status;
      console.log(status);
      
    }
    catch(error){
      console.error("Error reseting " + error);
    }

  }



  const LastAvailable= ({device})=>{

      const [time,setTime]=useState('Loading');

      useEffect(()=>{
        const fetchTime=async()=>{
           try{

        const response= await fetch (`https://192.168.58.2:30100/getLastAvail/${device}`);
       const jsonData=  await response.json();
 
       // console.log(jsonData.time);
 
       // const time=jsonData['time'];
       const ts=   jsonData.time || 'no time found'  ; 
       setTime(ts);

           }
           catch(error){
            console.log(error);
           }
        }
        fetchTime();

      },[]);
    

       return (   
          <span>{time} </span>
       )
    
    
  }

  const checklast=async(device)=>{
    try{

      const response= await fetch (`https://192.168.58.2:30100/getLastAvail/${device}`);
     const jsonData=  await response.json();

    //  console.log(jsonData.time);

      setTime((prevstate)=>({
        ... prevstate,[device]:jsonData.time,
      }));

  }
  catch(error){
    console.log(error);
   }
}


const lastupload=async(device)=>{
  try{

    const response= await fetch (`https://192.168.58.2:30100/device/stats2?serial=${device}`);
   const jsonData=  await response.json();

  //  console.log(jsonData.graph2);
   // console.log(jsonData.graph2[0]);

    if(jsonData.graph2[0]){
      const ut=jsonData.graph2[0]['time'];
  //  console.log(ut);
    const tempdate=new Date(ut);

   // const diff=((now-tempdate)/(1000*60*60*24));
   
   // console.log(tempdate);
    //console.log(diff);

    setUploadTime((prevstate)=>({
      ... prevstate,[device]:tempdate,
    }));
    }

    

  

}
catch(error){
  console.log(error);
 }
}

const ping=async(device)=>{
  try{

    const response= await fetch (`https://192.168.58.2:30100/availability-check/${device}`);
    console.log(response);

}
catch(error){
  console.log(error);
 }
}

 
	
  const fetchData = async() => {
    localStorage.setItem("default",JSON.stringify(checkboxes));
    try {
      //const response = await fetch("http://59.145.153.101:5010/numDevices
      const response = await fetch("https://59.145.153.101:5010/numDevices");
      const jsonData = await response.json();

      console.log(jsonData);

      jsonData.deviceList.map( (device,index) => { 
          checklast(device);
          lastupload(device);

          if(!localStorage.getItem(`Logging${device}`)){
              localStorage.setItem(`Logging${device}`,true);
              setActiveStates({...activeStates,[device]:true });

          } 
  
          if(!localStorage.getItem(`type${device}`)){
              localStorage.setItem(`type${device}`,'continuous');
              setSelectedOptions({...selectedOptions,[device]: 'continuous' });  
          } 
          
      });

       
      setData(jsonData);
     // setPdata(jsonData.deviceList);
     const test=jsonData.deviceList.filter(device=>
      device.startsWith('T'));

     //console.log(test);
     setTestdevices(test);
    // setPdata( jsonData.deviceList.slice((page-1)*pagesize,page*pagesize ));

      initializeCheckboxes(jsonData);
     
    

      
    } catch(error) {
      console.error("Error fetching data = " + error);
    }
  };
  
 const fetchDashboarddata1=async()=>{
  try{
    const response = await fetch("https://192.168.58.2:30100/general/stats1?from=2025-03-20 09:00:00&to=2025-03-27 11:00:00");
    const jsonData = await response.json();

    console.log(jsonData);
   // console.log(jsonData.graph1);


  }
  catch(err){
    console.log(`error fetching dashboard data ${err}` );
  }
 }

 const fetchDashboarddata2=async()=>{
  try{
    const response = await fetch("https://192.168.58.2:30100/general/stats2?from=2025-03-20 09:00:00&to=2025-03-27 11:00:00");
    const jsonData = await response.json();

    console.log(jsonData);
   // console.log(jsonData.graph2);


  }
  catch(err){
    console.log(`error fetching dashboard data ${err}` );
  }
 }

 const fetchDashboarddata3=async()=>{
  try{
    const response = await fetch("https://192.168.58.2:30100/general/stats3?from=2025-03-20 09:00:00&to=2025-03-27 11:00:00");
    const jsonData = await response.json();

    console.log(jsonData);
   // console.log(jsonData.graph1);


  }
  catch(err){
    console.log(`error fetching dashboard data ${err}` );
  }
 }

  const initializeCheckboxes = (jsonData) => {
      const initialCheckedState = jsonData.deviceList.reduce((acc, device, index) => {
          acc[device] = false; // Assuming each item has a unique 'id'
          return acc;
      }, {});
      setCheckedItems(initialCheckedState); 
      //console.log(checkedItems);
  }
  
  const loggingMessageSend = async (deviceData) => {
      //const url = 'http://59.145.153.101:5010/updateLoggingInfo';
      const url = 'https://192.168.58.2:30100/updateLoggingInfo';
      try {
	    const response = await fetch(url, {
	      method: 'POST',
	      headers: {
		'Content-Type': 'application/json',
	      },
	      body: JSON.stringify(deviceData),
	    });

	    if (response.ok) {
	      const jsonResponse = await response.json();
	      console.log('Response:', jsonResponse);
	    } else {
	      console.error('Error:', response.statusText);
	    }
	  } catch (error) {
	    console.error('Error:', error.message);
	  }
  }
  
  const toggleSwitch = (device) => {
    if (!(!isNaN(value) && value >= 5 && value <= 1000)) {
      alert('Please enter a number between 5 and 1000');
      return;
    }

    const newActiveState=!activeStates[device];
    setActiveStates({...activeStates,[device]:newActiveState });
    console.log(selectedOptions[device]);
    // setIsActive(!isActive);
    let status = "START";
    if(!newActiveState) {
        status = "STOP";
        setIsDisabled(true);
    }
    else {
        setIsDisabled(false);
    }
    const deviceData = {
    	Device: device,
    	Logging: status,
    	Periodicity: value.toString(),
    	LoggingType: selectedOptions[device],
    };
    loggingMessageSend(deviceData);
    const key = "Logging" + device;
    localStorage.setItem(key,newActiveState);
  };	
  
  const toggleSwitchAll = () => {
      if (!(!isNaN(valueAll) && valueAll >= 5 && valueAll <= 1000)) {
      	alert('Please enter a number between 5 and 1000');
      	return;
      }
      setIsActiveAll(!isActiveAll);
      let status = "START";
      if(isActiveAll) {
          status = "STOP";
      }
      const selectedDevices = Object.keys(checkedItems).filter((key) => checkedItems[key] === true);
      for(const device of selectedDevices) {
        const deviceData = {
    		Device: device,
    		Logging: status,
    		Periodicity: valueAll.toString(),
    		LoggingType: selectedOptionAll,
    	};
    	loggingMessageSend(deviceData);
    	const key = "Logging" + device;
        localStorage.setItem(key,!isActiveAll);
      } 
  };
  
  const handlePeriodicityChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  
  const handlePeriodicityChangeAll = (e) => {
      const inputValue = e.target.value;
      setValueAll(inputValue);
  };
  
  // Handle "Select All" checkbox change
  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    const updatedCheckedItems = Object.fromEntries(
      Object.keys(checkedItems).map((key) => [key, newSelectAll])
    );
    setSelectAll(newSelectAll);
    setCheckedItems(updatedCheckedItems);
  };
  
  const handleCheckboxChangeDevice = (device) => {
          setCheckedItems((prevCheckedItems) => {
          const updatedCheckedItems = {
              ...prevCheckedItems || {}, // Fallback to an empty object if prevCheckedItems is undefined or null
              [device]: !prevCheckedItems?.[device], // Toggle the checkbox state
          };
          
          const allChecked = Object.values(updatedCheckedItems).every(Boolean);
          setSelectAll(allChecked);
          
          return updatedCheckedItems; // Return the updated state
     });
  };

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem' ,color:'white' ,pointerEvents:"auto" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
      {
        transform: 'rotate(180deg)',
      },
    [`& .${accordionSummaryClasses.content}`]: {
      marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
  }));

  const [open, setOpen] = useState(false);
  const [tdevice,setTdevice]=useState(null);

  const handleClickOpen = (device) => {
    setTdevice(device);
    setOpen(true);
  //  console.log(device + 'token');
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleagree=()=>{
    eraseToken(tdevice);
    setOpen(false);
  };

  const [open1, setOpen1] = useState(false);

  const handleClickOpen1 = (device) => {
    setTdevice(device);
    setOpen1(true);
    // console.log(device + 'clear');
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleagree1=()=>{
    reset(tdevice);
    setOpen1(false);
  };

  const [pagesize,setPagesize]=useState(5);

  const [page,setPage]=useState(1);

  const slicedata=async()=>{
   const cur_data=await data.deviceList.slice((page-1)*pagesize,page*pagesize );
   console.log(cur_data);
    setPdata(cur_data);

  }

  // useEffect(()=>{
  //   slicedata();

  // },[page,pagesize ]);

  const pagechange=(p)=>{
      setPage(p);
      const cur_data= data.deviceList.slice((p-1)*pagesize,p*pagesize );
      console.log(cur_data);
       setPdata(cur_data);

        window.scrollTo({top:0,behavior:'smooth'});
     //await slicedata();
  }

  const changepagesize=(e)=>{
    console.log(e.target.name);
    setPage(1);
    setPagesize(e.target.value);
   
    const cur_data=data.deviceList.slice(0 , e.target.value );
    console.log(cur_data);
     setPdata(cur_data);
    

      window.scrollTo({top:0,behavior:'smooth'});
   //await slicedata();
}

const [searchVal, setSearchVal] = useState("");
const [displayp,setDisplayp]=useState(true);
const [notfound,setNotfound]=useState(false);

const handleSearchClick=()=>{
  if (searchVal === "") { setPdata(data.deviceList.slice(0,pagesize));
    setPage(1);
    // setPagesize(2);
    setDisplayp(true);
     return; }
  const filterBySearch = data.deviceList.filter((device) => {
      if (device.toLowerCase()
          .includes(searchVal.toLowerCase())) { return device; }
  })

   filterBySearch.length>0? console.log(filterBySearch): console.log('device not found');
  
  if(filterBySearch.length==0){
    //alert('device not found');
    setNotfound(true);
    return;
  }
  setPdata(filterBySearch);
  setDisplayp(false);
}

const filterlogging=(e)=>{
  console.log(e.target.value);

  if(e.target.value=='all' ){
    setPdata(data.deviceList.slice(0,pagesize));
    setPage(1);
    // setPagesize(2);
    setDisplayp(true);
     return;
  }

  else if( e.target.value=='on'){
    const filterlog= data.deviceList.filter((device) => {
      console.log(device+' '+activeStates[device]);
        if (activeStates[device] ) { return device; }
    })

    console.log(filterlog);
  setPdata(filterlog);
  setDisplayp(false);
  }

  else{
    const filterlog= data.deviceList.filter((device) => {
      console.log(device+' '+activeStates[device]);
        if (!activeStates[device] ) { return device; }
    })

    console.log(filterlog);
  setPdata(filterlog);
  setDisplayp(false);
  }
 
 

  
 
}

const [nopen, setNopen] = useState(false);


 const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeFilter, setActiveFilter] = useState('all');
  const [loggingFilter, setLoggingFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');


  let filteredDevices;
  let pageCount;
   let paginatedDevices

  
  if(data){
     filteredDevices = data.deviceList.filter((device) =>
      device.toLowerCase().includes(searchTerm.toLowerCase())
    );

  //  console.log(filteredDevices);


    if (activeFilter !== 'all') {
      filteredDevices = filteredDevices.filter(
        (device) => device.isActive === (activeFilter === 'active')
      );
    }
  
    if (loggingFilter !== 'all') {
      filteredDevices =  filteredDevices.filter(
        (device) => activeStates[device] === (loggingFilter === 'on')
      );
     // console.log(filteredDevices);
    }

    if (typeFilter !== 'all') {
      filteredDevices =  filteredDevices.filter(
        (device) => (selectedOptions[device]==='event') === (typeFilter === 'event')
      );
      //console.log(filteredDevices);
    }
  
    // sorting
    if (sortField) {
      console.log(sortField);
  
      if(sortField==='lastUploaded'){
        filteredDevices.sort((a, b) => {
          const dateA = uploadtime[a]?dayjs(uploadtime[a]).valueOf(): null;
          const dateB = uploadtime[b]?dayjs(uploadtime[b]).valueOf():null;


          if(dateA===null&&dateB===null) {return 0;}
          if(dateA===null) { return 1;}
          if(dateB===null) { return -1;}
       //  const dateA=
         return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
       });
      }
      else{
        filteredDevices.sort((a, b) => {
          const dateA =  new Date(time[a]);
          const dateB =  new Date(time[b]);

          if(isNaN(dateA)||isNaN(dateB)) return 0;
       //  const dateA=
         return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
       });
      }
    
      //console.log(filteredDevices);
    }

     pageCount = Math.ceil(filteredDevices.length / pagesize);

   paginatedDevices = filteredDevices.slice(
    (page - 1) * pagesize,
    page * pagesize
  );
  }
  

 


  

	
  return (
    <div>
   
     <ToastContainer autoClose={4000}/>

       {/* Notification Icon */}
       <div className="notification-icon" onClick={() => setNopen(!nopen)}>
        {/* <Bell /> */}
        <IoMdNotificationsOutline style={{fontSize:'25px'}}/>

        {messages.length > 0 && <span className="badge">{messages.length}</span>}
      </div>

      {/* Notification Dropdown */}
      {nopen && (
        <div className="dropdown">
          <h4 style={{color:'black'}}>Recent Notifications</h4>
          {messages.length === 0 ? (
            <p style={{color:'black'}}>No notifications</p>
          ) : (
            <ul>
              {messages.map((msg) => (
                <li key={msg.id} className={`type-${msg.type || 'info'}`}>
                  {msg.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="wrapper">
      

        <div className="container" style={{marginLeft:'40px'}}>
        {data? <p> Number of devices = {JSON.stringify(data.numDevices,null,2)} </p> : <p> Number of devices = Loading.... </p>}
        <label>
        	<input
          	type="checkbox"
          	checked={selectAll}
          	onChange={handleSelectAllChange}
        	/>
        	Select All
      	  </label>
            
      	  
        </div>

        <div className="container" style={{ marginLeft: '18px' }}>
         
              <h3 style={{ marginBottom: '5px' ,marginTop :'5px',display:'inline',marginRight:'10px'}}>Logging Type</h3>

              <select value={selectedOptionAll} onChange={handleOptionChangeAll} disabled={isActiveAll} className={isActiveAll? 'disabled-select' :''} >
                <option value="continuous">continuous  </option>
                <option value="event">Event Based  </option>
              </select>
	      
        
          </div>

       

        <div className="container">
        <span >Periodicity </span>
    	        <input
                className="in-text"
      		type="text"
      		value={valueAll}
      		onChange={handlePeriodicityChangeAll}
      		style={{ marginLeft: '20px' }}
              disabled={isActiveAll}
    	  />
            </div>       

             <div className="container">
        <span className="switchText" >Logging </span>
      	  <label className="toggle-switch" style={{ marginLeft: '10px'}}>
      		<input type="checkbox" checked={isActiveAll} onChange={() => toggleSwitchAll()}/>
      		<span className="slider round"></span>
    	  </label>
        
          <Button variant="outlined" startIcon={<UpdateIcon />} style={{marginLeft:'10px',fontSize:'10px'}} >
                 Update
               </Button>
        </div>   
         
      	 
    	  
    	  
    	  
      </div>


      <Grid container spacing={2} sx={{ mb: 3 ,marginTop:'10px',paddingBottom:'10px',paddingRight:'10px',paddingLeft:'10px'}}>
        <Grid item xs={6} sm={3} md={2} >
        {/* <input type="text" placeholder="Serial no" onChange={e => setSearchVal(e.target.value)} style={{borderRadius:'5px'}}  >
        </input> */}
          <TextField
            label="Search Devices"
             variant="outlined"
            //variant='standard'
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
            InputLabelProps={{style:{color:'#80deea'}}}
            InputProps={{
              style:{
                color:'#e0f7fa',
                borderColor:'#00e5ff',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root':{
                '& fieldset':{ borderColor:'#00e5ff'},
              },
              '&:hover fieldset':{
                borderColor:'#1de9b6',
              },
              '&.Mui-focused fieldset':{
                borderColor:'#00e676',
              }
            }}
          />
        </Grid>

       

        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth sx={{color:'#e0f7fa'}}>
            <InputLabel sx={{color:'#80deea'}}>Active</InputLabel>
            <Select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              label="Active"
              sx={{
                color:'#e0f7fa',
                 '.MuiOutlinedInput-notchedOutline':{borderColor:'#00e5ff'},
                '&:hover .MuiOutlinedInput-notchedOutline':{borderColor:'#1de9b6'}
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth sx={{color:'#e0f7fa'}}>
            <InputLabel sx={{color:'#80deea'}}>Type</InputLabel>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              label="Active"
              sx={{
                color:'#e0f7fa',
                 '.MuiOutlinedInput-notchedOutline':{borderColor:'#00e5ff'},
                '&:hover .MuiOutlinedInput-notchedOutline':{borderColor:'#1de9b6'}
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="event">Event</MenuItem>
              <MenuItem value="continuous">Continuous</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth sx={{color:'#e0f7fa'}}>
            <InputLabel sx={{color:'#80deea'}}>Logging</InputLabel>
            <Select
              value={loggingFilter}
              onChange={(e) => setLoggingFilter(e.target.value)}
              label="Logging"
              sx={{
                color:'#e0f7fa',
                 '.MuiOutlinedInput-notchedOutline':{borderColor:'#00e5ff'},
                '&:hover .MuiOutlinedInput-notchedOutline':{borderColor:'#1de9b6'}
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="on">On</MenuItem>
              <MenuItem value="off">Off</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth sx={{color:'#e0f7fa'}}>
            <InputLabel sx={{color:'#80deea'}}>Sort By</InputLabel>
            <Select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              label="Sort By"
              sx={{
                color:'#e0f7fa',
                 '.MuiOutlinedInput-notchedOutline':{borderColor:'#00e5ff'},
                '&:hover .MuiOutlinedInput-notchedOutline':{borderColor:'#1de9b6'}
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="lastAvailable">Last Available</MenuItem>
              <MenuItem value="lastUploaded">Last Uploaded</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={1}>
          <FormControl fullWidth sx={{color:'#e0f7fa'}}>
            <InputLabel sx={{color:'#80deea'}}>Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              label="Order"
              sx={{
                color:'#e0f7fa',
                 '.MuiOutlinedInput-notchedOutline':{borderColor:'#00e5ff'},
                '&:hover .MuiOutlinedInput-notchedOutline':{borderColor:'#1de9b6'}
              }}
            >
              <MenuItem value="desc">Newest</MenuItem>
              <MenuItem value="asc">Oldest</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>


      {/* {data? <p> Number of devices = {JSON.stringify(data.numDevices,null,2)} </p> : <p> Number of devices = Loading.... </p>}*/ }
      {paginatedDevices && Object.keys(checkedItems).length > 0? <ul>{paginatedDevices.map((device,index) => ( <li key={index}  style={{ padding: "10px 0", borderBottom: "1px solid #ccc", borderTop: "1px solid #ccc"}}> 

      

        <Accordion elevation={0} sx={{backgroundColor:'black' ,color :'white'  }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon  style={{color:'white' ,pointerEvents:'auto'  }}/>}
          aria-controls={`panel-${index}-content`}
          id={`panel-${index}-header`}
        >
          {/* <Typography component="span">Accordion 1</Typography> */}

          <Box 
          sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            width:'100%'
          }} >
        
          <div style={{paddingLeft:'0px'}}> 
             
             <label key={device}>
                <input
                  type="checkbox"
                 disabled={checkedItems === null}
                 checked={checkedItems[device] || false}
                onChange={() =>{  handleCheckboxChangeDevice(device)}}
                onClick={(e)=>{e.stopPropagation()}} 
                />
            </label> 

          
     
             <motion.span 
                onClick={() => handleItemClick(device)}
                 whileHover={{ color: "#3498db" }} style={{fontSize:'medium'}}> {device}  </motion.span>

          <div onClick={(e)=> {e.stopPropagation();getToken(device) } }  style={{ backgroundColor: tokens[device]? '#34A853':'#EA4335' ,boxShadow: tokens[device]? '0px 0px 12px rgba(52,168,83,0.6)':' 0px 0px 12px rgba(234,67,53,0.6)'  } } className="token">
           {/* <MdGeneratingTokens /> */}
          
           </div> 


           <div style={{display:'inline-block' ,position:'absolute' ,marginLeft:'30px',alignItems:'center'}} > 
                {/* <LastAvailable device={device} /> */}
                <Tooltip title="Check last Available" onClick={(e)=>{e.stopPropagation(); checklast(device)}}  >
               
                <span  > 
                < RestoreIcon    />
                </span>       
                          
             </Tooltip>

             <div style={{display:'inline-block' ,position:'absolute' ,marginLeft:'10px',alignItems:'center' ,width:'70px'}}>
             {/* {time[device]? time[device]: 'time not found' } */}
             {time[device]}
             </div>

             <div style={{display:'inline-block' ,position:'absolute' ,marginLeft:'70px',alignItems:'center',width:'170px' }} >
             <Button variant="outlined"  style={{marginLeft:'10px',fontSize:'10px'}}  onClick={(e) => { e.stopPropagation(); ping(device)}} >
                 Ping
               </Button>
               {upload[device]?  <span>
               <CircularProgress size={20} style={{marginLeft:'10px'}} />
                <span style={{marginLeft:'5px',color:'#1976d2'}}>uploading</span>
               </span> : '' }
              
              
               
              
             </div>
              
               
           </div>
           </div>

           <div style={{ marginLeft: '82px' }}>
                  {/* <h3 style={{ marginBottom: '5px' ,marginTop :'5px',display:'inline',marginRight:'10px'}} >Logging Type</h3> */ }
                     < select className={activeStates[device] ? 'disabled-select' :''} name={device} value={selectedOptions[device]} onChange={(e)=>{ handleOptionChange(e); e.stopPropagation();} } onClick={(e)=>{e.stopPropagation()}}  disabled={activeStates[device]}>
                        <option value="continuous">continuous  </option>
                        <option value="event">Event Based  </option>
                    </select>
                </div>

              <div>
                {/* <span style={{ marginLeft: '20px' }}>Periodicity </span> */}
    	        <input
                className="in-text " 
      		type="text"
      		value={value}
      		onChange={handlePeriodicityChange}
      		style={{ marginLeft: '20px' }}
      		disabled = {activeStates[device]}
          onClick={(e)=>{e.stopPropagation()}} 
    	     />

                </div>

              <div>
                 
               {/* <span className="switchText">Logging {activeStates[device] ? 'ON' : 'OFF'} </span> */}
             <label className="toggle-switch">
             <input type="checkbox" checked={activeStates[device]} onChange={() =>{ toggleSwitch(device)} }/>
             <span className="slider round"></span>
             </label>
               {/* <button  onClick={(e) => { e.stopPropagation() ;handleUpdateClick(device)} } className="update">Update</button> */}
                <Button variant="outlined" startIcon={<UpdateIcon />} onClick={(e) => { e.stopPropagation() ;handleUpdateClick(device)} } style={{marginLeft:'10px',fontSize:'10px'}} >
                 Update
               </Button> 
               </div>
               </Box>

        </AccordionSummary>
        <AccordionDetails>
 
         <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>handleClickOpen(device) } style={{fontSize:'10px'}} size="small">
        Clear Token 
      </Button> 

      

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
       
      >
        <DialogTitle id="alert-dialog-title">
          {"Clear Token confirmed? "}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleagree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
       <Tooltip  title= {activeStates[device]? "turn off logging to reset data" :"" } arrow="true" followcursor="true">
        <span>
        <Button variant="outlined" startIcon={<RestartAltRounded />} onClick={()=> handleClickOpen1(device)} size="small" style={{marginLeft:'10px',fontSize:'10px',backgroundColor: activeStates[device]? 'grey':''}} disabled={activeStates[device]}  >
        Reset data 
      </Button> 
        </span>
      
      </Tooltip>


      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
       
      >
        <DialogTitle id="alert-dialog-title">
          {"Reset data confirmed? "}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose1}>Disagree</Button>
          <Button onClick={handleagree1} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
           
           <div style={{display:'flex',alignItems:'center', marginTop:'10px',fontSize:'14px'}}>
           <div  style={{marginRight:'8px', backgroundColor: ((now-uploadtime[device])/(1000*60*60*24))<=1? '#34A853': ((now-uploadtime[device])/(1000*60*60*24))<=7?  '#e9ec13':'#EA4335' ,boxShadow: ((now-uploadtime[device])/(1000*60*60*24))<=1? '0px 0px 12px rgba(52,168,83,0.6)': ((now-uploadtime[device])/(1000*60*60*24))<=7? '0px 0px 12px rgba(234, 231, 53, 0.6)' :' 0px 0px 12px rgba(234,67,53,0.6)'  } } className="token">
           {/* <MdGeneratingTokens /> */}
          
           </div> 

           Last Uploaded : 
           <span style={{marginLeft:'10px',width:'77px',marginTop:'10px'}}>
           {uploadtime[device] && uploadtime[device].toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}
           </span>
           

           <span style={{cursor: 'pointer',marginLeft:'4px',marginTop:'4px' }}>
           <Tooltip title="Check last Uploaded" onClick={(e)=>{lastupload(device)}}  >     
               {/* < RestoreIcon   />      */}
               {/* <TiUpload />              */}
               <FiUpload />
            </Tooltip>
           </span>

          
           
          
           </div>

       




          {/* <Tooltip title="clear token"  >
            <span>
              Clear Token
            <GrClearOption   style={{fontSize:'100%'}} />
            </span>
              
                
               
                
              </Tooltip> */}
              <div style={{display:'flex' ,justifyContent:'center',alignItems:'center',gap:'25px'}}>
              
              {/* http://localhost:3000/d-solo/aegibebd6a4n4a/device-events?orgId=1&from=1741957608764&to=1742562408764&timezone=browser&var-Device=${device}&panelId=1&__feature.dashboardSceneSolo */}
              {/* <iframe frameborder="0" src={`http://localhost:3000/d-solo/aegibebd6a4n4a/device-events?orgId=1&timezone=browser&from=now-9d&to=now&var-Device=${device}&panelId=2&__feature.dashboardSceneSolo`} width="450" height="200" ></iframe>
              <iframe src={`http://localhost:3000/d-solo/aegibebd6a4n4a/device-events?orgId=1&from=now-9d&to=now&timezone=browser&var-Device=${device}&panelId=7&__feature.dashboardSceneSolo`} width="450" height="200" frameborder="0"></iframe> */}
              {/* <iframe frameborder="0" src={`http://localhost:3000/d-solo/aegibebd6a4n4a/device-events?orgId=1&timezone=browser&from=now-9d&to=now&var-Device=${device}&panelId=1&__feature.dashboardSceneSolo`} width="450" height="200" ></iframe> */}
              
              {/* <iframe src={`http://localhost:3000/goto/70ZugVoHg?orgId=1?from=now-7d&to=now&var-Device=${device}`} width="650" height="400" frameborder="0"></iframe> */}
              </div>
        </AccordionDetails>
      </Accordion>
        {/* <div  style={{position:'fixed' ,marginLeft:'10px' ,marginTop:'15px'}}>
          
        
           
                
               
             
              </div> */}
            

           
         
            {/* <div className="switch-container"> 				
            </div> */}
           
          {/* </motion.div> */}
        {/* )} </AnimatePresence>  */}
      
        </li> ))}</ul>
         : <p> List of Devices is Loading.... </p> }
        
       { data&&displayp? 
        <div style={{display:'flex' , justifyContent:'left',marginTop:'25px',alignItems:'center' }}>
          
          
         <p style={{marginLeft:'5px',color:' #1976d2',fontSize:'small'}}>  Rows per page</p>
          <select name="pagesize" className="pageselect" style={{color:' #1976d2',backgroundColor:'black',width:'auto',marginRight:'10px',marginLeft:'5px'}} 
          onChange={(e)=>{
            changepagesize(e);
          }}  defaultValue={pagesize} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
          
         

         <Pagination   
               count={ pageCount   } 
               size="medium"   
               page={page}
            onChange={(_, val) => setPage(val)}
                color="primary" 
                variant="outlined"
            shape="rounded"
         /> 

     <Snackbar open={notfound} autoHideDuration={3000} onClose={()=>setNotfound(false)}>
        <Alert
          onClose={()=>setNotfound(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          device {searchVal}  not found 
        </Alert>
      </Snackbar> 


        </div>  :   ''}


        <div style={{marginTop:'70px',marginBottom:'100px'}}>
       <span style={{marginLeft:'40px',marginBottom:'20px'}}>
       Test Devices ={testdevices&&testdevices.length} 
        </span> 

{testdevices && Object.keys(checkedItems).length > 0? <ul>{testdevices.map((device,index) => ( <li key={index}  style={{ padding: "10px 0", borderBottom: "1px solid #ccc", borderTop: "1px solid #ccc"}}> 



<Accordion elevation={0} sx={{backgroundColor:'black' ,color :'white'  }}>
<AccordionSummary
expandIcon={<ExpandMoreIcon  style={{color:'white' ,pointerEvents:'auto'  }}/>}
aria-controls={`panel-${index}-content`}
id={`panel-${index}-header`}
>
{/* <Typography component="span">Accordion 1</Typography> */}

<Box 
sx={{
display:'flex',
justifyContent:'space-between',
alignItems:'center',
width:'100%'
}} >

<div style={{paddingLeft:'0px'}}> 

<label key={device}>
<input
  type="checkbox"
 disabled={checkedItems === null}
 checked={checkedItems[device] || false}
onChange={() =>{  handleCheckboxChangeDevice(device)}}
onClick={(e)=>{e.stopPropagation()}} 
/>
</label> 



<motion.span 
onClick={() => handleItemClick(device)}
 whileHover={{ color: "#3498db" }} style={{fontSize:'medium'}}> {device}  </motion.span>

<div onClick={(e)=> {e.stopPropagation();getToken(device) } }  style={{ backgroundColor: tokens[device]? '#34A853':'#EA4335' ,boxShadow: tokens[device]? '0px 0px 12px rgba(52,168,83,0.6)':' 0px 0px 12px rgba(234,67,53,0.6)'  } } className="token">
{/* <MdGeneratingTokens /> */}

</div> 


<div style={{display:'inline-block' ,position:'absolute' ,marginLeft:'30px',alignItems:'center'}} > 
{/* <LastAvailable device={device} /> */}
<Tooltip title="Check last Available" onClick={(e)=>{e.stopPropagation(); checklast(device)}}  >

<span  > 
< RestoreIcon    />
</span>       
          
</Tooltip>

<div style={{display:'inline-block' ,position:'absolute' ,marginLeft:'10px',alignItems:'center' ,width:'70px'}}>
{/* {time[device]? time[device]: 'time not found' } */}
{time[device]}
</div>

<div style={{display:'inline-block' ,position:'absolute' ,marginLeft:'70px',alignItems:'center',width:'170px' }} >
<Button variant="outlined"  style={{marginLeft:'10px',fontSize:'10px'}}  onClick={(e) => { e.stopPropagation(); ping(device)}} >
 Ping
</Button>
{upload[device]?  <span>
<CircularProgress size={20} style={{marginLeft:'10px'}} />
<span style={{marginLeft:'5px',color:'#1976d2'}}>uploading</span>
</span> : '' }




</div>


</div>
</div>

<div style={{ marginLeft: '82px' }}>
  {/* <h3 style={{ marginBottom: '5px' ,marginTop :'5px',display:'inline',marginRight:'10px'}} >Logging Type</h3> */ }
     < select className={activeStates[device] ? 'disabled-select' :''} name={device} value={selectedOptions[device]} onChange={(e)=>{ handleOptionChange(e); e.stopPropagation();} } onClick={(e)=>{e.stopPropagation()}}  disabled={activeStates[device]}>
        <option value="continuous">continuous  </option>
        <option value="event">Event Based  </option>
    </select>
</div>

<div>
{/* <span style={{ marginLeft: '20px' }}>Periodicity </span> */}
<input
className="in-text " 
type="text"
value={value}
onChange={handlePeriodicityChange}
style={{ marginLeft: '20px' }}
disabled = {activeStates[device]}
onClick={(e)=>{e.stopPropagation()}} 
/>

</div>

<div>
 
{/* <span className="switchText">Logging {activeStates[device] ? 'ON' : 'OFF'} </span> */}
<label className="toggle-switch">
<input type="checkbox" checked={activeStates[device]} onChange={() =>{ toggleSwitch(device)} }/>
<span className="slider round"></span>
</label>
{/* <button  onClick={(e) => { e.stopPropagation() ;handleUpdateClick(device)} } className="update">Update</button> */}
<Button variant="outlined" startIcon={<UpdateIcon />} onClick={(e) => { e.stopPropagation() ;handleUpdateClick(device)} } style={{marginLeft:'10px',fontSize:'10px'}} >
 Update
</Button> 
</div>
</Box>

</AccordionSummary>
<AccordionDetails>

<Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>handleClickOpen(device) } style={{fontSize:'10px'}} size="small">
Clear Token 
</Button> 



<Dialog
open={open}
onClose={handleClose}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"

>
<DialogTitle id="alert-dialog-title">
{"Clear Token confirmed? "}
</DialogTitle>
{/* <DialogContent>
<DialogContentText id="alert-dialog-description">
</DialogContentText>
</DialogContent> */}
<DialogActions>
<Button onClick={handleClose}>Disagree</Button>
<Button onClick={handleagree} autoFocus>
Agree
</Button>
</DialogActions>
</Dialog>
<Tooltip  title= {activeStates[device]? "turn off logging to reset data" :"" } arrow="true" followcursor="true">
<span>
<Button variant="outlined" startIcon={<RestartAltRounded />} onClick={()=> handleClickOpen1(device)} size="small" style={{marginLeft:'10px',fontSize:'10px',backgroundColor: activeStates[device]? 'grey':''}} disabled={activeStates[device]}  >
Reset data 
</Button> 
</span>

</Tooltip>


<Dialog
open={open1}
onClose={handleClose1}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"

>
<DialogTitle id="alert-dialog-title">
{"Reset data confirmed? "}
</DialogTitle>
{/* <DialogContent>
<DialogContentText id="alert-dialog-description">
</DialogContentText>
</DialogContent> */}
<DialogActions>
<Button onClick={handleClose1}>Disagree</Button>
<Button onClick={handleagree1} autoFocus>
Agree
</Button>
</DialogActions>
</Dialog>

<div style={{display:'flex',alignItems:'center', marginTop:'10px',fontSize:'14px'}}>
<div  style={{marginRight:'8px', backgroundColor: ((now-uploadtime[device])/(1000*60*60*24))<=1? '#34A853': ((now-uploadtime[device])/(1000*60*60*24))<=7?  '#e9ec13':'#EA4335' ,boxShadow: ((now-uploadtime[device])/(1000*60*60*24))<=1? '0px 0px 12px rgba(52,168,83,0.6)': ((now-uploadtime[device])/(1000*60*60*24))<=7? '0px 0px 12px rgba(234, 231, 53, 0.6)' :' 0px 0px 12px rgba(234,67,53,0.6)'  } } className="token">
{/* <MdGeneratingTokens /> */}

</div> 

Last Uploaded : 
<span style={{marginLeft:'10px',width:'77px',marginTop:'10px'}}>
{uploadtime[device] && uploadtime[device].toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}
</span>


<span style={{cursor: 'pointer',marginLeft:'4px',marginTop:'4px' }}>
<Tooltip title="Check last Uploaded" onClick={(e)=>{lastupload(device)}}  >     
{/* < RestoreIcon   />      */}
{/* <TiUpload />              */}
<FiUpload />
</Tooltip>
</span>




</div>






{/* <Tooltip title="clear token"  >
<span>
Clear Token
<GrClearOption   style={{fontSize:'100%'}} />
</span>




</Tooltip> */}
<div style={{display:'flex' ,justifyContent:'center',alignItems:'center',gap:'25px'}}>

{/* http://localhost:3000/d-solo/aegibebd6a4n4a/device-events?orgId=1&from=1741957608764&to=1742562408764&timezone=browser&var-Device=${device}&panelId=1&__feature.dashboardSceneSolo */}
{/* <iframe frameborder="0" src={`http://localhost:3000/d-solo/aegibebd6a4n4a/device-events?orgId=1&timezone=browser&from=now-9d&to=now&var-Device=${device}&panelId=2&__feature.dashboardSceneSolo`} width="450" height="200" ></iframe>
<iframe src={`http://localhost:3000/d-solo/aegibebd6a4n4a/device-events?orgId=1&from=now-9d&to=now&timezone=browser&var-Device=${device}&panelId=7&__feature.dashboardSceneSolo`} width="450" height="200" frameborder="0"></iframe> */}
{/* <iframe frameborder="0" src={`http://localhost:3000/d-solo/aegibebd6a4n4a/device-events?orgId=1&timezone=browser&from=now-9d&to=now&var-Device=${device}&panelId=1&__feature.dashboardSceneSolo`} width="450" height="200" ></iframe> */}

{/* <iframe src={`http://localhost:3000/goto/70ZugVoHg?orgId=1?from=now-7d&to=now&var-Device=${device}`} width="650" height="400" frameborder="0"></iframe> */}
</div>
</AccordionDetails>
</Accordion>
{/* <div  style={{position:'fixed' ,marginLeft:'10px' ,marginTop:'15px'}}>






</div> */}




{/* <div className="switch-container"> 				
</div> */}

{/* </motion.div> */}
{/* )} </AnimatePresence>  */}

</li> ))}</ul>
: <p> List of Devices is Loading.... </p> }

        </div>

     
      
    </div>
  );
}

export default Home;