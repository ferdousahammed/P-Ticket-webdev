function getInnerTextById(id) {
  return document.getElementById(id).innerText;
}
function setInnerTextById(id, innerText) {
  document.getElementById(id).innerText = innerText;
}

// bookedSeatsCount = 0;
// let totalPrice = 0;

const seats = document.getElementsByClassName("seat-no");
const seatList = [];
for (const seat of seats) {
  seat.addEventListener("click", () => {
    const seatNo = seat.innerText;
    let bookedSeatsCount = Number(getInnerTextById("booked-count"));
    if (!seatList.includes(seatNo)) {
      if (bookedSeatsCount < 4) {
        bookedSeatsCount += 1;
        console.log(bookedSeatsCount);

        seatList.push(seatNo);
        seat.classList.remove("bg-stone-50");
        seat.classList.add("bg-green-main", "text-white", "booked");
        appendSeatsList(seatNo);
      } else {
        alert("Sorry! You can book only 4 seats at a time.");
      }
    }
    // else {
    //   seatList.splice(seatList.indexOf(seatNo), 1);
    //   seat.classList.remove("bg-green-main", "text-white", "booked");
    //   //   bookedSeatsCount -= 1;
    // }

    setInnerTextById("booked-count", bookedSeatsCount);
    setInnerTextById("seats-left", 40 - bookedSeatsCount);
    const totalPrice = 550 * bookedSeatsCount;
    setInnerTextById("total-price", totalPrice);
  });
}

function handleCouponSubmit() {
  const submittedCode = document.getElementById("coupon-code").value;
  const bookedSeats = parseInt(getInnerTextById("booked-count"));

  if (bookedSeats === 4) {
    if (submittedCode === "NEW15") {
      const grandTotalPrice =
        parseInt(getInnerTextById("total-price")) -
        parseInt(getInnerTextById("total-price")) * 0.15;
      setInnerTextById("grand-total", grandTotalPrice);
      document.getElementById("coupon-code").value = "";
    } else if (submittedCode === "Couple 20") {
      const grandTotalPrice =
        parseInt(getInnerTextById("total-price")) -
        parseInt(getInnerTextById("total-price")) * 0.2;
      setInnerTextById("grand-total", grandTotalPrice);
      document.getElementById("coupon-code").value = "";
    } else {
      alert("Enter Valid Coupon");
      document.getElementById("coupon-code").value = "";
    }
  } else {
    alert("You need to book 4 seats");
  }
}

function appendSeatsList(seatNo) {
  const seatListElement = document.getElementById("seat-lists");
  const div = document.createElement("li");
  div.classList.add("flex", "justify-between");
  div.innerHTML = `  <p
                      class="text-gray-950 text-opacity-60 w-[50%] font-inter font-medium text-base"
                    >
                      ${seatNo}
                    </p>
                    <p
                      class="text-gray-950 text-opacity-60 w-1/3 font-inter font-medium text-base"
                    >
                      Economy
                    </p>
                    <p
                      class="text-gray-950 text-opacity-60 w-1/3 font-inter text-end font-medium text-base"
                    >
                      550
                    </p>`;
  seatListElement.appendChild(div);
}

function nextClick() {
  const passengerName = document.getElementById("passenger-name").value;
  const passengerPhone = document.getElementById("passenger-phone").value;
  if (
    typeof passengerName === "string" &&
    passengerName.length > 0 &&
    passengerPhone.length > 0
  ) {
    const bookedElement = document.querySelectorAll(".booked");
    for (const booked of bookedElement) {
      booked.classList.remove("bg-green-main", "text-white", "booked");
    }
    const seatListElement = document.getElementById("seat-lists");
    seatListElement.innerHTML = "";
    setInnerTextById("total-price", 0);
    setInnerTextById("grand-total", 0);
    setInnerTextById("seats-left", 40);
    setInnerTextById("booked-count", 0);
  } else {
    alert("Enter valid information");
  }
}
