import { checkMembership } from "../../../../actions/checkMembership";

export default async function ClassroomLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  await checkMembership(params.id); // This will throw if not authorized
  return <>{children}</>;
}
