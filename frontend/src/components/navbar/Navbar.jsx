import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../utils/auth'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navabar({ navigation }) {
  let user={};
  let userMail=""
  let userRole=""
 try{
   user = jwtDecode(Cookies.get('token'));
    userMail = user.sub;
    userRole = user.authorities.substring(5).charAt(0).toUpperCase()+user.authorities.substring(6).toLowerCase();
 }catch{
  window.location.href="/ "
 }
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
  }
  useEffect(()=>{

  },[])
  return (

    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                Mobile menu button
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-lime-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />

                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item,index) => (
                      <NavLink
                        className="navlink"
                        key={item.name}
                        to={item.href}
                        
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <AccountCircleIcon style={{fontSize:"40px",color:"white"}} />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2  origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={{zIndex:"2000"}} >

                      <Menu.Item >
                        {({ active }) => (
                          <Link

                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={() => handleLogout()}
                          >

                            <div style={{display:"flex",width:"300px",alignItems:"center",gap:"30px"}}> 
                              <div>
                                <AccountCircleIcon style={{fontSize:"70px"}} />
                              </div>
                              <div className='details' style={{textAlign:"left"}}>

                                <div style={{fontWeight:"bold"}}>
                                  {userMail}
                                </div>
                                <div>
                                  {userRole}
                                </div>
                              </div>
                            </div>
                          </Link>
                        )}
                      </Menu.Item>
                      <hr />
                      <hr />
                      <hr />
                      <hr />
                      <Menu.Item style={{display:"flex",justifyContent:"center"}}>
                        {({ active }) => (
                          <Link

                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={() => handleLogout()}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-lime-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
