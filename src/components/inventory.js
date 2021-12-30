import React,{ useState,useEffect } from "react";
import {useStore, inventoryStore} from '../store/store';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Loader from 'react-loader-spinner';
import InventoryTable from "./inventoryTable";

const Inventory = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {setToken, setLoginStatus} = useStore();
    const { addInvenotry, setInventoryList} = inventoryStore()

    const inventoryList = inventoryStore((state) => state.inventoryList);
    const tokenValue = useStore((state) => state.token);
    const loginStatus = useStore((state) => state.loginStatus);

    const getAllInventory = async () => {
        try{
            setLoading(true);
            console.log(`loginStatus = ${loginStatus}`)
            if(loginStatus){
                await axios.get('http://localhost:3000/api/inventory/all',{headers: { 'Authorization' : 'Bearer '.concat(tokenValue) }})
                .then(function (response) {
                setLoading(false);
                response.status === 200 ? setInventoryList(response.data) : setInventoryList([])
                })    
            }
        }
        catch(error){
            console.log(error);
        };
    }
    useEffect(() => {
        getAllInventory()
    },[])
    return(
        <div>
            {loading?
            <div className="Inv-List">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={10000}/>
            </div> :
            <InventoryTable data={inventoryList}/>}
        </div>
    );
}

export default Inventory;