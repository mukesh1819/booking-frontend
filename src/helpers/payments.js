import KhaltiCheckout from "khalti-checkout-web";
import {payWithKhalti} from "../../src/api/paymentApi";
import history from '../history';

const PUBLIC_KEY = "test_public_key_8f0bd30e4ffb4249a33fa6d13a34d46d";

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