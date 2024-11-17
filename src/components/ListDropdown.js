import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListDropdown = ({ onChange }) => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        const selectedList = event.target.value;
        onChange();
        navigate(`/list/${selectedList}`);
    };

    return (
        <div className="flex justify-center mb-4">
            <select onChange={handleChange} className="p-2 border rounded">
                <option value="all">All Campaigns</option>
                <option value="invited">Invited</option>
                <option value="applied">Applied</option>
                <option value="in-progress">In Progress</option>
                <option value="rejected">Rejected</option>
            </select>
        </div>
    );
};

export default ListDropdown;