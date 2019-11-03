import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

// Set up Pusher for Echo
// window.Pusher = Pusher;

const echoHelper = (access_token) => {
  // Set up Laravel Echo
  const optionsForEcho = {
    broadcaster: 'pusher',
    key: process.env.REACT_APP_PUSHER_KEY,
    cluster: 'eu',
    forceTLS: true,
    encrypted: false,
    authEndpoint: 'http://vcs-backend.test/broadcasting/auth',
    auth: {
      headers: {
        Accept: 'Application/json',
        Authorization: `Bearer ${access_token}`,
      }
    }
  }

  return new Echo(optionsForEcho);
}

export default echoHelper;
