// Version 1
// import { FC } from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css'; // Optional: for styling

// const Header: FC = () => {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/dashboard">Dashboard</Link></li>
//           <li><Link to="/facturacion">Facturacion</Link></li>
//           <li><Link to="/inscripcion_alumno">Inscripcion Alumno</Link></li>
//           <li><Link to="/inscripcion_terapeuta">Inscripcion Terapeuta</Link></li>
//           <li><Link to="/pagos">Pagos</Link></li>
//           <li><Link to="/calculadora">Calculadora</Link></li>
//           <li><Link to="/reportes_alumnos">Reportes Alumnos</Link></li>
//           <li><Link to="/reportes_industria">Reportes Industria</Link></li>
//           <li><Link to="/profiles">Profiles</Link></li>
//           <li><Link to="/login">Login</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;


// Version 2
// import React from 'react';
// import { Link } from 'react-router-dom';
// import * as Menubar from '@radix-ui/react-menubar';
// import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons';
// import './Header.css';

// const RADIO_ITEMS = ['Andy', 'Benoît', 'Luis'];
// const CHECK_ITEMS = ['Always Show Bookmarks Bar', 'Always Show Full URLs'];

// const MenubarDemo = () => {
//   const [checkedSelection, setCheckedSelection] = React.useState([CHECK_ITEMS[1]]);
//   const [radioSelection, setRadioSelection] = React.useState(RADIO_ITEMS[2]);

//   return (
//     <Menubar.Root className="MenubarRoot">
//       <Menubar.Menu>
//         <Menubar.Trigger className="MenubarTrigger">
//           <Link to="/login" className="link">Login</Link>
//         </Menubar.Trigger>
//       </Menubar.Menu>

//       <Menubar.Menu>
//         <Menubar.Trigger className="MenubarTrigger">
//           <Link to="/" className="link">Home</Link>
//         </Menubar.Trigger>
//       </Menubar.Menu>

//       <Menubar.Menu>
//         <Menubar.Trigger className="MenubarTrigger">
//           <Link to="/dashboard" className="link">Dashboard</Link>
//         </Menubar.Trigger>
//       </Menubar.Menu>

//       <Menubar.Menu>
//         <Menubar.Trigger className="MenubarTrigger">
//           <Link to="/facturacion" className="link">Facturacion</Link>
//         </Menubar.Trigger>
//       </Menubar.Menu>

//       <Menubar.Menu>
//         <Menubar.Trigger className="MenubarTrigger">
//           <Link to="/inscripcion_alumno" className="link">Inscripción de Alumno</Link>
//         </Menubar.Trigger>
//       </Menubar.Menu>

//       <Menubar.Menu>
//         <Menubar.Trigger className="MenubarTrigger">
//           <Link to="/inscripcion_terapeuta" className="link">Inscripcion de Terapeuta</Link>
//         </Menubar.Trigger>
//       </Menubar.Menu>

//       <Menubar.Menu>
//         <Menubar.Trigger className="MenubarTrigger">
//           <Link to="/pagos" className="link">Pagos</Link>
//         </Menubar.Trigger>
//       </Menubar.Menu>

//       <Menubar.Menu>
//         <Menubar.Trigger className="MenubarTrigger">
//           <Link to="/profiles" className="link">Perfiles</Link>
//         </Menubar.Trigger>
//       </Menubar.Menu>

//       <Menubar.Menu>
//         <Menubar.Trigger className="MenubarTrigger">
//           <Link to="/reportes_alumnos" className="link">Reportes de Alumnos</Link>
//         </Menubar.Trigger>
//       </Menubar.Menu>

//       <Menubar.Menu>
//         <Menubar.Trigger className="MenubarTrigger">
//           <Link to="/reportes_industria" className="link">Reportes de Industria</Link>
//         </Menubar.Trigger>
//       </Menubar.Menu>

//     </Menubar.Root>
//   );
// };

// export default MenubarDemo;


// Version 3
// import React from 'react';
// import { Link } from 'react-router-dom';
// import * as NavigationMenu from '@radix-ui/react-navigation-menu';
// import { CaretDownIcon } from '@radix-ui/react-icons';
// import './Header.css';

// const Header = () => {
//   return (
//     <NavigationMenu.Root className="NavigationMenuRoot" orientation="vertical">
//       <NavigationMenu.List className="NavigationMenuList">
//         <NavigationMenu.Item className="NavigationMenuItem">
//             <Link to="/" className="NavigationMenuLink">Home</Link>
//         </NavigationMenu.Item>

//         <NavigationMenu.Item className="NavigationMenuItem">
//           <NavigationMenu.Item className="NavigationMenuTrigger">
//             <NavigationMenu.Trigger>
//               Inscripciones <CaretDownIcon className="CaretDown" aria-hidden />
//             </NavigationMenu.Trigger>
//             <NavigationMenu.Content className="NavigationMenuContent">
//               <NavigationMenu.Sub>   
//                 <NavigationMenu.List className="NavigationMenuList">
//                   <NavigationMenu.Item>
//                     <Link to="/inscripcion_alumno" className="NavigationMenuLink">Alumnos</Link>
//                   </NavigationMenu.Item>
//                   <NavigationMenu.Item>
//                     <Link to="/inscripcion_terapeuta" className="NavigationMenuLink">Terapeutas</Link>
//                   </NavigationMenu.Item>
//                 </NavigationMenu.List>
//               </NavigationMenu.Sub>  
//             </NavigationMenu.Content>            
//           </NavigationMenu.Item>
//         </NavigationMenu.Item>

//         <NavigationMenu.Item className="NavigationMenuItem">
//             <Link to="/calculadora" className="NavigationMenuLink">Calculadora</Link>
//         </NavigationMenu.Item>

//         <NavigationMenu.Item className="NavigationMenuItem">
//             <Link to="/dashboard" className="NavigationMenuLink">Dashboard</Link>
//         </NavigationMenu.Item>

//         <NavigationMenu.Item className="NavigationMenuItem">
//             <Link to="/pagos" className="NavigationMenuLink">Pagos</Link>
//         </NavigationMenu.Item>

//         <NavigationMenu.Item className="NavigationMenuItem">
//           <NavigationMenu.Item className="NavigationMenuTrigger">
//             <NavigationMenu.Trigger>
//               Perfiles <CaretDownIcon className="CaretDown" aria-hidden />
//             </NavigationMenu.Trigger>
//             <NavigationMenu.Content className="NavigationMenuContent">
//               <NavigationMenu.Sub>   
//                 <NavigationMenu.List className="NavigationMenuList">
//                   <NavigationMenu.Item>
//                     <Link to="/profiles_alumnos" className="NavigationMenuLink">Alumnos</Link>
//                   </NavigationMenu.Item>
//                   <NavigationMenu.Item>
//                     <Link to="/profiles_terapeutas" className="NavigationMenuLink">Terapeutas</Link>
//                   </NavigationMenu.Item>
//                 </NavigationMenu.List>
//               </NavigationMenu.Sub>  
//             </NavigationMenu.Content>            
//           </NavigationMenu.Item>
//         </NavigationMenu.Item>


//         <NavigationMenu.Item className="NavigationMenuItem">
//             <Link to="/reportes_alumnos" className="NavigationMenuLink">Reportar Alumno</Link>
//         </NavigationMenu.Item>

//         <NavigationMenu.Item className="NavigationMenuItem">
//             <Link to="/reportes_industria" className="NavigationMenuLink">Reportes de Produccion</Link>
//         </NavigationMenu.Item>

//       </NavigationMenu.List>

//     </NavigationMenu.Root>
//   );
// };

// export default Header;


// Version 4
import React from 'react';
import { Link } from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import './Header.css';
import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';


const Header = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="IconButton" aria-label="Update dimensions">
          <MixerHorizontalIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          {/* <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}> */}

            {/* <p className="Text" style={{ marginBottom: 10 }}>
              Menu
            </p> */}

            <NavigationMenu.Root className="NavigationMenuRoot" orientation="vertical">
              <NavigationMenu.List className="NavigationMenuList">
                <NavigationMenu.Item className="NavigationMenuItem">
                    <Link to="/" className="NavigationMenuLink">Home</Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item className="NavigationMenuItem">
                  <NavigationMenu.Item className="NavigationMenuTrigger">
                    <NavigationMenu.Trigger>
                      Inscripciones <CaretDownIcon className="CaretDown" aria-hidden />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="NavigationMenuContent">
                      <NavigationMenu.Sub>   
                        <NavigationMenu.List className="NavigationMenuList">
                          <NavigationMenu.Item>
                            <Link to="/inscripcion_alumno" className="NavigationMenuLink">Alumnos</Link>
                          </NavigationMenu.Item>
                          <NavigationMenu.Item>
                            <Link to="/inscripcion_terapeuta" className="NavigationMenuLink">Terapeutas</Link>
                          </NavigationMenu.Item>
                        </NavigationMenu.List>
                      </NavigationMenu.Sub>  
                    </NavigationMenu.Content>            
                  </NavigationMenu.Item>
                </NavigationMenu.Item>

                <NavigationMenu.Item className="NavigationMenuItem">
                    <Link to="/calculadora" className="NavigationMenuLink">Calculadora</Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item className="NavigationMenuItem">
                    <Link to="/dashboard" className="NavigationMenuLink">Dashboard</Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item className="NavigationMenuItem">
                    <Link to="/pagos" className="NavigationMenuLink">Pagos</Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item className="NavigationMenuItem">
                  <NavigationMenu.Item className="NavigationMenuTrigger">
                    <NavigationMenu.Trigger>
                      Perfiles <CaretDownIcon className="CaretDown" aria-hidden />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="NavigationMenuContent">
                      <NavigationMenu.Sub>   
                        <NavigationMenu.List className="NavigationMenuList">
                          <NavigationMenu.Item>
                            <Link to="/profiles_alumnos" className="NavigationMenuLink">Alumnos</Link>
                          </NavigationMenu.Item>
                          <NavigationMenu.Item>
                            <Link to="/profiles_terapeutas" className="NavigationMenuLink">Terapeutas</Link>
                          </NavigationMenu.Item>
                        </NavigationMenu.List>
                      </NavigationMenu.Sub>  
                    </NavigationMenu.Content>            
                  </NavigationMenu.Item>
                </NavigationMenu.Item>


                <NavigationMenu.Item className="NavigationMenuItem">
                    <Link to="/reportes_alumnos" className="NavigationMenuLink">Reportar Alumno</Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item className="NavigationMenuItem">
                    <Link to="/reportes_industria" className="NavigationMenuLink">Reportes de Produccion</Link>
                </NavigationMenu.Item>

              </NavigationMenu.List>

            </NavigationMenu.Root>
          {/* </div> */}
          {/* <Popover.Close className="PopoverClose" aria-label="Close">
           <Cross2Icon />
          </Popover.Close> */}
          {/* <Popover.Arrow className="PopoverArrow" /> */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};


export default Header;
