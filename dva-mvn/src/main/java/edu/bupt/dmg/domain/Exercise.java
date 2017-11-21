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
public class Exercise implements Serializable {
	@NotBlank(message = "ExerciseCategory should not be blank!")
	@Pattern(regexp = "^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$", message = "Make sure your username meet the requirement!")
	private String ExerciseCategory;

	@NotBlank(message = "ExerciseName should not be blank!")
	private String ExerciseName;

	@NotBlank(message = "Time should not be blank!")
	private String Time;

	@NotBlank(message = "Frequency should not be blank!")
	private String Frequency;
	@NotBlank(message = "Exercise_cal should not be blank!")
	private String Exercise_cal;


	
	private boolean AccountNonLocked;

	private boolean Enabled;
	private String EnableCode;
	private String ExpirationDate;
	// 关联对象
	private List<UploadFile> uploadFiles;
	private List<Role> roles;
	
	public String getExerciseCategory() {
		return ExerciseCategory;
	}

	public void setExerciseCategory(String userId) {
		this.ExerciseCategory = ExerciseCategory;
	}
	
	public String getExerciseName() {
		return ExerciseName;
	}

	public void setExerciseName(String ExerciseName) {
		this.ExerciseName = ExerciseName;
	}

	public String getTime() {
		return Time;
	}

	public void setTime(String Time) {
		this.Time = Time;
	}
	
	public String getBFrequency() {
		return Frequency;
	}

	public void setFrequency(String Frequency) {
		this.Frequency = Frequency;
	}
	
	public String getExercise_cal() {
		return Exercise_cal;
	}

	public void setExercise_cal(String Exercise_cal) {
		this.Exercise_cal = Exercise_cal;
	}

	
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
		return "Exercise [ExerciseCategory=" + ExerciseCategory + ", ExerciseName=" + ExerciseName + ", Time=" + Time + ", Frequency=" + Frequency
				+ ", Exercise_cal=" + Exercise_cal +"]";
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

}