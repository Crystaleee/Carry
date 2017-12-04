//the funtion to format date from a Date object
function formatDate(d) {
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

//serialize form array to json
function objectifyForm(formArray) {

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

// food class
function Food() {
    this.food_category = null;
    this.food_amount = null;
}

function Food(category, amount, calorie) {
    this.food_category = category;
    this.food_amount = amount;
    this.food_calorie = calorie;
}

// exercise class
function Exercise() {
    this.exercise_category = null;
    this.exercise_time = null;
}

function Exercise(category, time, calorie) {
    this.exercise_category = category;
    this.exercise_time = time;
    this.exercise_calorie = calorie;
}


/** create data to send from record{date, userID, recordID, foodList[], exerciseList[]}
data format
{
     userID: "mingzi",
     date: "2017/12/01",
     exercise_category: "running, swimming, boxing",
     exercise_time: "30, 20, 10",
     food_category: "apple, pork, beef",
     food_amount: "1, 100, 100"
}*/
function createRecordData(record, userID) {
    var data = {};

    data.userID = userID;
    data.date = formatDate(record.date);

    if (record.recordID != undefined)
        data.recordID = record.recordID;

    var foodList = record.foodList;
    var exerciseList = record.exerciseList;
    if (foodList[0] != undefined) {
        data.food_category = foodList[0].food_category;
        data.food_amount = foodList[0].food_amount;
    }
    if (exerciseList[0] != undefined) {
        data.exercise_category = exerciseList[0].exercise_category;
        data.exercise_time = exerciseList[0].exercise_time;
    }

    for (var i = 1; i < foodList.length; i++) {
        data.food_category += "," + foodList[i].food_category;
        data.food_amount += "," + foodList[i].food_amount;
    }
    for (var i = 1; i < exerciseList.length; i++) {
        data.exercise_category += "," + exerciseList[i].exercise_category;
        data.exercise_time += "," + exerciseList[i].exercise_time;
    }
    return data;
}

/* parse the data from server to recordList[{date, foodList[], exerciseList[]},...]*/
function parseRecordData(data) {
    var recordList = [];

    var exeList = data.exeList;
    var foodList = data.foodList;

    for (var i = 0; i < exeList.length; i++) {
        var exedate = exeList[i].date;

        var record = {
            date: new Date(exedate),
            foodList: [],
            exerciseList: []
        };
        var exercise_category = exeList[i].exercise_category.split(";").map(s => s.trim());
        var exercise_time = exeList[i].exercise_time.split(";").map(s => s.trim());
        // var exercise_calorie = exeList[i].exercise_calorie.split(";").map(s => s.trim());
        for (var j = 0; j < exercise_category.length; j++) {
            record.exerciseList.push(new Exercise(exercise_category[j], exercise_time[j])); //, exercise_calorie[i]));
        }

        for (var k = 0; k < foodList.length; k++) {
            if (foodList[k].date == exedate) {
                var food_category = foodList[k].food_category.split(";").map(s => s.trim());
                var food_amount = foodList[k].food_weight.split(";").map(s => s.trim());
                // var food_calorie = foodList[k].food_calorie.split(";").map(s => s.trim());
                for (var j = 0; j < food_category.length; j++) {
                    record.foodList.push(new Food(food_category[j], food_amount[j])); //, food_calorie[i]));
                }
                break;
            }
        }
        recordList.push(record);
    }
    return recordList;
}
