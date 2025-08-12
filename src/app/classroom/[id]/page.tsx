import Classroom from "@/components/Classroom";

import { checkMembership } from "../../../../actions/checkMembership";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { role } = await checkMembership(id);
  return <Classroom role={role} classId={id} />;
};

export default page;
