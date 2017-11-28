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
public class User implements Serializable {
	@NotBlank(message = "Username should not be blank!")
	@Pattern(regexp = "^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$", message = "Make sure your username meet the requirement!")
	private String UserId;

	@NotBlank(message = "Password should not be blank!")
	private String UserPwd;

	@NotBlank(message = "Name should not be blank!")
	private String UserName;

	@NotBlank(message = "Sex should not be blank!")
	private String Sex;

	@NotBlank(message = "Email should not be blank!")
	@Pattern(regexp = "^\\s*\\w+(?:\\.{0,1}[\\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[a-zA-Z]+\\s*$", message = "Make sure your Email is avaliable")
	private String Email;

	private boolean AccountNonLocked;

	private boolean Enabled;
	private String EnableCode;
	private String ExpirationDate;
	// 关联对象
	private List<UploadFile> uploadFiles;
	private List<Role> roles;
	private String BirthDate;
	private String Height;
	private String Weight;
	private String BMI;
	private String BFR;
	public String getUserId() {
		return UserId;
	}

	public void setUserId(String userId) {
		this.UserId = userId;
	}
	
	public String getBirthDate() {
		return BirthDate;
	}

	public void setBirthDate(String birthday) {
		System.out.println("mageji:"+birthday);
		this.BirthDate = birthday;
	}

	public String getBMI() {
		return BMI;
	}

	public void setRMI(String BMI) {
		this.BMI = BMI;
	}
	
	public String getBFR() {
		return BFR;
	}

	public void setBFR(String BFR) {
		this.BFR = BFR;
	}
	
	public String getPassword() {
		return UserPwd;
	}

	public void setPassword(String password) {
		this.UserPwd = password;
	}

	public String getName() {
		return UserName;
	}

	public void setName(String name) {
		this.UserName = name;
	}

	public String getSex() {
		return Sex;
	}

	public void setSex(String sex) {
		this.Sex = sex;
	}
	
	public String getHeight() {
		return Height;
	}

	public void setHeight(String height) {
		this.Height=height;
	}
	
	public String getWeight() {
		return Weight;
	}
	
	public void setWeight(String Weight) {
		this.Weight = Weight;
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
		return "User [userId=" + UserId + ", password=" + UserPwd + ", name=" + UserName + ", sex=" + Sex
				+ ", description=" + Email + ", accountNonLocked=" + AccountNonLocked + ", enabled=" + Enabled
				+ ", uploadFiles=" + uploadFiles + ", roles=" + roles + "]";
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		this.Email = email;
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
