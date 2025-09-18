import Classroom from "@/components/Classroom";
import { checkMembership } from "../../../../actions/checkMembership";
import NotFound from "@/app/not-found";
import { currentUser } from "@clerk/nextjs/server";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await currentUser();
  const { role } = await checkMembership(id);

  if (!user?.id) return <NotFound />;
  return <Classroom role={role} classId={id} userId={user.id} />;
};

export default page;
