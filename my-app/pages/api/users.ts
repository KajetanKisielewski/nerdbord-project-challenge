import { NextApiRequest, NextApiResponse } from 'next';

import { addUser, updateUser, deleteUser, getUsers } from "@/services/users";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const users = await getUsers();
                res.status(200).json({ success: true, data: users });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
            break;

        case 'POST':
            const { email, name } = req.body;
            try {
                const newUser = await addUser(email, name);
                res.status(200).json({ success: true, data: newUser });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
            break;

        case 'PUT':
            const { id, updatedEmail, updatedName } = req.body;
            try {
                const updatedUser = await updateUser(id, updatedEmail, updatedName);
                res.status(200).json({ success: true, data: updatedUser });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
            break;

        case 'DELETE':
            const { userId } = req.body;
            try {
                const deletedUser = await deleteUser(userId);
                res.status(200).json({ success: true, data: deletedUser });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
            break;

        default:
            res.status(405).json({ message: 'Method Not Allowed' });
            break;
    }
}
