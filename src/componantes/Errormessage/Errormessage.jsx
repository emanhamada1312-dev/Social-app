import { Alert } from '@heroui/react'
import React from 'react'

export default function Errormessage({error}) {
  return (
    <>
         { error && <><Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{error.message}</Alert.Title>
             
              
            </Alert.Content>
           
              </Alert></> }
               
    
               {/* </>:""} */}
      
    </>
  )
}
