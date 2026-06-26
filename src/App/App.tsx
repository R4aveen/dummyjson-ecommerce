import { HeaderRouter } from "@/components/router/headerRouter"
import { ContentRouter } from "@/components/router/contentRouter"
import { Wraper } from "@/components/layouts"

function App() {

  return (
    <>
      <HeaderRouter />
      <Wraper>
        <ContentRouter />
      </Wraper>
    </>
  )
}

export default App
