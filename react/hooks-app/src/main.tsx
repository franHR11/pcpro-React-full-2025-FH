import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { InstagromApp } from './07-useOptimistic/InstagromApp'
// import { Toaster } from 'sonner'
// import { ClientInformation } from './08-use-suspense/ClientInformation'
// import { getUserAction } from './08-use-suspense/api/get-user.action'
import { ProfessionalApp } from './09-useContext/ProfessionalApp'
// import { MemoCounter } from './06-memos/MemoCounter'
// import HooksApp from './HooksApp'
// import { TrafficLight } from './01-useState/TrafficLight'
// import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect'
// import { TrafficLightWithHook } from './02-useEffect/TrafficLightWithHook'
// import { PokemonPage } from './03-examples/PokemonPage'
// import { FocusScreen } from './04-useRef/FocusScreen'
// import { TasksApp } from './05-useReducer/TaskApp'
// import { ScrambleWords } from './05-useReducer/ScrambleWords'
// import { MemoHook } from './06-memos/MemoHook'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Toaster/> */}
    {/* <HooksApp /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <ScrambleWords /> */}
    {/* <MemoHook /> */}
    {/* {<MemoCounter />} */}
    {/* <InstagromApp /> */}
    {/* <Suspense fallback={<h2 className='text-4xl font-bold text-center text-black'>Loading user...</h2>}>
    <ClientInformation getUser={getUserAction(1001)}/>
    </Suspense> */}
    <ProfessionalApp/>
  </StrictMode>,
)
