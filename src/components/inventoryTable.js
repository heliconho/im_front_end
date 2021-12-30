import react, { useCallback, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from'@mui/material/TableBody'
import TableCell from'@mui/material/TableCell'
import TableContainer from'@mui/material/TableContainer'
import TableHead from'@mui/material/TableHead'
import TableRow from'@mui/material/TableRow'
import Paper from'@mui/material/Paper'
import {DataGrid} from '@mui/x-data-grid'

const InventoryTable = ({data}) => {
    const [ editRowsModel, setEditRowsModel] = useState({});
    const handleEditRowsModelChange = useCallback((model) => {
        setEditRowsModel(model);
        console.log(model)
    },[]);
    const columns = [
        {field:'inventoryName', headerName:'Inventory Name',width: 200, editable: true},
        {field:'sku', headerName:'SKU',width: 200, editable: true},
        {field:'description', headerName:'Description',width: 200, editable: true},
        {field:'quantity', headerName:'Quantity',width: 200, editable: true},
        {field:'keyword', headerName:'Keyword',width: 200, editable: true},
        {field:'category', headerName:'Category',width: 200, editable: true}
    ]
    return(
        <div style={{width: '100%'}}>
            <div style={{height: 600, width:'100%'}}>
                <DataGrid
                    rows={data}
                    getRowId={(row) => row._id}
                    columns={columns}
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}/>
            </div>
        </div>
    )
}
export default InventoryTable;