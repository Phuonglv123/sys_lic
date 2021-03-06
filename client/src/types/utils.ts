import moment from "moment";
moment.locale('vi');

class Utils {
    formatCurrencyVND(value: number | string | null) {
        if (value === null) {
            return 'null'
        } else {
            return value.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
        }
    }

    formatDateTime(value: any) {
        if (value === null) {
            return 'null'
        } else {
            return moment(value).format('L')
        }
    }

    dayPlusDay(date: Date, days: number) {
        let result = new Date();
        result.setDate(date.getDate() + days);
        return result;
    }

}

export default new Utils();
