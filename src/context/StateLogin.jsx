import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { estadoLoginGlobal } from './contextData'

export default function StateLogin({children}) {

   const [perfil, setPerfil] = useState("");

   const [isLogin, setIsLogin] = useState(false);
   
   
   const login = () => {
      setIsLogin(true)
      console.log("Iniciaste sesión");
   }

   const outLogin = () => {
      setIsLogin(false)
      console.log("Saliste de la sesión");
   }

   return (
      <estadoLoginGlobal.Provider value={{perfil,isLogin, login, outLogin}}>
         {children}
      </estadoLoginGlobal.Provider>
   )
}