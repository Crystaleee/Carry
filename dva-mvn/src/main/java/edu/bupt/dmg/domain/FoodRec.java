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
public class FoodRec implements Serializable {
	private String RecordID;
	private String FoodCategory;
	private String UserID;
	private String Date;
	private String Food_weight;



	private String Foodname;
	private String Food_cal;
	
	
	private boolean AccountNonLocked;
	private boolean Enabled;
	private String EnableCode;
	private String ExpirationDate;
	// 关联对象
	private List<UploadFile> uploadFiles;
	private List<Role> roles;
	
	

	
	public boolean isAccountNonLocked() {
		return AccountNonLocked;
	}

	public void setAccountNonLocked(boolean accountNonLocked) {
		this.AccountNonLocked = accountNonLocked;
	}

	public boolean isEnabled() {
		return Enabled;
	}

	public void setEnabled(boolean enabled) {
		this.Enabled = enabled;
	}

	public List<UploadFile> getUploadFiles() {
		return uploadFiles;
	}

	public void setUploadFiles(List<UploadFile> uploadFiles) {
		this.uploadFiles = uploadFiles;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "ExerciseRec [RecordID=" + RecordID + ", FoodCategory=" + FoodCategory + ", UserID=" + UserID + ", Date=" + Date
				+ ", Food_weight=" + Food_weight +", Foodname=" + Foodname +", Food_cal=" + Food_cal +"]";
	}



	public String getEnableCode() {
		return EnableCode;
	}

	public void setEnableCode(String enableCode) {
		this.EnableCode = enableCode;
	}

	public String getExpirationDate() {
		return ExpirationDate;
	}

	public void setExpirationDate(String expirationDate) {
		this.ExpirationDate = expirationDate;
	}

	public String getRecordID() {
		return RecordID;
	}

	public void setRecordID(String recordID) {
		RecordID = recordID;
	}

	public String getFoodCategory() {
		return FoodCategory;
	}

	public void setFoodCategory(String foodCategory) {
		FoodCategory = foodCategory;
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

	public String getFood_weight() {
		return Food_weight;
	}

	public void setFood_weight(String food_weight) {
		Food_weight = food_weight;
	}

	public String getFoodname() {
		return Foodname;
	}

	public void setFoodname(String foodname) {
		Foodname = foodname;
	}

	public String getFood_cal() {
		return Food_cal;
	}

	public void setFood_cal(String food_cal) {
		Food_cal = food_cal;
	}

}