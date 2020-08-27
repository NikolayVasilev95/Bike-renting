let rent_bike = [];
let periods = [];
let startDayOFTheWholeRent = '';
let endDayOFTheWholeRent = '';

module.exports = {
    loadData: async function (data) {
        rent_bike = [];
        periods = [];
        rent_bike.push(...data);
        filteringData();
    },
    wholeRentPeriodStartAndEndDaysAndTotalPrice: function () {
        return {
            totalPrice: calc(),
            Start_day_of_the_whole_rent: startDayOFTheWholeRent,
            End_day_of_the_whole_rent: endDayOFTheWholeRent
        }
    }
};

function getDatesBetweenDates(startDate, endDate) {
    let dates = [];
    const theDate = new Date(startDate);
    while (theDate < endDate) {
        dates = [...dates, new Date(theDate)];
        theDate.setDate(theDate.getDate() + 1)
    }
    dates = [...dates, endDate];
    return dates;
}

function wholeRentPeriodStartAndEndDays() {
    let fromDays = [];
    let toDays = [];
    rent_bike.forEach((item) => {
        item.from != null ? fromDays.push(item.from) : console.log(true);
        item.from != null ? toDays.push(item.to) : console.log(true);
    });
    const minFromDays = new Date(Math.min(...fromDays));
    const maxToDays = new Date(Math.max(...toDays));
    return {
        "Start_day_of_the_whole_rent": minFromDays,
        "End_day_of_the_whole_rent": maxToDays
    };
}

function calc() {
    let totalPrise = 0;
    periods.forEach((item) => {
        item.period.forEach(() => {
            totalPrise += item.price_per_day;
        });
    });
    return totalPrise;
}

function filteringData() {
    let defaultPricePerDay = 5;
    startDayOFTheWholeRent = wholeRentPeriodStartAndEndDays().Start_day_of_the_whole_rent;
    endDayOFTheWholeRent = wholeRentPeriodStartAndEndDays().End_day_of_the_whole_rent;
    let wholeRentPeriod = getDatesBetweenDates(startDayOFTheWholeRent, endDayOFTheWholeRent);
    let period = [];
    rent_bike.forEach((item) => {
        if (item.from != null || item.to != null) {
            period = getDatesBetweenDates(item.from, item.to);
        } else {
            item.price_per_day = defaultPricePerDay;

        }
        let newPeriod = [];
        period.forEach(i => {
            newPeriod.push(String(i));
        });
        periods.push({"price_per_day": item.price_per_day, "period": newPeriod});
        period = [];
    });
    let newArry = [];
    for (let i = 0; i < periods.length; i++) {
        newArry.push(...periods[i].period);
    }
    let periodWhiteDefaultPricePerDay = [];
    for (let i = 0; i < wholeRentPeriod.length; i++) {
        let flag = true;
        for (let j = 0; j < newArry.length; j++) {
            if (wholeRentPeriod[i] == newArry[j]) {
                flag = false;
                break;
            }
        }
        if (flag === true) {
            periodWhiteDefaultPricePerDay.push(String(wholeRentPeriod[i]));
        }
    }
    periods.forEach((item) => {
        if (item.price_per_day == defaultPricePerDay) {
            item.period.push(...periodWhiteDefaultPricePerDay)
        }
    });
    let arr = [];
    let delItems = [];
    for (let i = 0; i < periods.length; i++) {
        delItems.push(0);
        for (let j = 0; j < periods[i].period.length; j++) {
            if (!arr.includes(periods[i].period[j])) {
                arr.push(periods[i].period[j]);
                arr.push(i + "/" + j);
            } else if (arr.includes(periods[i].period[j])) {
                let index = arr.indexOf(periods[i].period[j]);
                let indices = arr[index + 1].split("/");
                if (indices[1] > j) {
                    periods[indices[0]].period.splice(indices[1] - delItems[indices[0]], 1);
                    arr.splice(index, 1);
                    arr.splice(index, 1);
                    delItems[indices[0]]++;
                    j--;
                }
            }
        }
    }
    console.log(periods);
}
