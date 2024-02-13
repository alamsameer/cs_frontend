
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface InwardData {
    date: string;
    party: string;
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

const InwardLists: React.FC = () => {
    const [data, setData] = useState<InwardData[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const accessToken = localStorage.getItem("cstoken");

            const response = await axios.get('http://localhost:4000/api/movedinitems',{
                headers:{
                    Authorization: `${accessToken}`
                }
            });
            console.log(response);
            
            setData(response.data.moveIn);
        } catch (error) {
            console.error('Error fetching data:', error);
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
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {data.length > 0 && data.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-2">{item.date}</td>
                        <td className="px-4 py-2">{item.party}</td>
                        <td className="px-4 py-2">{item.category}</td>
                        <td className="px-4 py-2">{item.weight}</td>
                        <td className="px-4 py-2">{item.rate}</td>
                        <td className="px-4 py-2">{item.rent}</td>
                        <td className="px-4 py-2">{item.rentStatus}</td>
                        <td className="px-4 py-2">{item.lotNumber}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">{item.location}</td>
                        <td className="px-4 py-2">{item.remarks}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    );
};

export default InwardLists;
