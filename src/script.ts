const axios = require('axios');

// List of URLs to request sequentially
const url='http://192.168.3.91:5000/api/kiosks/1/queue/add';
const requestBodies = [

    {
      type: 'ad',
      qrcodeUrl: 'http://',
      media: {
        type: 'video',
        url: 'http://192.168.3.91:5000/assets/royal-enfield.mp4',
      },
    },
    {
      type: 'ad',
      qrcodeUrl: 'http://',
      media: {
        type: 'announcement',
        title: 'Happy Work Anniversary!',
      },
    },
    {
        type: 'ad',
        qrcodeUrl: 'http://',
        media: {
          type: 'image',
          url: 'http://192.168.3.91:5000/assets/chai-met-toast.jpeg',
        },
      },
      {
        type: 'ad',
        qrcodeUrl: 'http://',
        media: {
          type: 'video',
          url: 'http://192.168.3.91:5000/assets/pixel.mp4',
        },
      },
      {
        type: 'ad',
        qrcodeUrl: 'http://',
        media: {
          type: 'youtube',
          url: 'https://youtube.com/shorts/mXVXlOhIQH0',
        },
      },
      {
        type: 'ad',
        qrcodeUrl: 'http://',
        media: {
          type: 'video',
          url: 'http://192.168.3.91:5000/assets/redken.mp4',
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