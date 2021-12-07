const { events } = require('./data.json');

export default function handler(req, res) {
  if (req.method == 'GET') {
    res.status(200).json(events);
  } else {
    res.setHeader('Alllow', ['GET']);
    res
      .status(405)
      .json({ message: `Method ${req.method} is not allowed` });
  }
  res.status(200).json(events);
}
