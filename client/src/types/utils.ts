import moment from "moment";


class Utils {
    formatCurrencyVND(value: number | string | null) {
        if (value === null) {
            return 'null'
        } else {
            return value.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
        }
    }

    formatDateTime(value: string | null) {
        if (value === null) {
            return 'null'
        } else {
            return moment(value).format('L')
        }
    }

    dayPlusDay(date: Date, days: number) {
        return new Date(date.setMonth(date.getMonth() + days))
    }

}

export default new Utils();
