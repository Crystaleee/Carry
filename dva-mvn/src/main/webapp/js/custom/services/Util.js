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

/* parse the data from server to record{recordID, date, foodList[], exerciseList[]}*/
function parseRecordData(data) {
	var resultCode=data.resultMessage.resultCode;
	var exeList=data.exeList;
	var foodList=data.foodList;
	
    var record = {
        recordID: data.recordID,
        date: new Date(data.date),
        foodList: [],
        exerciseList: []
    }
    var list=[]
    for (var i =0; i<exeList.length; i++){
    	
    	var exedate=exeList[i].Date;
    	for (var j =0; j<foodList.length;j++){
    		var foodate=foodList[j].Date;
    		if(foodate==exedate){
    			var record={
    					date:fooddate, 
    					exercise_category:exeList[i].Exercise_category,
    					exercise_time:exeList[i].Exercise_time, 
    					food_category:foodList[j].Food_category,
    					food_amount:foodList[j].Food_weight
    						}
    			list.push(record);
    			}
    		}
    	}
    console.log(list);
    
    	
    
    
    

}
