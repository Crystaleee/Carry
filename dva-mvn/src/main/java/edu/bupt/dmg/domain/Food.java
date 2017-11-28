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
	@NotBlank(message = "Food name should not be blank!")
	@Pattern(regexp = "^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$", message = "Make sure your food name meet the requirement!")
	private String FoodName;

	@NotBlank(message = "Food calorie should not be blank!")
	private String Food_cal;

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
		return "Food [FoodName=" + FoodName + ", Food_cal=" + Food_cal  + "]";
	}

	public String getFoodName() {
		return FoodName;
	}

	public void setFoodName(String foodName) {
		FoodName = foodName;
	}

	public String getFood_cal() {
		return Food_cal;
	}

	public void setFood_cal(String food_cal) {
		Food_cal = food_cal;
	}

	
}
