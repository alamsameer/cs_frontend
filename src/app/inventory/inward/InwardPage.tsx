import InwardForm from "./components/InwardForm";
import InwardLists from "./components/InwardLists"
import "./inward.css"
function InwardPage() {
  return (
    <div className=" flex justify-center">
      <div className="m-4">
        <InwardForm />
        <InwardLists/>
      </div>
    </div>
  );
}

export default InwardPage;
