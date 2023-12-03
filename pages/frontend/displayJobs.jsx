import NavBar from '@/components/NavBar';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import JobsCard from '@/components/JobsCard';

export default function DisplayJobs() {
    const JobData = useSelector((state) => state?.Job?.JobData) || [];
    const [searchQuery, setSearchQuery] = useState('');

    // Filter jobs based on title, company, or job_category
    const filteredJobs = JobData.filter(
        (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.job_category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <NavBar />
            <div className='w-full  py-20 flex items-center md:px-8 px-2  justify-center flex-col'>
                <h1 className='px-4 mx-2 py-2 uppercase tracking-wider border-b-2 border-b-indigo-600 text-3xl font-semibold'>
                    Available Jobs
                </h1>
                <div className='w-full h-full py-4 flex  overflow-y-auto  items-center justify-center flex-wrap'>
                    {/* Search Bar */}
                    <input
                        type='text'
                        placeholder='Search jobs...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='mt-2 p-2 border border-gray-300 rounded-md'
                    />

                    {/* Display Jobs */}
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <JobsCard job={job} key={job?._id} />
                        ))
                    ) : (
                        <p>No jobs found</p>
                    )}
                </div>
            </div>
        </>
    );
}
