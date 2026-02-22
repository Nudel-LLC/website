import { Video, PenTool, Mic2, Zap } from "lucide-react";
import type { ServiceIcon } from "./types";

export const ICON_MAP: Record<ServiceIcon, typeof Video> = {
  video: Video,
  pen: PenTool,
  mic: Mic2,
  zap: Zap,
};
