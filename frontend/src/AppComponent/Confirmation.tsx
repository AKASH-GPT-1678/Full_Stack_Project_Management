"use client";
import { Button } from "@/Components/ui/button";


interface State {
  state: boolean
}
export const AreyouSure: React.FC<State> = ({ state }) => {
  // const [deleteItem, setDeleteItem] = useState(state);

  return (
    <div className="border border-black h-[140px] w-[330px] flex flex-col rounded-2xl bg-white p-2">
      <h1 className="text-3xl text-black flex items-center justify-center font-bold font-serif mt-2">
        Are You Sure?
      </h1>
      <div className="flex justify-center items-center mt-6 gap-3">
        <Button className="cursor-pointer h-[40px] border border-red-100">Cancel</Button>
        <Button className="bg-red-600 text-white cursor-pointer h-[40px]" onClick={() => state =! state}>Remove Photo</Button>
      </div>
    </div>
  );
};
