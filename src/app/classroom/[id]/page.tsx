import Classroom from "@/components/Classroom";

import { checkMembership } from "../../../../actions/checkMembership";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { role } = await checkMembership(id);
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Classroom role={role} classId={id} />
    </div>
  );
};

export default page;
