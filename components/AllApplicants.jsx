import { getAllApplicants } from '@/Services/job'; // Assuming you have a service function for this
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function AllApplicants() {
    const router = useRouter();
    const [applicants, setApplicants] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredApplicants, setFilteredApplicants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllApplicants();
                if (response.success) {
                    setApplicants(response.data);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.error('Error fetching applicants:', error);
                toast.error('Error fetching applicants');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setFilteredApplicants(applicants);
    }, [applicants]);

    useEffect(() => {
        if (search === '') {
            setFilteredApplicants(applicants);
        } else {
            setFilteredApplicants(
                applicants.filter((applicant) => {
                    const applicantData = applicant?.user?.name.toUpperCase();
                    const textData = search.toUpperCase();
                    return applicantData.indexOf(textData) > -1;
                })
            );
        }
    }, [search, applicants]);

    const columns = [
        {
            name: 'Name',
            selector: (row) => row?.user?.name,
        },
        {
            name: 'Email',
            selector: (row) => row?.user?.email,
        },
        // Add more columns as needed
    ];

    return (
        <>
            <DataTable
                subHeaderAlign={'right'}
                columns={columns}
                data={filteredApplicants}
                keyField="_id" // Replace with your unique identifier for each applicant
                pagination
                title={`Total Applicants: ${applicants.length}`}
                fixedHeader
                fixedHeaderScrollHeight="79%"
                selectableRows
                selectableRowsHighlight
                subHeader
                persistTableHead
                subHeaderComponent={
                    <input
                        className="w-60 py-2 px-2  outline-none  border-b-2 border-indigo-600"
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={'Search with Applicant name...'}
                    />
                }
                className="h-screen bg-white"
            />
        </>
    );
}
