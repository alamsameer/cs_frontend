import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/constant";

function Dashboard() {
  const [data, setData] = useState({
    totalItems: 0,
    totalRevenue: 0,
    notPaidAmount: 0,
    totalPaid: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("cstoken");
        const fetchOptions = {
          headers: {
            Authorization: token || "", // Ensure that the value is not null
          },
        };

        const responses = await Promise.all([
          fetch(`${BACKEND_URL}/totalitems`, fetchOptions),
          fetch(`${BACKEND_URL}/totalrevenue`, fetchOptions),
          fetch(`${BACKEND_URL}/totalleftamount`, fetchOptions),
          fetch(`${BACKEND_URL}/totalpaid`, fetchOptions),
        ]);

        const [totalItemsResponse, totalRevenueResponse, notPaidAmountResponse, totalPaidResponse] = responses;

        if (!totalItemsResponse.ok || !totalRevenueResponse.ok || !notPaidAmountResponse.ok || !totalPaidResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [totalItemsData, totalRevenueData, notPaidAmountData, totalPaidData] = await Promise.all([
          totalItemsResponse.json(),
          totalRevenueResponse.json(),
          notPaidAmountResponse.json(),
          totalPaidResponse.json(),
        ]);

        setData({
          totalItems: totalItemsData.totalInwards,
          totalRevenue: totalRevenueData.totalRevenue,
          notPaidAmount: notPaidAmountData.totalLeftAmount,
          totalPaid: totalPaidData.totalPaid,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, e.g., show error message to the user or log it
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold m-4">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <text x="0" y="15" fontSize="32" fontWeight="bold">
                ₹
              </text>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <text x="0" y="15" fontSize="32" fontWeight="bold">
                ₹
              </text>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalRevenue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Not Paid Amount
            </CardTitle>
            <text x="0" y="15" fontSize="32" fontWeight="bold">
                ₹
              </text>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.notPaidAmount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <text x="0" y="15" fontSize="32" fontWeight="bold">
                ₹
              </text>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPaid}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
