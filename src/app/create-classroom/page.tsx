import { checkAppAccess } from "../../../actions/checkAppAccess";
import { CreateClassroomForm } from "../../components/forms/CreateClassroomForm";

export default async function CreateClassroomPage() {
  await checkAppAccess();
  return (
    <div className="min-h-screen flex justify-center p-4 mt-10">
      <CreateClassroomForm />
    </div>
  );
}
