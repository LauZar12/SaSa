// import * as React from 'react';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import Paper from '@mui/material/Paper';

// import FastfoodIcon from '@mui/icons-material/Fastfood';
// import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';


// export default function BottomNavBar() {
//     const [value, setValue] = React.useState(0);
//     const ref = React.useRef(null);
//     const [messages, setMessages] = React.useState(() => refreshMessages());
  
//     React.useEffect(() => {
//       ref.current.ownerDocument.body.scrollTop = 0;
//       setMessages(refreshMessages());
//     }, [value, setMessages]);
  
//     return (
//       <Box sx={{ pb: 7 }} ref={ref}>
//         <CssBaseline />
//         <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
//           <BottomNavigation
//             showLabels
//             value={value}
//             onChange={(event, newValue) => {
//               setValue(newValue);
//             }}
//           >
//             <BottomNavigationAction label="Lista" icon={<FastfoodIcon />} />
//             <BottomNavigationAction label="Mapa" icon={<MapOutlinedIcon />} />
//             <BottomNavigationAction label="Perfil" icon={<AccountBoxIcon />} />
//           </BottomNavigation>
//         </Paper>
//       </Box>
//     );
// }


import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function BottomNavBar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box  sx={{ bgcolor: '#4C956C', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Restaurantes" icon={<FastfoodIcon />} />
        <BottomNavigationAction label="Mapa" icon={<MapOutlinedIcon />} />
        <BottomNavigationAction label="Perfil" icon={<AccountBoxIcon />} />
      </BottomNavigation>
    </Box>
  );
}
