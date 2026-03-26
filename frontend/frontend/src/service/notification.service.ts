
import axiosConfig from "../config/axios.config";


class NotificationSvc {
    getNotification = async() => {
      return await axiosConfig.get("notification/getNotification",{
        headers: {
            "Content-Type": "application/json"
        }
      });
    }

    patchNotification = async () => {
      return await axiosConfig.patch("notification/patchNotification")
    }
}

const notificationSvc = new NotificationSvc();
export default notificationSvc;
