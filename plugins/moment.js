import "moment/locale/ja";
import "moment-timezone";
import moment from "moment";

moment.locale("ja");
moment.tz.setDefault("Asia/Tokyo");

export default moment;
