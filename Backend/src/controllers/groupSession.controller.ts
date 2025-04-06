import { Request, Response } from 'express';
import GroupSession, { IGroupSession } from '../models/groupSession.model';

// Get all group sessions
export const getAllGroupSessions = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search as string, $options: 'i' } },
          { mentor: { $regex: search as string, $options: 'i' } },
          { tags: { $regex: search as string, $options: 'i' } }
        ]
      };
    }

    const sessions = await GroupSession.find(query);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching group sessions', error });
  }
};

// Get a single group session by ID
export const getGroupSessionById = async (req: Request, res: Response) => {
  try {
    const session = await GroupSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Group session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching group session', error });
  }
};

// Create a new group session
export const createGroupSession = async (req: Request, res: Response) => {
  try {
    const sessionData: IGroupSession = req.body;
    const newSession = new GroupSession(sessionData);
    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(400).json({ message: 'Error creating group session', error });
  }
};

// Update a group session
export const updateGroupSession = async (req: Request, res: Response) => {
  try {
    const updatedSession = await GroupSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSession) {
      return res.status(404).json({ message: 'Group session not found' });
    }
    res.json(updatedSession);
  } catch (error) {
    res.status(400).json({ message: 'Error updating group session', error });
  }
};

// Delete a group session
export const deleteGroupSession = async (req: Request, res: Response) => {
  try {
    const deletedSession = await GroupSession.findByIdAndDelete(req.params.id);
    if (!deletedSession) {
      return res.status(404).json({ message: 'Group session not found' });
    }
    res.json({ message: 'Group session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting group session', error });
  }
};