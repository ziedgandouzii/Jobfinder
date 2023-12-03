import ConnectDB from '@/DB/connectDB';
import validateToken from '@/middleware/tokenValidation';
import AppliedJob from '@/models/ApplyJob';

export default async (req, res) => {
    await ConnectDB();
    const { method } = req;

    switch (method) {
        case 'GET':
            await validateToken(req, res, async () => {
                await getAllApplications(req, res);
            });
            break;
        default:
            res.status(400).json({ success: false, message: 'Invalid Request' });
    }
};
const getAllApplications = async (req, res) => {
    // No need to call ConnectDB() again here
    try {
        const allApplications = await AppliedJob.find({}).populate('user').populate('job');
        return res.status(200).json({ success: true, data: allApplications });
    } catch (error) {
        console.error('Error in getting all applications:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
