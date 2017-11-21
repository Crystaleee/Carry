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
public class ExerciseRec implements Serializable {
	private String RecordID;
	private String Exercise_time;
	private String UserID;
	private String Date;
	private String Exercise_cal;



	private String ExerciseCategory;
	private String ExerciseName;
	
	
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
		return "ExerciseRec [RecordID=" + RecordID + ", Exercise_time=" + Exercise_time + ", UserID=" + UserID + ", Date=" + Date
				+ ", Exercise_cal=" + Exercise_cal +", ExerciseCategory=" + ExerciseCategory +", ExerciseName=" + ExerciseName +"]";
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
		this.RecordID = recordID;
	}

	public String getExercise_time() {
		return Exercise_time;
	}

	public void setExercise_time(String exercise_time) {
		this.Exercise_time = exercise_time;
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
	public String getExercise_cal() {
		return Exercise_cal;
	}

	public void setExercise_cal(String exercise_cal) {
		this.Exercise_cal = exercise_cal;
	}

	public String getExerciseCategory() {
		return ExerciseCategory;
	}

	public void setExerciseCategory(String exerciseCategory) {
		this.ExerciseCategory = exerciseCategory;
	}

	public String getExerciseName() {
		return ExerciseName;
	}

	public void setExerciseName(String exerciseName) {
		this.ExerciseName = exerciseName;
	}
}