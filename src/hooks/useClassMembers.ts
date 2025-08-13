import { useQuery } from "@tanstack/react-query";
import { getClassMembers } from "../../actions/classroomMemberActions";

export function useClassMembers(classId: string) {
  return useQuery({
    queryKey: ["classMembers", classId],
    queryFn: () => getClassMembers(classId),
    enabled: !!classId,
  });
}
