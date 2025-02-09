import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Like from '@/models/Like';
import User from '@/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { songId } = req.query;
  console.log('Received request for songId:', songId);
  
  try {
    // Przykładowe dane testowe
    const testData = [
      {
        _id: '1',
        name: 'Test User 1',
        avatarUrl: '/images/default-avatar.png'
      },
      {
        _id: '2',
        name: 'Test User 2',
        avatarUrl: '/images/default-avatar.png'
      }
    ];
    
    console.log('Returning test data for songId:', songId);
    res.status(200).json(testData);
    
    // Prawdziwe zapytanie do bazy danych
    // const likes = await Like.find({ songId }).populate('userId', 'name avatarUrl');
    // const users = likes.map(like => ({
    //   _id: like.userId._id,
    //   name: like.userId.name,
    //   avatarUrl: like.userId.avatarUrl
    // }));
    // res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
} 