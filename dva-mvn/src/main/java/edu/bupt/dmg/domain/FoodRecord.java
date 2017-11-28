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
public class FoodRecord implements Serializable {
	@NotBlank(message = "Record ID should not be blank!")
	@Pattern(regexp = "^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$", message = "Make sure your record id meet the requirement!")
	private String RecordID;

	@NotBlank(message = "User id should not be blank!")
	private String UserID;
	
	@NotBlank(message = "Date should not be blank!")
	private String Date;

	@NotBlank(message = "Food category should not be blank!")
	private String Food_category;
	
	@NotBlank(message = "Food weight should not be blank!")
	private String Food_weight;

	// 关联对象
//	private List<UploadFile> uploadFiles;
//	private List<Role> roles;
//	private String BirthDate;
//	private String Height;
//	private String Weight;
//	private String BMI;
//	private String BFR;

	@Override
	public String toString() {
		return "Food_record [RecordID=" + RecordID + ", UserID=" + UserID  + ", Date=" + Date + 
				", Food_category=" + Food_category + ", Food_weight=" + Food_category + "]";
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
		UserID = userID;
	}

	public String getDate() {
		return Date;
	}

	public void setDate(String date) {
		Date = date;
	}

	public String getFood_category() {
		return Food_category;
	}

	public void setFood_category(String food_category) {
		Food_category = food_category;
	}

	public String getFood_weight() {
		return Food_weight;
	}

	public void setFood_weight(String food_weight) {
		Food_weight = food_weight;
	}
	
}
