import React, { ReactElement, useEffect, useState } from 'react'
import TableHOC from '../components/admin/TableHOC'
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import { useSelector } from 'react-redux';
import { UserReducer } from '../types/reducer-types';
import { useMyOrdersQuery } from '../redux/api/orderApi';
import toast from 'react-hot-toast';
import { CustomError } from '../types/api-types';
import { Skeleton } from '../components/loader';

type DataType ={
    _id: string;
    amount: number;
    quantity:number;
    discount:number;
    status:ReactElement;
    action:ReactElement;

};

const column : Column<DataType>[] = [
    {
        Header : "ID",
        accessor:"_id"
    },
    {
        Header : "Quantity",
        accessor:"quantity"
    },
    {
        Header : "Discount",
        accessor:"discount"
    },
    {
        Header : "Amount",
        accessor:"amount"
    },
    {
        Header : "Status",
        accessor:"status"
    },
    {
        Header : "Action",
        accessor:"action"
    }
];

const Orders = () => {

    const {user} = useSelector((state : {userReducer : UserReducer}) => state.userReducer);

    const {isLoading , isError , error, data} = useMyOrdersQuery(user?._id!);

    const [rows , setRows] = useState<DataType[]>([])

    if(isError){
        toast.error((error as CustomError).data.message);
    }
    
    useEffect(() => {
    
        if(data && data.orders) {
            const newRows = data?.orders?.map((i) => ({
                _id : i._id,
                amount : i.total,
                discount : i.discount,
                quantity : i.orderItems?.length || 0,

                status : <span className= {i.status === "Processing" ? "red" : i.status === "Shipped" ? "green" : "purple"}>{i.status}</span>,

                action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
            }));
            setRows(newRows)
        }
    },[data]);

      const Table = TableHOC<DataType>(column,rows,"dashboard-product-box" , "Orders",rows.length > 6)();
  return (
    <div className='container'>
        <h1>My Orders</h1>
        {isLoading? <Skeleton count = {20} /> : Table}
    </div>
  )
}

export default Orders ;