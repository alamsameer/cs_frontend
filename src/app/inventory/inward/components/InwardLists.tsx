
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
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Party</th>
                        <th>Category</th>
                        <th>Weight</th>
                        <th>Rate</th>
                        <th>Rent</th>
                        <th>Rent Status</th>
                        <th>Lot Number</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 && data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.party}</td>
                            <td>{item.category}</td>
                            <td>{item.weight}</td>
                            <td>{item.rate}</td>
                            <td>{item.rent}</td>
                            <td>{item.rentStatus}</td>
                            <td>{item.lotNumber}</td>
                            <td>{item.quantity}</td>
                            <td>{item.location}</td>
                            <td>{item.remarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InwardLists;
