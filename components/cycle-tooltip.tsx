import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function CycleTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-zinc-400 cursor-help" />
        </TooltipTrigger>
        <TooltipContent>
          <p>CP - Cycle Préparatoire | CI - Cycle Ingénieur</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
