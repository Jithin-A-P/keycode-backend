const axios = require('axios');

// List of URLs to request sequentially
const url='http://localhost:5000/api/kiosks/1/queue/add';
const requestBodies = [
    {
      type: 'ad',
      qrcodeUrl: 'http://',
      media: {
        type: 'video',
        url: 'http://localhost:5000/assets/royal-enfield.mp4',
      },
    },
    {
      type: 'advertise_here',
      qrcodeUrl: 'http://e',
     
    },
    {
        type: 'ad',
        qrcodeUrl: 'http://',
        media: {
          type: 'image',
          url: 'http://localhost/assets/chai-met-toast.jpeg',
        },
      },
      {
        type: 'advertise_here',
        qrcodeUrl: 'http://e',
      },
      {
        type: 'ad',
        qrcodeUrl: 'http://',
        media: {
          type: 'video',
          url: 'http://localhost/assets/pixel.mp4',
        },
      },
      {
        type: 'advertise_here',
        qrcodeUrl: 'http://e',
      },
      {
        type: 'ad',
        qrcodeUrl: 'http://',
        media: {
          type: 'video',
          url: 'https://youtube.com/shorts/mXVXlOhIQH0?si=5ir9yXy1UMWFUFVN',
        },
      },
      {
        type: 'advertise_here',
        qrcodeUrl: 'http://e',
      },
      {
        type: 'ad',
        qrcodeUrl: 'http://',
        media: {
          type: 'video',
          url: 'https://youtube.com/shorts/Ck-y4AFsV1I?si=rU5SSf36l7OzLUzm',
        },
      },
      {
        type: 'advertise_here',
        qrcodeUrl: 'http://e',
      },
      {
        type: 'ad',
        qrcodeUrl: 'http://',
        media: {
          type: 'video',
          url: 'http://localhost/assets/redken.mp4',
        },
      },
      
    // Add more request bodies as needed
  ];
  
  // Function to make a single POST request with a given body
 export const makePostRequest = async (body) => {
    try {
      const response = await axios.post(url, body);
      console.log('POST Request Succeeded');
      console.log(response.data); // You can handle the response data here if needed
    } catch (error) {
      console.error('POST Request Failed');
      console.error(error);
    }
  }
  
  // Function to run POST requests with different bodies sequentially
  export const runPostRequestsSequentially = async () => {
    for (const requestBody of requestBodies) {
      await makePostRequest(requestBody);
    }
  }
  
  // Start the script by calling the function