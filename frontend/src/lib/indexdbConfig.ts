import { MessageData } from "@/app/chat/page";
export function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("ProjectChatDB", 1);
        request.onupgradeneeded = (e: any) => {
            e.target.result.createObjectStore("chats", { keyPath: "projectId" });
            console.log("Database Created");
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Database Failed");
    });


};


export async function saveMessage(projectId: string, newMessages: MessageData) {
    const database = await openDatabase();
    const tsx = database.transaction("chats" , "readwrite");
    const store = tsx.objectStore("chats");
    console.log(newMessages);
    const existing = await new Promise<{ projectId: string; messages: MessageData[] }>((resolve) => {
   
    
        const req = store.get(projectId);
        req.onsuccess = () => resolve(req.result || { projectId, messages: []});

        req.onerror = () => resolve({ projectId, messages: [] });
      });
    
      existing.messages.push(newMessages);  
      await store.put(existing);        
      
      return new Promise<void>((resolve, reject) => {
        tsx.oncomplete = () => resolve();
        tsx.onerror = () => reject("Transaction failed");
        tsx.onabort = () => reject("Transaction aborted");
      });

};

export async function loadMessages(projectId : string) {
    const db = await openDatabase();
    const tx = db.transaction("chats", "readonly");
    const store = tx.objectStore("chats");
  
    return new Promise<MessageData[]>((resolve) => {
      const req = store.get(projectId);
      req.onsuccess = () => resolve(req.result?.messages || []);
      req.onerror = () => resolve([]);
    });
  }
  