import { useUserStore } from '@/store/modules/user';

export function checkStatus(status: number, msg: string, data: any = {}): void {
  const $message = window['$message'];
  switch (status) {
    case 422:
      let i = 0;
      while (i < data.errors.length) {
        $message.error(data.errors[i].message);
        i++;
      }
      break;
    // 401: not logged in
    // If you are not logged in, jump to the login page and carry the path of the current page
    // Return to the current page after successful login, this step needs to be operated on the login page.
    case 401:
      const userStore = useUserStore();
      userStore.logout().then(() => {
        $message.error('Not logged in try to login again');
      });
      break;
    case 403:
      $message.error(
        `${data.message ? data.message : 'User is authorized, but access is forbidden!'}`
      );
      break;
    // 404 request does not exist
    case 404:
      $message.error(
        `${data.message ? data.message : 'Network request error, the resource was not found!'}`
      );
      break;
    case 405:
      $message.error(
        `${
          data.message ? data.message : 'Network request error, the request method is not allowed!'
        }`
      );
      break;
    case 408:
      $message.error(`${data.message ? data.message : 'Network request timed out'}`);
      break;
    case 409:
      $message.error(`${data.message ? data.message : 'Conflicts!'}`);
      break;
    case 500:
      $message.error(
        `Server error, ${data.message ? data.message : 'please contact the administrator!'}`
      );
      break;
    case 501:
      $message.error(`${data.message ? data.message : 'Network not implemented!'}`);
      break;
    case 502:
      $message.error(`${data.message ? data.message : 'Network error!'}`);
      break;
    case 503:
      $message.error(
        `${
          data.message
            ? data.message
            : 'The service is unavailable, the server is temporarily overloaded or maintained!'
        }`
      );

      break;
    case 504:
      $message.error(`${data.message ? data.message : 'Network Timeout'}`);
      break;
    case 505:
      $message.error(
        `${data.message ? data.message : 'http version does not support this request!'}`
      );
      break;
    default:
      $message.error(msg);
  }
}
