package edu.bupt.dmg.domain;

import java.io.Serializable;
import java.util.Date;
/**
 * 文件pojo类
 * 
 * Project Name: VisAna<br> 
 * File Name: UploadFile.java<br> 
 * Package Name: edu.bupt.dmg.domain<br>       
 * Creator: @author Ruitong Chai & Bohao Wang<br>    
 * Create Time：2017年4月22日<br>
 * Version: @version 0.0.1
 */
public class UploadFile implements Serializable {

	private String fileId;
	private String fileName;
	private String filePath;
	private String extensions;
	private Date updateTime;

	// 关联对象
	private User user;

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getExtensions() {
		return extensions;
	}

	public void setExtensions(String extensions) {
		this.extensions = extensions;
	}

	@Override
	public String toString() {
		return "UploadFile [fileId=" + fileId + ", fileName=" + fileName + ", filePath=" + filePath + ", extensions="
				+ extensions + ", updateTime=" + updateTime + ", user=" + user + "]";
	}

}
