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

    const { name, email, oldPassword, newPassword } = req.body;
    const { error } = updateSchema.validate({ name, email, oldPassword, newPassword }, { abortEarly: false });

    if (error) {
        return res.status(400).json({ success: false, errors: error.details.map(detail => detail.message.replace(/['"]+/g, '')) });
    }

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update name and email if provided
        if (name) user.name = name;
        if (email) user.email = email;

        // Update password if oldPassword and newPassword are provided
        if (oldPassword && newPassword) {
            const isMatch = await compare(oldPassword, user.password);

            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Incorrect old password' });
            }

            const hashedPassword = await hash(newPassword, 10);
            user.password = hashedPassword;
        }

        await user.save();

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECREAT, { expiresIn: '1d' });
        const finalData = { token, user };

        return res.status(200).json({ success: true, message: 'Profile updated successfully', finalData });
    } catch (error) {
        console.error('Error in updating profile (server): ', error);
        return res.status(500).json({ success: false, message: 'Something went wrong, please retry later' });
    }
};
