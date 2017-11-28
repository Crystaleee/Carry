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
	@NotBlank(message = "Exercise name should not be blank!")
	@Pattern(regexp = "^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$", message = "Make sure your exercise name meet the requirement!")
	private String ExName;

	@NotBlank(message = "Exercise calorie should not be blank!")
	private String Ex_cal;

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
		return "Exercise [Exercise=" + ExName + ", Exercise_cal=" + Ex_cal  + "]";
	}
	
	public String getExName() {
		return ExName;
	}

	public void setExName(String exName) {
		ExName = exName;
	}

	public String getEx_cal() {
		return Ex_cal;
	}

	public void setEx_cal(String ex_cal) {
		Ex_cal = ex_cal;
	}

}
