import { Backup } from "@/types/Backup";

export function saveBackup({ entries, prefs }: Backup) {
  const data = new Blob([JSON.stringify({ entries, prefs })], {
    type: "application/json",
  });
  const now = new Date();
  const downloadUrl = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download =
    "SimpleNewTab_backup_" +
    now.toLocaleDateString() +
    "_" +
    now.toLocaleTimeString() +
    ".json";
  link.click();
}

export async function restoreBackup(): Promise<Backup> {
  return new Promise((resolve, reject) => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json";

      input.onchange = async () => {
        if (input.files) {
          const bkp = await restoreFromFile(input.files[0]) as Backup;
          resolve(bkp);
        } else {
          reject(new Error("No file selected"));
        }
      };

      input.click();
    } catch (err) {
      reject(err);
    }
  });
}

export async function restoreFromFile(file: File): Promise<Backup> {
  return new Promise((resolve, reject) => {
    try{
      const reader = new FileReader();
      
      reader.onload = () => {
        const parsed = JSON.parse(reader.result!.toString());
        resolve(parsed as Backup);
      };
  
      reader.onerror = () => reject(new Error("Failed to read the backup"));
  
      reader.readAsText(file, "utf-8");
    }catch(err){
      reject(err);
    }
  });
}
