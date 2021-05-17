import KhaltiCheckout from "khalti-checkout-web";
import {payWithKhalti} from "../../src/api/paymentApi";
import history from '../history';

const PUBLIC_KEY = "test_public_key_39148b5c085d4de0be0d7e828d884a48";

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
                    history.push(`/payment_success/${params.productIdentity}`);
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