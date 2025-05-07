import Market from "./market.png"
import Finance from "./finance.png"
import Law from "./Law.png"
import Task from "./task.png"
import Teamchat from "./teamchat.png"


export const menuItems = [
    { label: "My Tasks", route: "addtask", image: Task },
    { label: "Team Chat", route: "chat", image: Teamchat },
    { label: "Manage Finances", route: "finance", image: Finance },
    { label: "Find Supplies", route: "market", image: Market },
    { label: "Legal and Inventoty", route: "document", image: Law }
  ];