import {useState,useEffect} from "react";

function SearchBar({ search, setSearch, area, setArea, status, setStatus }) {


    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/posts/pets/?area=${encodeURIComponent(area)}`)
    },[area])


    return (
        <>
        <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <select
            value={area}
            onChange={(event)=>setArea(event.target.value)}
            required
        >
            Select an area:
            <option value="">Select an area</option>
            <option value="district_1">District 1</option>
            <option value="district_2">District 2</option>
            <option value="district_3">District 3</option>
            <option value="district_4">District 4</option>
            <option value="district_5">District 5</option>
            <option value="district_6">District 6</option>
            <option value="district_7">District 7</option>
            <option value="district_8">District 8</option>
            <option value="district_10">District 10</option>
            <option value="district_11">District 11</option>
            <option value="district_12">District 12</option>
            <option value="thu_duc">Thu Duc City</option>
            <option value="binh_thanh">Binh Thanh</option>
            <option value="binh_tan">Binh Tan</option>
            <option value="go_vap">Go Vap</option>
            <option value="phu_nhuan">Phu Nhuan</option>
            <option value="tan_binh">Tan Binh</option>
            <option value="tan_phu">Tan Phu</option>
            <option value="binh_chanh">Binh Chanh</option>
            <option value="can_gio">Can Gio</option>
            <option value="cu_chi">Cu Chi</option>
            <option value="hoc_mon">Hoc Mon</option>
            <option value="nha_be">Nha Be</option>
                    
        </select>
        <select
                    value={status}
                    onChange={(event)=>setStatus(event.target.value)}
                    required
                >
                    Select a status
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                    
                    
                </select>
        </>

    );
}

export default SearchBar;