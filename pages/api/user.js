import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
<<<<<<< HEAD
      res.status(403).json({ message: 'Not Authorized' });
=======
      res.status(403).json({message: 'Not Authorized'});
>>>>>>> 26eca3579a08165836ebf2036a7e5c61a380f055
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
<<<<<<< HEAD
        Authorization: `Bearer ${token}`,
      },
    });
=======
        Authorization: `Bearer ${token}`
      }
    })
>>>>>>> 26eca3579a08165836ebf2036a7e5c61a380f055

    const user = await strapiRes.json();

    if (strapiRes.ok) {
<<<<<<< HEAD
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: 'User forbidden' });
    }
=======
      res.status(200).json({user})
    } else {
      res.status(403).json({ message: 'User forbidden'})
    }


>>>>>>> 26eca3579a08165836ebf2036a7e5c61a380f055
  } else {
    res.setHeader('Allow', ['GET']);
    res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }
};
