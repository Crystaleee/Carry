package edu.bupt.dmg.domain;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;
/**
 * 用户pojo类
 * 
 * Project Name: VisAna<br> 
 * File Name: User.java<br> 
 * Package Name: edu.bupt.dmg.domain<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public class ExerciseRecord implements Serializable {
//	@NotBlank(message = "RecordID name should not be blank!")
//	@Pattern(regexp = "^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$", message = "Make sure your record id meet the requirement!")
	private String RecordID;

	@NotBlank(message = "UserID should not be blank!")
	private String UserID;
	
	@NotBlank(message = "Date should not be blank!")
	private String Date;

	@NotBlank(message = "Exercise category should not be blank!")
	private String Exercise_category;
	
	@NotBlank(message = "Exercise time should not be blank!")
	private String Exercise_time;


	@Override
	public String toString() {
		return "Exercise_record [UserID=" + UserID  + ", Date=" + Date + 
				", Exercise_category=" + Exercise_category + ", Exercise_time=" + Exercise_time + "]";
	}

	public String getRecordID() {
		return RecordID;
	}

	public void setRecordID(String recordID) {
		RecordID = recordID;
	}

	public String getUserID() {
		return UserID;
	}

	public void setUserID(String userID) {
		this.UserID = userID;
	}

	public String getDate() {
		return Date;
	}

	public void setDate(String date) {
		this.Date = date;
	}

	public String getExercise_category() {
		return Exercise_category;
	}

	public void setExercise_category(String exercise_category) {
		this.Exercise_category = exercise_category;
	}

	public String getExercise_time() {
		return Exercise_time;
	}

	public void setExercise_time(String exercise_time) {
		this.Exercise_time = exercise_time;
	}


	
}
