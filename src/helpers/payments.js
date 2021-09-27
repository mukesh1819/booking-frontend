import KhaltiCheckout from "khalti-checkout-web";
import {payWithKhalti, payWithEsewa, esewaPaymentVerification} from "../../src/api/paymentApi";
import history from '../history';

const PUBLIC_KEY = "live_public_key_b7c0a35b05c14967844f354e96f041db";

export function checkOutWithKhalti(params) {

    let initialParams = {
        "publicKey": PUBLIC_KEY,
        "productIdentity": "1234567890",
        "productName": "VisitallNepal",
        "productUrl": "https://visitallnepal.com/",
        "eventHandler": {
            onSuccess(payload) {
                console.log("Khalti response", payload);

                payWithKhalti(payload).then((v) => {
                    history.push(`/payment_success/${payload.product_identity}`);
                })
            },
            onError(error) {
                console.log(error);
            },
            onClose() {
                console.log('widget is closing');
            }
        }
    }
    
    let config = {
        ...initialParams,
        ...params
    };

    let checkout = new KhaltiCheckout(config);
    // Multiply by 100
    checkout.show({
        amount: params.amount * 100
    });
}


export function checkOutWithEsewa(params) {

    var params = {
        amt: 100,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: 100,
        pid: params.productIdentity, // identity
        scd: "EPAYTEST", // params.productName
        su: "http://localhost:3000/esewa_payment_success",
        fu: "http://localhost:3000/esewa_payment_failed",
    }

    payWithEsewa(params);

}

export function esewaVerify(params) {

    var params = {
        amt: 100,
        rid: "000AE01",
        pid: "ee2c3ca1-69", // identity
        scd: "EPAYTEST"
    }

    esewaPaymentVerification(params);

}