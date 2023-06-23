// Plugin to generate a chart

import {draw} from "./draw"
import { loadGTAmerica } from "./fontLoading"

await loadGTAmerica()
draw()


figma.closePlugin()
