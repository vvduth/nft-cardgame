import React from 'react'
import { PageHOC } from '../components'

const CreateBattle = () => {
    return (
      <div>
            <h1 className='text-white text-xl'>Hello from CreateBattle</h1>
      </div>
    )
  };
  
  export default PageHOC(CreateBattle , <>Create a new battle <br/></>, 
    <>
      Create your own battle <br/> and wait for other players.
    </>
  
  );