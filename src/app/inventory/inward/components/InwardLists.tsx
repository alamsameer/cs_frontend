import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InwardData {
  date: string;
  party: { name: string };
  category: string;
  weight?: number;
  rate: number;
  rent: number;
  rentStatus: string;
  lotNumber: string;
  quantity: number;
  location?: string;
  remarks?: string;
}
import {BACKEND_URL} from "@/constant";

const InwardLists: React.FC = () => {
  const [data, setData] = useState<InwardData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("cstoken");

      const response = await axios.get(
      `${BACKEND_URL}/api/movedinitems`,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      console.log(response);

      setData(response.data.moveIn);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="table_container">
      <table className="">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Party</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Weight</th>
            <th className="px-4 py-2">Rate</th>
            <th className="px-4 py-2">Rent</th>
            <th className="px-4 py-2">Rent Status</th>
            <th className="px-4 py-2">Lot Number</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Remarks</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data && data.map((item, index) => (
              <React.Fragment key={index}>
                <tr key={index} className="bg-gray-50">
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.party.name}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.weight}</td>
                  <td className="px-4 py-2">{item.rate}</td>
                  <td className="px-4 py-2">{item.rent}</td>
                  <td className="px-4 py-2">{item.rentStatus ?"paid":"Not paid"}</td>
                  <td className="px-4 py-2">{item.lotNumber}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item.location}</td>
                  <td className="px-4 py-2">{item.remarks}</td>
                  <td className="px-4 py-2 flex">
                    <button>Edit</button>
                    <Popover>
                      <PopoverTrigger>
                        <button>Delete</button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div>Are you sure you want to delete this item?</div>
                        <button>Delete</button>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default InwardLists;
