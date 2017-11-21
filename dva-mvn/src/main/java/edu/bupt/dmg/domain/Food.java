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
public class Food implements Serializable {
	@NotBlank(message = "FoodCategory should not be blank!")
	@Pattern(regexp = "^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$", message = "Make sure your FoodCategory meet the requirement!")
	private String FoodCategory;

	@NotBlank(message = "Foodname should not be blank!")
	private String Foodname;

	@NotBlank(message = "Food_weight should not be blank!")
	private String Food_weight;

	@NotBlank(message = "Food_cal should not be blank!")
	private String Food_cal;



	private boolean AccountNonLocked;

	private boolean Enabled;
	private String EnableCode;
	private String ExpirationDate;
	// 关联对象
	private List<UploadFile> uploadFiles;
	private List<Role> roles;

	public String getFoodCategory() {
		return FoodCategory;
	}

	public void setFoodCategory(String FoodCategory) {
		this.FoodCategory = FoodCategory;
	}
	
	public String getFoodname() {
		return Foodname;
	}

	public void setFoodname(String Foodname) {
		this.Foodname = Foodname;
	}

	public String getFood_weight() {
		return Food_weight;
	}

	public void setFood_weight(String Food_weight) {
		this.Food_weight = Food_weight;
	}
	
	public String getFood_cal() {
		return Food_cal;
	}

	public void setFood_cal(String Food_cal) {
		this.Food_cal = Food_cal;
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
		return "Food [FoodCategory=" + FoodCategory + ", Foodname=" + Foodname + ", Food_weight=" + Food_weight + ", Food_cal=" + Food_cal
				+  "]";
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

