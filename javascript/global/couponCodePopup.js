const { getCookie, setCookie } = require("./lib/helper");

class CouponCodePopup {
    constructor() {

        this.init();
        this.closePopup();
        this.clickToCopy();
        
    }
    init = () => {
        const couponCodePopup = document.querySelector(".coupon-code-popup");
        const couponCodePopupBackDrop = document.querySelector(".coupon-code-popup-backdrop");
        if (!getCookie("couponCodePopup")) {
            if (couponCodePopup && couponCodePopupBackDrop) {
                if (!couponCodePopup.classList.contains("active") && !couponCodePopupBackDrop.classList.contains("active")) {
                    couponCodePopup.classList.add("active");
                    couponCodePopupBackDrop.classList.add("active")
                    this.countDown()
                }
            }
        }
    }
    closePopup = () => {
        const closeCouponPopup = document.querySelector(".close-popup");
        const couponCodePopup = document.querySelector(".coupon-code-popup");
        const couponCodePopupBackDrop = document.querySelector(".coupon-code-popup-backdrop");
        if (closeCouponPopup) {
            closeCouponPopup.addEventListener("click", () => {
                if (couponCodePopup.classList.contains("active") && couponCodePopupBackDrop.classList.contains("active")) {
                    couponCodePopup.classList.remove("active");
                    couponCodePopupBackDrop.classList.remove("active")
                    setCookie("couponCodePopup", 1, 0);
                }
            })
        }
    }
    clickToCopy = () => {
        const copyText = document.querySelector(".coupon-code-wrapper");
        const checkCopyText = document.querySelector(".copy-text p")
        if (copyText) {
            copyText.addEventListener("click", (e) => {
                let code = document.querySelector(".coupon-code h4");
                if (code && checkCopyText) {
                    navigator.clipboard.writeText(code.innerText);
                    checkCopyText.innerText = "Coupon code copied"
                }
            })
        }
    }
    countDown = () => {
        let countDownDate = new Date(new Date().getTime() + 15 * 60000);

        // Update the count down every 1 second
        const x = setInterval(function () {
            const codeCounter = document.querySelector(".timer-countdown h4")
            if (codeCounter) {
                // Get today's date and time
                let now = new Date().getTime();

                // Find the distance between now and the count down date
                let distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Display the result in the element with id="demo"
                // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
                // + minutes + "m " + seconds + "s ";
                codeCounter.innerText = `${minutes}m ${seconds}s`
                console.log(days, hours, minutes, seconds);
                // If the count down is finished, write some text
                if (distance < 0) {
                    setCookie("couponCodePopup", 1, 1);
                    clearInterval(x);
                    codeCounter.innerHTML = "EXPIRED";

                }
            }

        }, 1000);
    }

}
if (document.querySelector(".coupon-code-popup")) {
    new CouponCodePopup()
}