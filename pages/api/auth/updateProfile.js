import ConnectDB from '@/DB/connectDB';
import User from '@/models/User';
import Joi from 'joi';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const updateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    oldPassword: Joi.string(),
    newPassword: Joi.string(),
});

export default async (req, res) => {
    await ConnectDB();

    const {_id,name, email} = req.body;
    const { error } = updateSchema.validate({ name, email}, { abortEarly: false });

    if (error) {
        return res.status(400).json({ success: false, errors: error.details.map(detail => detail.message.replace(/['"]+/g, '')) });
    }

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update name and email if provided
        user.name = name;
        user.email = email;
        await user.save();
        return res.status(200).json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error in updating profile (server): ', error);
        return res.status(500).json({ success: false, message: 'Something went wrong, please retry later' });
    }
};
