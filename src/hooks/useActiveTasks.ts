import { useQuery } from "@tanstack/react-query";
import { getActiveTasks } from "../../actions/getActiveTasks";

export function useActiveTasks(classID: string) {
  return useQuery({
    queryKey: ["activeTasks", classID],
    queryFn: () => getActiveTasks(classID),
    enabled: !!classID,
  });
}
