import "dotenv/config";
import { archiveExpiredTasksForClassroom } from "../src/lib/archiveTasks";

(async () => {
  console.log("Archiving expired tasks...");
  await archiveExpiredTasksForClassroom();
  console.log("Archive job complete.");
  process.exit(0);
})();
