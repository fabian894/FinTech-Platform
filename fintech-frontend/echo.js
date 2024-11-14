import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

let echo;

if (typeof window !== 'undefined') {
  // Initialize Pusher and Echo only in the client-side (browser)
  window.Pusher = Pusher;

  echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authEndpoint: `${process.env.NEXT_PUBLIC_API_BASE_URL}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    },
  });
}

export default echo;
    