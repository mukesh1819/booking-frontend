const PUBLIC_KEY = "test_public_key_39148b5c085d4de0be0d7e828d884a48";
import KhaltiCheckout from "khalti-checkout-web";

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export function checkOutWithKhalti(params) {
    console.log("Checkout pre");

    let initialParams = {
        "publicKey": PUBLIC_KEY,
        "productIdentity": "1234567890",
        "productName": "VisitallNepal",
        "productUrl": "https://visitallnepal.com/",
        "eventHandler": {
            onSuccess(payload) {
                console.log(payload);
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

    console.log("Checkout pre");
    setTimeout(() => {}, 15000)
    let checkout = new KhaltiCheckout(config);
    console.log("Checkout", checkout);
    checkout.show({
        amount: params.amount * 100
    });
}