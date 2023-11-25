import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Marketing = () => {
  const navigate = useNavigate()
  return ( 
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1">
        <Heading />
        <Button onClick={() => navigate('/signup')}>
          Enter AlgoSync <ArrowRight className="h-4 w-4 ml-2"/>
        </Button>
      </div>
    </div>
   );
}

const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold"><span className="underline">AlgoSync</span>: Visualize, Learn, and Master Algorithms Seamlessly</h1>
      <h3 className="text-base sm:text-xl font-medium md:text-2xl">Revolutionizing coding education through live algorithm visualizations. <br />Elevate your coding skills with AlgoSync today!"</h3>
    </div>
  )
}
 
export default Marketing;