import { checkMembership } from "../../../../actions/checkMembership";

export default async function ClassroomLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return <>{children}</>;
}
