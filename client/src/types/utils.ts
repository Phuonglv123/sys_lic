

class Utils {
    formatCurrencyVND(value: number | string) {
        return value.toLocaleString('it-IT', {style: 'currency', currency: 'VND'});
    }

}

export default new Utils();
