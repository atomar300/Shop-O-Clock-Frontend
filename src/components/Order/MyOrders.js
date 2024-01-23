import React, { useEffect } from 'react'
import "./MyOrders.css"
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { clearErrors, myOrders } from '../../actions/orderAction';
import MetaData from '../layout/MetaData';
import Loader from '../layout/loader/Loader';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const MyOrders = () => {
  const { loading, error, orders } = useSelector(state => state.myOrders)
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <Button
              style={{ color: "white", background: "black", border: "none" }}
              variant="outlined" size="small"
              endIcon={<OpenInNewIcon />}
            >
              Open
            </Button>
          </Link>
        )
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item.id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);


  return (
    <div>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className='myOrdersPage'>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            className='myOrdersTable'
            autoHeight
          />
        </div>
      )}
    </div>
  )
}

export default MyOrders