// import http from 'http';
// import { MongoClient } from 'mongodb';
// import url from 'url';

// const mongoUrl = 'mongodb://localhost:27017';
// const dbName = 'mindvaultDB';
// let db;

// // Connect to MongoDB
// MongoClient.connect(mongoUrl)
//   .then((client) => {
//     db = client.db(dbName);
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => console.error('MongoDB connection failed', err));

// // Create HTTP server
// const server = http.createServer(async (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Content-Type', 'application/json');

//   if (req.method === 'OPTIONS') {
//     res.writeHead(204);
//     res.end();
//     return;
//   }

//   const parsedUrl = url.parse(req.url, true);

//   // ✅ Handle GET request to fetch notes
//   if (req.method === 'GET' && parsedUrl.pathname === '/api/notes') {
//     console.log(req.method, parsedUrl.pathname);

//     console.log('Fetching notes...');
//     try {
//       const notes = await db.collection('notes').find().toArray();
//       res.writeHead(200);
//       res.end(JSON.stringify(notes));
//     } catch (err) {
//       console.error('Error fetching notes:', err);
//       res.writeHead(500);
//       res.end(JSON.stringify({ message: 'Internal Server Error' }));
//     }
//     return;
    
//   }

//   // ✅ Handle POST request to save a note
//   if (req.method === 'POST' && parsedUrl.pathname === '/api/notes') {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk;
//     });
//     req.on('end', async () => {
//       try {
//         const note = JSON.parse(body);
//         const result = await db.collection('notes').insertOne(note);
//         res.writeHead(201);
//         res.end(JSON.stringify({ ...note, _id: result.insertedId }));
//       } catch (err) {
//         console.error('Error handling POST request:', err);
//         res.writeHead(500);
//         res.end(JSON.stringify({ message: 'Internal Server Error' }));
//       }
//     });
//     return;
//   }

//   // ❌ All other routes
//   res.writeHead(404);
//   res.end(JSON.stringify({ message: 'Not found' }));
// });

// server.listen(5000, () => {
//   console.log('Server is running on http://localhost:5000');
// });



import http from 'http';
import { MongoClient } from 'mongodb';
import url from 'url';

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'mindvaultDB';

// Create HTTP server
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  // Handle GET request to fetch notes
  if (req.method === 'GET' && parsedUrl.pathname === '/api/notes') {
    try {
      const notes = await server.db.collection('notes').find().toArray();
      res.writeHead(200);
      res.end(JSON.stringify(notes));
    } catch (err) {
      console.error('Error fetching notes:', err);
      res.writeHead(500);
      res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
    return;
  }

  // Handle POST request to save a note
  if (req.method === 'POST' && parsedUrl.pathname === '/api/notes') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const note = JSON.parse(body);
        const result = await server.db.collection('notes').insertOne(note);
        res.writeHead(201);
        res.end(JSON.stringify({ ...note, _id: result.insertedId }));
      } catch (err) {
        console.error('Error saving note:', err);
        res.writeHead(500);
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      }
    });
    return;
  }

  // All other routes
  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Not found' }));
});

// Connect to MongoDB and start server
MongoClient.connect(mongoUrl)
  .then(client => {
    server.db = client.db(dbName);  // Attach db to server object
    console.log('Connected to MongoDB');
    
    server.listen(5500, () => {
      console.log('Server is running on http://localhost:5500');
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });